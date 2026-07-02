"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./Hero.css";
import Image from "next/image";

export default function Hero() {
  const images = [
    "/images/Hero1.jpg",
    "/images/Hero2.jpg",
    "/images/Hero3.jpg",
    "/images/Hero4.jpg",
    "/images/Hero5.jpg",
  ];

  const [current, setCurrent] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); // change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">

      {/* SLIDES */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`hero-slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* OVERLAY CONTENT */}
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Transform Your Home</h1>

          <p>
            Discover premium furniture, décor, and everyday essentials
            delivered across Kenya.
          </p>

          <Link href="/categories/furniture" className="hero-btn">
            Shop Now
          </Link>
        </div>
      </div>

    </section>
  );
}