"use client";

import Link from "next/link";
import "./CartToast.css";

export default function CartToast({ show }) {
  if (!show) return null;

  return (
    <div className="cart-toast">

      <div className="toast-icon">
        ✓
      </div>

      <div className="toast-content">

        <h4>Added to Cart</h4>

        <p>
          Your item has been added successfully.
        </p>

        <Link href="/cart" className="toast-btn">
          View Cart
        </Link>

      </div>

    </div>
  );
}