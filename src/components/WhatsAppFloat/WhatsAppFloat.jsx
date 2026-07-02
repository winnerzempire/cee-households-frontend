"use client";

import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppFloat.css";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/254792263571?text=Hello%20Cee%20Households%20%26%20Decor!%20I'm%20interested%20in%20your%20products."
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-widget"
    >
      <div className="chat-box">
        <span className="chat-title">
          💬 Need help?
        </span>

        <span className="chat-subtitle">
          Chat with us
        </span>
      </div>

      <div className="whatsapp-icon">
        <FaWhatsapp />
      </div>
    </a>
  );
}