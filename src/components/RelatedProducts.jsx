'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import './RelatedProducts.css';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export default function RelatedProducts({ categorySlug, currentProductSlug }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (categorySlug) {
      fetch(`${API_BASE}/products/?category=${categorySlug}`)
        .then((res) => res.json())
        .then((data) => {
          // remove current product
          const filtered = data.filter(
            (p) => p.slug !== currentProductSlug
          );
          setProducts(filtered);
        })
        .catch((err) => console.error(err));
    }
  }, [categorySlug, currentProductSlug]);

  if (!products.length) return null;

  return (
    <div className="relatedSection">
      <h2>You May Also Like</h2>

      <div className="relatedGrid">
        {products.slice(0, 4).map((product) => (
          <Link href={`/products/${product.slug}`} key={product.id}>
            <div className="relatedCard">

              <img src={product.main_image} alt={product.name} />

              <h4>{product.name}</h4>

              <p>KSh {product.price}</p>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}