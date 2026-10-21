"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { api, errorMessage } from "@/lib/api";
import PaymentStatusCard from "@/components/PaymentStatusCard";
import "./Checkout.css";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: user?.email || "",
    address_line_1: "",
    city: "",
    state: "",
    postal_code: "",
    country: "Kenya",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null); // set once the order + STK push succeed

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      // The backend's Order is built from its own Cart, separate from this
      // app's localStorage cart - push our items across before checking out.
      await api.clearBackendCart();
      for (const item of cartItems) {
        await api.addCartItem(item.id, item.quantity);
      }

      const shippingAddress = {
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone,
        email: form.email,
        address_line_1: form.address_line_1,
        city: form.city,
        state: form.state,
        postal_code: form.postal_code,
        country: form.country,
      };

      const createdOrder = await api.createOrder({
        shipping_address: shippingAddress,
        customer_phone: form.phone,
        payment_method: "mpesa",
      });

      const payResult = await api.payOrder(createdOrder.id, form.phone);

      clearCart();
      setOrder({
        id: createdOrder.id,
        order_number: createdOrder.order_number,
        total_amount: createdOrder.total_amount,
        status: createdOrder.status,
        payment_status: "pending",
        payment: payResult.payment,
      });
    } catch (err) {
      setError(errorMessage(err, "Could not place your order. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  // --- Order placed, STK push sent: show live payment status ---
  if (order) {
    return (
      <div className="checkoutPage">
        <h1 className="checkoutTitle">Order placed</h1>
        <div className="orderPlacedContainer">
          <div className="orderPlacedSummary">
            <p>
              Order <strong>{order.order_number}</strong> - KSh{" "}
              {Number(order.total_amount).toLocaleString()}
            </p>
            <p>An M-Pesa prompt has been sent to {form.phone}. Enter your PIN to complete payment.</p>
          </div>

          <PaymentStatusCard order={order} mpesaPhone={form.phone} />

          <Link href={`/orders/${order.id}`} className="viewOrderLink">
            View order status page
          </Link>
        </div>
      </div>
    );
  }

  if (!authLoading && !user) {
    return (
      <div className="checkoutPage">
        <div className="emptyCheckout">
          <h2>Log in to check out</h2>
          <p>Create an account or log in to place your order and track payment.</p>
          <div className="authPrompt">
            <Link href="/login?next=/checkout" className="placeOrderBtn">
              Log In
            </Link>
            <Link href="/register?next=/checkout" className="placeOrderBtn placeOrderBtnOutline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
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
          <h2>Shipping & M-Pesa Details</h2>

          {error && <p className="checkoutError">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              required
              value={form.first_name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              required
              value={form.last_name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="M-Pesa Phone Number (e.g. 0712345678)"
              required
              value={form.phone}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address_line_1"
              placeholder="Delivery Address"
              required
              value={form.address_line_1}
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              required
              value={form.city}
              onChange={handleChange}
            />
            <input
              type="text"
              name="state"
              placeholder="County/State"
              required
              value={form.state}
              onChange={handleChange}
            />
            <input
              type="text"
              name="postal_code"
              placeholder="Postal Code"
              required
              value={form.postal_code}
              onChange={handleChange}
            />

            <button type="submit" className="placeOrderBtn" disabled={submitting}>
              {submitting ? "Placing order..." : "Place Order & Pay with M-Pesa"}
            </button>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="orderSummary">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div className="summaryItem" key={item.id}>
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                KSh {(Number(item.price) * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}

          <div className="summaryTotal">
            Subtotal: KSh {total.toLocaleString()}
          </div>
          <p className="summaryNote">
            Shipping (KSh 200) and 16% VAT are added on the next step.
          </p>

          <div className="mpesaBox">
            <h3>How M-Pesa payment works</h3>
            <p>1. Click &quot;Place Order &amp; Pay with M-Pesa&quot;.</p>
            <p>2. You&apos;ll get an STK prompt on your phone.</p>
            <p>3. Enter your M-Pesa PIN to confirm.</p>
            <p>4. We confirm automatically and email you a receipt.</p>
          </div>

          <div className="checkoutTrust">
            <p>✅ Secure Checkout</p>
            <p>🚚 Countrywide Delivery</p>
            <p>💬 Dedicated Customer Support</p>
          </div>
        </div>
      </div>
    </div>
  );
}
