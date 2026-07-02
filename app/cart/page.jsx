"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCart, removeFromCart, updateQuantity } from "@/lib/cart";
import "./Cart.css";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  const loadCart = () => {
    setCart(getCart());
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = (id) => {
    removeFromCart(id);
    loadCart();
  };

  const increaseQty = (id) => {
    updateQuantity(id, 1);
    loadCart();
  };

  const decreaseQty = (id) => {
    updateQuantity(id, -1);
    loadCart();
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    loadCart();
  };

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="cartPage">

      <h1 className="cartTitle">
        Shopping Cart ({totalItems} Items)
      </h1>

      {cart.length === 0 ? (

        <div className="emptyCart">

          <h2>Your cart is empty 🛒</h2>

          <p>
            Looks like you haven't added any products yet.
          </p>

          <Link href="/shop" className="continueShopping">
            Continue Shopping
          </Link>

        </div>

      ) : (

        <div className="cartContainer">

          {/* CART ITEMS */}
          <div className="cartItems">

            {cart.map((item) => (

              <div className="cartItem" key={item.id}>

                <img
                  src={item.image}
                  alt={item.name}
                  className="cartImage"
                />

                <div className="cartInfo">

                  <h3>{item.name}</h3>

                  <p className="cartPrice">
                    KSh {Number(item.price).toLocaleString()}
                  </p>

                  <div className="qtyControls">

                    <button
                      onClick={() => decreaseQty(item.id)}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </button>

                  </div>

                </div>

                <div className="cartActions">

                  <p className="itemTotal">
                    KSh{" "}
                    {(
                      Number(item.price) *
                      item.quantity
                    ).toLocaleString()}
                  </p>

                  <button
                    className="removeBtn"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* SUMMARY */}
          <div className="cartSummary">

            <h2>Cart Summary</h2>

            <p>
              Total Items: <strong>{totalItems}</strong>
            </p>

            <h3>
              Total: KSh {total.toLocaleString()}
            </h3>

            <div className="deliveryInfo">
              <p>🚚 Countrywide Delivery</p>
              <p>🔒 Secure Checkout</p>
              <p>💬 Customer Support</p>
            </div>

            <Link
              href="/shop"
              className="continueBtn"
            >
              Continue Shopping
            </Link>

            <Link
              href="/checkout"
              className="checkoutBtn"
            >
              Proceed to Checkout
            </Link>

            <button
              className="clearCartBtn"
              onClick={clearCart}
            >
              Clear Cart
            </button>

          </div>

        </div>

      )}

    </div>
  );
}