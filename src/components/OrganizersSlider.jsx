"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import "./Must-Have.css";

const API_BASE = "http://127.0.0.1:8000/api";

export default function MustHaveSlider() {
  const [products, setProducts] = useState([]);
  const sliderRef = useRef(null);

  // Fetch products in "A Must Have" category
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          `${API_BASE}/products/?category=organizers-and-storage`
        );

        const data = await res.json();

        setProducts(Array.isArray(data) ? data : data.results || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      }
    }

    fetchProducts();
  }, []);

  // Auto Scroll
  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider || products.length === 0) return;

    let animationFrame;

    const scroll = () => {
      slider.scrollLeft += 1;

      if (
        slider.scrollLeft >=
        slider.scrollWidth - slider.clientWidth
      ) {
        slider.scrollLeft = 0;
      }

      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, [products]);

  return (
    <section className="product-slider-section">

      <div className="section-header">
        <h2>Organization And Storage</h2>
        <Link href="/shop" className="view-all">
          View All →
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="empty-products">
          No products found in this category.
        </p>
      ) : (
        <div className="product-slider" ref={sliderRef}>
          {products.map((product) => (
            <div key={product.id} className="product-card">

              <Link href={`/product/${product.slug}`}>

                <div className="product-image">

                  <Image
                    src={product.main_image}
                    alt={product.name}
                    width={220}
                    height={220}
                  />

                </div>

                <h4>{product.name}</h4>

                <p className="price">
                  KSh {product.price}
                </p>

              </Link>

            </div>
          ))}
        </div>
      )}

    </section>
  );
}