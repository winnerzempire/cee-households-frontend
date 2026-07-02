"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import "./Navbar.css";

export default function Navbar() {
  const { cartCount } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log("Search Term:", searchTerm);

    if (searchTerm.trim().length < 2) {
      setResults([]);
      return;
    }

    fetch(
      `http://127.0.0.1:8000/api/products/?search=${encodeURIComponent(
        searchTerm
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
        setResults(data.results || []);
      })
      .catch((err) => {
        console.error("Search Error:", err);
      });
  }, [searchTerm]);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <Link href="/" className="navbar-logo">
          <Image
            src="/images/CEE.jpg"
            alt="Cee Households & Decor"
            width={150}
            height={50}
            priority
          />
        </Link>

        {/* MENU */}
        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <Link href="/">Home</Link>
          <Link href="/category">Categories</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact Us</Link>
        </div>

        {/* ACTIONS */}
        <div className="navbar-actions">

          {/* SEARCH */}
          <div className="search-container">

            <input
              type="text"
              placeholder="Search products..."
              className="navbar-search"
              value={searchTerm}
              onChange={(e) => {
                console.log("Typing:", e.target.value);
                setSearchTerm(e.target.value);
              }}
            />

            {results.length > 0 && (
              <div className="search-results">

                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="search-item"
                    onClick={() => {
                      setSearchTerm("");
                      setResults([]);
                    }}
                  >
                    <img
                      src={product.main_image}
                      alt={product.name}
                    />

                    <div>
                      <h4>{product.name}</h4>

                      <p>
                        KSh {Number(product.price).toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}

              </div>
            )}

          </div>

          {/* CART */}
          <div className="cart-wrapper">

            <Link href="/cart" className="navbar-cart">
              <FiShoppingCart size={24} />
            </Link>

            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}

          </div>

          {/* WHATSAPP */}
          <a
            href="https://wa.me/254792263571"
            className="navbar-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>

          {/* MOBILE MENU */}
          <button
            className="navbar-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </div>
      </div>
    </nav>
  );
}