"use client";

import Link from "next/link";
import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-section">
          <h3 className="footer-logo">
            Cee<span>Households</span> & Decor
          </h3>

          <p className="footer-text">
            Cee Households & Decor provides stylish home décor,
            household essentials, kitchenware, and interior styling
            solutions designed to make every home beautiful,
            comfortable, and functional.
          </p>

          <div className="footer-socials">
            <a
              href="https://www.facebook.com/profile.php?id=100063792617478"
              target="_blank"
              rel="noopener noreferrer"
            >
               <FaFacebookF /> 
            </a>

            <a
              href="https://www.instagram.com/cee_households_and_interiors/"
              target="_blank"
              rel="noopener noreferrer"
            >
               <FaInstagram />
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok />
            </a>

             <a
              href="https://wa.me/254792263571"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
           >
            <FaWhatsapp />
          </a>
          
          </div>
        </div>

        {/* Shop */}
        <div className="footer-section">
          <h4>Shop</h4>

          <ul>
            <li>
              <Link href="/categories/home-decor">
                Home Décor
              </Link>
            </li>

            <li>
              <Link href="/categories/kitchenware">
                Kitchenware
              </Link>
            </li>

            <li>
              <Link href="/categories/organizers-and-storage">
                Storage Solutions
              </Link>
            </li>

            <li>
              <Link href="/categories/bathroom-accessories">
                Bathroom Accessories
              </Link>
            </li>

            <li>
              <Link href="/categories/bedroom-accessories">
                Bedroom Accessories
              </Link>
            </li>

            <li>
              <Link href="/shop">
                All Products
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-section">
          <h4>Company</h4>

          <ul>
            <li>
              <Link href="/about">
                About Us
              </Link>
            </li>

            <li>
              <Link href="/category">
                Categories
              </Link>
            </li>

            <li>
              <Link href="/services">
                Services
              </Link>
            </li>

            <li>
              <Link href="/contact">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="footer-section">
          <h4>Customer Care</h4>

          <ul>
            <li>
              <Link href="/contact">
                Delivery Information
              </Link>
            </li>

            <li>
              <Link href="/contact">
                Payment Options
              </Link>
            </li>

            <li>
              <Link href="/contact">
                Returns & Refunds
              </Link>
            </li>

            <li>
              <Link href="/contact">
                Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Contact Us</h4>

          <p>📍 Nairobi, Kenya</p>
          <p>📞 0792 263 571</p>
          <p>✉️ ceehouseholdsdecor@gmail.com</p>

          <a
            href="https://wa.me/254792263571"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-whatsapp"
          >
            Chat on WhatsApp
          </a>
        </div>

      </div>

      {/* Trust Bar */}
      <div className="footer-trust">
        <p>
          Secure Shopping • Countrywide Delivery • Quality Household Products
        </p>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Cee Households & Decor.
        All Rights Reserved.
      </div>
    </footer>
  );
}