import Image from "next/image";
import Link from "next/link";
import "./PromoSection.css";

export default function PromoSection() {
  return (
    <section className="promo">
      <div className="promo-container">
        
        {/* LEFT IMAGE */}
        <div className="promo-image">
          <Image
            src="/images/gift2.jpeg" // replace with your image
            alt="Gift Collection"
            width={600}
            height={400}
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="promo-content">
          <h2>GIFT THEM</h2>
          <p>
            A gift for everyone, every occasion. 🎁✨ Explore our curated gift
            collection and find the perfect match! ❤️
          </p>

          <Link href="/categories/gifts">
            <button className="promo-btn">Shop Now</button>
          </Link>
        </div>

      </div>
    </section>
  );
}