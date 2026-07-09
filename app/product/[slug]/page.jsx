'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import './ProductDetail.css';
import RelatedProducts from '@/components/RelatedProducts';
import CartToast from '@/components/CartToast/CartToast';
import { addToCart } from '@/lib/cart';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export default function ProductDetail() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');

  // Toast state
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (slug) {
      fetch(`${API_BASE}/products/${slug}/`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setSelectedImage(data.main_image);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [slug]);

  useEffect(() => {
  if (!product || typeof window === "undefined" || !window.fbq) return;

  window.fbq("track", "ViewContent", {
    content_ids: [product.id],
    content_name: product.name,
    content_type: "product",
    value: Number(product.price),
    currency: "KES",
  });
}, [product]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.main_image,
      },
      quantity
    );

    // Show toast
    setShowToast(true);

    // Hide after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  if (loading) return <p className="loading">Loading...</p>;

  if (!product) return <p>Product not found.</p>;

  return (
    <>
      <div className="productPage">
        <div className="productContainer">

          {/* IMAGE SECTION */}
          <div className="productImageSection">

            <div className="mainImage">
              <img
                src={selectedImage}
                alt={product.name}
              />
            </div>

            <div className="thumbnails">

              <img
                src={product.main_image}
                alt={product.name}
                onClick={() => setSelectedImage(product.main_image)}
                className={
                  selectedImage === product.main_image
                    ? 'active'
                    : ''
                }
              />

              {product.additional_images?.map((img) => (
                <img
                  key={img.id}
                  src={img.image}
                  alt={product.name}
                  onClick={() => setSelectedImage(img.image)}
                  className={
                    selectedImage === img.image
                      ? 'active'
                      : ''
                  }
                />
              ))}

            </div>

          </div>

          {/* PRODUCT INFO */}
          <div className="productInfo">

            <h1>{product.name}</h1>

            <p className="productPrice">
              KSh {product.price}
            </p>

            <p className="productDescription">
              {product.short_description || product.description}
            </p>

            {/* Quantity */}
            <div className="quantity">

              <button
                onClick={() =>
                  setQuantity((q) => Math.max(1, q - 1))
                }
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  setQuantity((q) => q + 1)
                }
              >
                +
              </button>

            </div>

            <button
              className="addToCartBtn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            <div className="extraInfo">

              <h3>Product Details</h3>

              <p>{product.description}</p>

            </div>

          </div>

        </div>

        <RelatedProducts
          categorySlug={product.category.slug}
          currentProductSlug={product.slug}
        />

      </div>

      {/* Toast */}
      <CartToast show={showToast} />

    </>
  );
}