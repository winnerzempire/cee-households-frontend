'use client';

import './Services.css';

export default function Services() {
  return (
    <div className="services-container">

      {/* HERO SECTION */}
      {/* <section className="hero-section">
        <div className="overlay">
          <h1>Beautiful Spaces. Thoughtful Living.</h1>

          <p>
            We help homeowners, renters, Airbnb hosts, and businesses create
            beautiful, functional, and welcoming spaces through curated décor
            and professional styling services.
          </p>

          <button
            onClick={() =>
              window.open('https://wa.me/254792263571', '_blank')
            }
          >
            Book Consultation
          </button>
        </div>
      </section> */}

      {/* INTRO */}
      <section className="intro">
        <h1>What is Home Décor?</h1>

        <p>
          Home décor is the art of styling and enhancing your living space to
          make it beautiful, comfortable, and functional.
        </p>

        <p>
          It involves selecting and arranging furniture, lighting, wall art,
          rugs, textiles, decorative accessories, and organizational elements
          to create a space that reflects your personality and lifestyle.
        </p>

        <p>
          At <strong>Cee Households & Decor</strong>, we transform ordinary
          spaces into elegant, cozy, and beautifully coordinated homes.
        </p>

        <p className="intro-highlight">
          We dont just sell décor — we help you create a home you will love.
        </p>
      </section>

      {/* SECTION HEADING */}
      <div className="section-heading">
        <h2>Our Services</h2>
        <p>
          Professional décor and styling solutions tailored to your space and
          lifestyle.
        </p>
      </div>

      {/* CONSULTATION */}
      <section className="services-section">
        <h2>Home Décor Consultation</h2>

        <div className="card-grid">
          <div className="card">
            <h3>Basic Consultation</h3>
            <p className="price">Starting From Ksh 2,000</p>

            <ul>
              <li>30–45 minute session</li>
              <li>General décor advice</li>
              <li>Style recommendations</li>
              <li>Space improvement ideas</li>
            </ul>
          </div>

          <div className="card">
            <h3>Standard Consultation</h3>
            <p className="price">Starting From Ksh 4,000</p>

            <ul>
              <li>1 hour consultation</li>
              <li>Color coordination ideas</li>
              <li>Furniture recommendations</li>
              <li>Décor suggestions</li>
            </ul>
          </div>

          <div className="card highlight">
            <h3>Premium Consultation</h3>
            <p className="price">Custom Quote</p>

            <ul>
              <li>Detailed styling plan</li>
              <li>Mood board creation</li>
              <li>Shopping guidance</li>
              <li>Implementation support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SITTING ROOM */}
      <section className="services-section">
        <h2>Living Room Styling & Makeovers</h2>

        <div className="card-grid">
          <div className="card">
            <h3>Basic Revamp</h3>

            <ul>
              <li>Cushion styling</li>
              <li>Wall décor placement</li>
              <li>Furniture rearrangement</li>
            </ul>
          </div>

          <div className="card">
            <h3>Standard Makeover</h3>

            <ul>
              <li>Full styling concept</li>
              <li>Color coordination</li>
              <li>Furniture layout redesign</li>
            </ul>
          </div>

          <div className="card highlight">
            <h3>Premium Transformation</h3>

            <ul>
              <li>Complete room redesign</li>
              <li>Product sourcing</li>
              <li>Professional setup</li>
              <li>Final styling</li>
            </ul>
          </div>
        </div>
      </section>

      {/* BEDROOM */}
      <section className="services-section">
        <h2>Bedroom Styling & Makeovers</h2>

        <div className="card-grid">
          <div className="card">
            <h3>Basic Bedroom Styling</h3>

            <ul>
              <li>Bedding styling</li>
              <li>Cushion arrangement</li>
              <li>Simple décor setup</li>
            </ul>
          </div>

          <div className="card">
            <h3>Standard Bedroom Makeover</h3>

            <ul>
              <li>Full room styling</li>
              <li>Color theme coordination</li>
              <li>Furniture arrangement</li>
            </ul>
          </div>

          <div className="card highlight">
            <h3>Premium Bedroom Transformation</h3>

            <ul>
              <li>Luxury styling concept</li>
              <li>Décor sourcing</li>
              <li>Complete room setup</li>
            </ul>
          </div>
        </div>
      </section>

      {/* KITCHEN */}
      <section className="services-section">
        <h2>Kitchen Organization & Styling</h2>

        <div className="card-grid">
          <div className="card">
            <h3>Basic Kitchen Upgrade</h3>

            <ul>
              <li>Organization ideas</li>
              <li>Counter styling</li>
              <li>Storage suggestions</li>
            </ul>
          </div>

          <div className="card">
            <h3>Standard Kitchen Revamp</h3>

            <ul>
              <li>Functional layout planning</li>
              <li>Shelving styling</li>
              <li>Color coordination</li>
            </ul>
          </div>

          <div className="card highlight">
            <h3>Premium Kitchen Transformation</h3>

            <ul>
              <li>Storage optimization</li>
              <li>Complete styling concept</li>
              <li>Sourcing and setup</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ADDITIONAL SERVICES */}
      <section className="services-section">
        <h2>Additional Styling Services</h2>

        <div className="card-grid">
          <div className="card">
            <h3>Airbnb Styling</h3>

            <ul>
              <li>Guest-ready spaces</li>
              <li>Décor recommendations</li>
              <li>Professional setup</li>
            </ul>
          </div>

          <div className="card">
            <h3>Office Styling</h3>

            <ul>
              <li>Workspace enhancement</li>
              <li>Reception styling</li>
              <li>Professional décor setup</li>
            </ul>
          </div>

          <div className="card highlight">
            <h3>Move-In Styling</h3>

            <ul>
              <li>New home setup</li>
              <li>Space planning</li>
              <li>Complete styling assistance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FULL HOME */}
      <section className="services-section">
        <h2>Full Home Transformation</h2>

        <div className="card-grid">
          <div className="card highlight full-house">
            <h3>Complete Home Makeover</h3>

            <p className="price">Custom Quote</p>

            <ul>
              <li>Living room styling</li>
              <li>Kitchen styling</li>
              <li>Bedroom makeovers</li>
              <li>Full home coordination</li>
              <li>Décor sourcing & setup</li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-us">
        <h2>Why Choose Cee Households & Decor</h2>

        <div className="why-grid">
          <div>
            <h3>Personalized Styling</h3>
            <p>
              Every space is designed around your lifestyle and personal taste.
            </p>
          </div>

          <div>
            <h3>Affordable Elegance</h3>
            <p>
              Beautiful interiors without unnecessary expenses.
            </p>
          </div>

          <div>
            <h3>Attention To Detail</h3>
            <p>
              Every décor element contributes to a cohesive look.
            </p>
          </div>

          <div>
            <h3>Professional Guidance</h3>
            <p>
              From consultation to final styling and transformation.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process-section">
        <h2>Our Process</h2>

        <div className="process-grid">
          <div>
            <span>01</span>
            <h3>Consultation</h3>
            <p>Understanding your needs, style, and budget.</p>
          </div>

          <div>
            <span>02</span>
            <h3>Planning</h3>
            <p>Creating a décor concept and styling recommendations.</p>
          </div>

          <div>
            <span>03</span>
            <h3>Styling</h3>
            <p>Sourcing and arranging décor elements beautifully.</p>
          </div>

          <div>
            <span>04</span>
            <h3>Transformation</h3>
            <p>Enjoy a stylish, functional, and welcoming space.</p>
          </div>
        </div>
      </section>

    </div>
  );
}