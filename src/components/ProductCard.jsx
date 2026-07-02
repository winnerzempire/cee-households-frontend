"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  if (!product) return null;

  const price = Number(product.price) || 0;
  const comparePrice = Number(product.compare_price) || 0;

  return (
    <div className="product-card">
      <Link href={`/product/${product.slug}`} className="product-link">
        <div className="product-image-wrapper">
          <Image
            src={product.main_image || "/placeholder.jpg"}
            alt={product.name}
            className="product-image"
            width={300}
            height={300}
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-price">
            {comparePrice > price ? (
              <>
                <span className="old-price">
                  KSh {comparePrice.toLocaleString()}
                </span>
                <span className="new-price">
                  KSh {price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="new-price">
                KSh {price.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>

      <button
        className="add-to-cart-btn"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}
