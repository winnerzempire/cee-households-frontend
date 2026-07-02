'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './CategoryProducts.css';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export default function CategoryProducts() {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (slug) {
      fetch(`${API_BASE}/products/?category=${slug}`)
        .then(res => res.json())
        .then(data => {
          setProducts(data.results || data);
        });
    }
  }, [slug]);

 return (
  <div className="categoryPage">

    <h1 className="categoryTitle">
      {slug.replace('-', ' ')}
    </h1>

    <div className="productsGrid">
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.slug}`}>

          <div className="productCard">

            <div className="imageWrapper">
              <Image
                src={product.main_image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="productImage"
              />
            </div>

            <div className="productInfo">
              <h3>{product.name}</h3>
              <p className="price">KSh {product.price}</p>
            </div>

          </div>

        </Link>
      ))}
    </div>

  </div>
);
}