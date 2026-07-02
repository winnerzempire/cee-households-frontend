'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { addToCart } from '@/lib/cart';
import CartToast from '@/components/CartToast/CartToast';
import './Shop.css';

const API_BASE = 'http://127.0.0.1:8000/api';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Toast
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/products/`);
      const data = await res.json();

      setProducts(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/categories/`);
      const data = await res.json();

      setCategories(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);

    // Show toast
    setShowToast(true);

    // Hide after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSearch('');
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory
      ? p.category?.name === selectedCategory
      : true;

    const matchesSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return <div className="shopLoading">Loading...</div>;
  }

  return (
    <>
      <div className="shopPage">

        {/* TOP BAR */}
        <div className="shopTopBar">

          <div>
            <h1>Shop</h1>
            <p className="subtitle">
              Find your perfect household items
            </p>
          </div>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="shopContent">

          {/* SIDEBAR */}
          <div className="shopSidebar">

            <div className="filterCard">

              <h3>Categories</h3>

              <div className="categoryPills">

                <button
                  className={!selectedCategory ? 'pill active' : 'pill'}
                  onClick={() => setSelectedCategory('')}
                >
                  All
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className={
                      selectedCategory === cat.name
                        ? 'pill active'
                        : 'pill'
                    }
                    onClick={() => setSelectedCategory(cat.name)}
                  >
                    {cat.name}
                  </button>
                ))}

              </div>

              <button
                className="clearBtn"
                onClick={clearFilters}
              >
                Clear Filters
              </button>

            </div>

          </div>

          {/* PRODUCTS */}
          <div className="shopMain">

            <div className="resultsBar">
              <p>{filteredProducts.length} products found</p>
            </div>

            <div className="shopGrid">

              {filteredProducts.length > 0 ? (

                filteredProducts.map((product) => (

                  <div
                    className="productCard"
                    key={product.id}
                  >

                    <Link href={`/product/${product.slug}`}>

                      <div className="imageWrapper">

                        {product.main_image ? (

                          <Image
                            src={product.main_image}
                            alt={product.name}
                            fill
                            className="productImage"
                          />

                        ) : (

                          <div className="productPlaceholder">
                            No Image
                          </div>

                        )}

                      </div>

                    </Link>

                    <div className="productInfo">

                      <h3>{product.name}</h3>

                      <p className="productPrice">
                        KSh {product.price}
                      </p>

                      <button
                        className="addToCartBtn"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>

                    </div>

                  </div>

                ))

              ) : (

                <div className="noProducts">

                  <h2>No products found</h2>

                  <p>
                    Try another category or search term.
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

      {/* Toast Notification */}
      <CartToast show={showToast} />

    </>
  );
}