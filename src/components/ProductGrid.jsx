"use client";

import ProductCard from "./ProductCard";
import "./ProductGrid.css";

export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
