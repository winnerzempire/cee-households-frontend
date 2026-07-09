"use client";

import { useEffect, useState } from "react";
import { getCart } from "@/lib/cart";
import { useRouter } from "next/navigation";
import "./Checkout.css";

export default function CheckoutPage() {
  const router = useRouter();

  const [cart, setCart] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    mpesa_name: "",
  });

  useEffect(() => {
    const cartItems = getCart();
    setCart(cartItems);

    // Fire Meta Pixel InitiateCheckout event
    if (
      typeof window !== "undefined" &&
      window.fbq &&
      cartItems.length > 0
    ) {
      const totalValue = cartItems.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
      );

      window.fbq("track", "InitiateCheckout", {
        value: totalValue,
        currency: "KES",
        content_type: "product",
        contents: cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          item_price: Number(item.price),
        })),
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const itemsText = cart
    .map(
      (item) =>
        `${item.name} x${item.quantity} - KSh ${
          Number(item.price) * item.quantity
        }`
    )
    .join("%0A");

  const whatsappLink = `https://wa.me/254792263571?text=
*NEW ORDER FROM CEE HOUSEHOLDS*
%0A%0A
${itemsText}
%0A%0A
*TOTAL:* KSh ${total}
%0A%0A
*Customer Details*
%0A
Name: ${form.name}
%0A
Phone: ${form.phone}
%0A
Address: ${form.address}
%0A
City: ${form.city}
%0A
M-Pesa Name: ${form.mpesa_name}
`;

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      "Order details captured successfully. Please confirm your order on WhatsApp."
    );

    window.open(whatsappLink, "_blank");
  };

  if (cart.length === 0) {
    return (
      <div className="checkoutPage">
        <div className="emptyCheckout">
          <h2>Your cart is empty</h2>
          <p>Add products to your cart before checking out.</p>

          <button
            className="placeOrderBtn"
            onClick={() => router.push("/shop")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkoutPage">
      <h1 className="checkoutTitle">Checkout</h1>

      <div className="checkoutContainer">
        {/* LEFT SIDE */}
        <div className="checkoutForm">
          <h2>Customer Details</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              required
              onChange={handleChange}
            />

            <input
              type="text"
              name="address"
              placeholder="Delivery Address"
              required
              onChange={handleChange}
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              required
              onChange={handleChange}
            />

            <input
              type="text"
              name="mpesa_name"
              placeholder="M-Pesa Registered Name"
              required
              onChange={handleChange}
            />

            <button type="submit" className="placeOrderBtn">
              Confirm Order
            </button>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="orderSummary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div className="summaryItem" key={item.id}>
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                KSh {Number(item.price) * item.quantity}
              </span>
            </div>
          ))}

          <div className="summaryTotal">
            Total: KSh {total}
          </div>

          {/* PAYMENT BOX */}
          <div className="mpesaBox">
            <h3>M-Pesa Payment</h3>

            <p>1. Pay using the Till Number below.</p>
            <p>2. Enter your registered M-Pesa name.</p>
            <p>3. Click Confirm Order.</p>
            <p>4. The order will be sent to WhatsApp.</p>

            <br />

            <p>
              <strong>Till Number:</strong> 4315570
            </p>

            <p>
              <strong>Name:</strong> Cynthia Kwamboka & Mugambi
            </p>
          </div>

          {/* TRUST SECTION */}
          <div className="checkoutTrust">
            <p>✅ Secure Checkout</p>
            <p>🚚 Countrywide Delivery</p>
            <p>💬 Dedicated Customer Support</p>
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsappBtn"
          >
            Confirm Order on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}