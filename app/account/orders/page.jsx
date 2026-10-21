"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { api, errorMessage } from "@/lib/api";
import "./MyOrders.css";

export default function MyOrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) return;

    api
      .listOrders()
      .then((data) => {
        setOrders(data.results || data);
        setLoading(false);
      })
      .catch((err) => {
        setError(errorMessage(err, "Could not load your orders."));
        setLoading(false);
      });
  }, [user, authLoading]);

  if (!authLoading && !user) {
    return (
      <div className="myOrdersPage">
        <p>
          <Link href="/login?next=/account/orders">Log in</Link> to see your orders.
        </p>
      </div>
    );
  }

  if (loading) return <div className="myOrdersPage">Loading your orders...</div>;
  if (error) return <div className="myOrdersPage"><p className="myOrdersError">{error}</p></div>;

  return (
    <div className="myOrdersPage">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>You haven&apos;t placed any orders yet.</p>
      ) : (
        <div className="myOrdersList">
          {orders.map((order) => (
            <Link href={`/orders/${order.id}`} key={order.id} className="myOrderRow">
              <div>
                <strong>{order.order_number}</strong>
                <span className="myOrderDate">
                  {new Date(order.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="myOrderMeta">
                <span>KSh {Number(order.total_amount).toLocaleString()}</span>
                <span className={`myOrderBadge myOrderBadge-${order.payment_status}`}>
                  {order.payment_status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
