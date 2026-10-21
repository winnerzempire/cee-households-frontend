"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { api, errorMessage } from "@/lib/api";
import PaymentStatusCard from "@/components/PaymentStatusCard";
import "./OrderStatus.css";

export default function OrderStatusPage() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();

  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) return;

    api
      .getOrder(id)
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(errorMessage(err, "Could not load this order."));
        setLoading(false);
      });
  }, [id, user, authLoading]);

  if (!authLoading && !user) {
    return (
      <div className="orderStatusPage">
        <p>
          <Link href={`/login?next=/orders/${id}`}>Log in</Link> to view this
          order.
        </p>
      </div>
    );
  }

  if (loading) {
    return <div className="orderStatusPage">Loading order...</div>;
  }

  if (error) {
    return (
      <div className="orderStatusPage">
        <p className="orderStatusError">{error}</p>
      </div>
    );
  }

  return (
    <div className="orderStatusPage">
      <h1>Order {order.order_number}</h1>

      <div className="orderDetailCard">
        <p>
          Placed {new Date(order.created_at).toLocaleString()} - status:{" "}
          <strong>{order.status}</strong>
        </p>

        <div className="orderItemsList">
          {order.items.map((item) => (
            <div className="orderItemRow" key={item.id}>
              <span>
                {item.product_name} × {item.quantity}
              </span>
              <span>KSh {Number(item.total_price).toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div className="orderTotalsList">
          <div><span>Subtotal</span><span>KSh {Number(order.subtotal).toLocaleString()}</span></div>
          <div><span>Shipping</span><span>KSh {Number(order.shipping_cost).toLocaleString()}</span></div>
          <div><span>Tax</span><span>KSh {Number(order.tax_amount).toLocaleString()}</span></div>
          <div className="orderGrandTotal"><span>Total</span><span>KSh {Number(order.total_amount).toLocaleString()}</span></div>
        </div>
      </div>

      <PaymentStatusCard
        order={{
          id: order.id,
          status: order.status,
          payment_status: order.payment_status,
          payment: null,
        }}
        mpesaPhone={order.customer_phone}
      />
    </div>
  );
}
