import './About.css';

export default function About() {
  return (
    <section className="about-container">
      <h1>About Cee Households & Interiors</h1>

      <p>
        Welcome to Cee Households & Interiors — your trusted online store for
        quality household items, décor, and everyday essentials.
      </p>

      <div className="about-cards">
        <div className="card">
          <h3>Our Mission</h3>
          <p>
            To provide affordable, stylish, and durable home products to
            households across Kenya and beyond.
          </p>
        </div>

        <div className="card">
          <h3>Our Vision</h3>
          <p>
            To become a leading household and interior brand known for quality,
            trust, and customer satisfaction.
          </p>
        </div>

        <div className="card">
          <h3>Why Choose Us</h3>
          <p>
            ✔ Quality products <br />
            ✔ Affordable prices <br />
            ✔ Reliable delivery <br />
            ✔ Customer-first service
          </p>
        </div>
      </div>
    </section>
  );
}
