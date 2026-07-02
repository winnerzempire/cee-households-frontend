"use client";

import { useState } from "react";
import "./contact.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>

      <p className="contact-intro">
        Have questions or need help with an order? Reach out to us and our team
        will get back to you promptly.
      </p>

      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          {success && (
            <p className="success-message">
              Your message has been sent successfully!
            </p>
          )}

          <input
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Send Message</button>
        </form>

        <div className="contact-info">
          <h2>Our Office</h2>
          <p>📍 Nairobi, Kenya</p>
          <p>📞 0792 263 571</p>
          <p>✉️ ceehouseholds@gmail.com</p>

          <div className="map">
            <iframe
              src="https://www.google.com/maps?q=Nairobi,Kenya&output=embed"
              width="100%"
              height="220"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
