"use client";

import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { api, errorMessage } from "@/lib/api";
import "./PaymentStatusCard.css";

const POLL_INTERVAL_MS = 4000;
const POLL_TIMEOUT_MS = 2 * 60 * 1000;

/**
 * Polls GET /orders/{id}/payment-status/ while a payment is pending, and lets
 * the buyer either retry the STK push or self-report their M-Pesa code if the
 * automatic callback never arrives. `order` is the latest known order object
 * (from create-order or a page load); `onUpdate` is called with the freshest
 * order/payment status every time it changes.
 */
export default function PaymentStatusCard({ order, mpesaPhone, onUpdate }) {
  const [payment, setPayment] = useState(order.payment || null);
  const [orderStatus, setOrderStatus] = useState(order.status);
  const [paymentStatus, setPaymentStatus] = useState(order.payment_status);
  const [polling, setPolling] = useState(paymentStatus === "pending");
  const [actionError, setActionError] = useState("");
  const [retrying, setRetrying] = useState(false);
  const [reportedCode, setReportedCode] = useState("");
  const [reconciling, setReconciling] = useState(false);

  const pollStart = useRef(Date.now());

  const applyStatus = (data) => {
    setOrderStatus(data.order_status);
    setPaymentStatus(data.payment_status);
    setPayment(data.payment);
    if (onUpdate) onUpdate(data);
    if (data.payment_status !== "pending") setPolling(false);
  };

  useEffect(() => {
    if (!polling) return;

    const tick = async () => {
      if (Date.now() - pollStart.current > POLL_TIMEOUT_MS) {
        setPolling(false);
        return;
      }
      try {
        const data = await api.paymentStatus(order.id);
        applyStatus(data);
      } catch {
        // transient network hiccup - keep polling, next tick will retry
      }
    };

    tick();
    const interval = setInterval(tick, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [polling, order.id]);

  const handleRetryPay = async () => {
    setActionError("");
    setRetrying(true);
    try {
      await api.payOrder(order.id, mpesaPhone);
      pollStart.current = Date.now();
      setPaymentStatus("pending");
      setPolling(true);
    } catch (err) {
      setActionError(errorMessage(err, "Could not send the M-Pesa prompt. Try again."));
    } finally {
      setRetrying(false);
    }
  };

  const handleReconcile = async (e) => {
    e.preventDefault();
    if (!reportedCode.trim()) return;

    setActionError("");
    setReconciling(true);
    try {
      const data = await api.confirmPayment(order.id, reportedCode.trim());
      applyStatus(data);
      if (data.payment_status === "pending") {
        setActionError(
          "We checked with M-Pesa and this payment hasn't cleared yet. It can take a minute - try again shortly."
        );
        setPolling(true);
      }
    } catch (err) {
      setActionError(errorMessage(err, "Could not verify that M-Pesa code right now."));
    } finally {
      setReconciling(false);
    }
  };

  return (
    <div className="paymentStatusCard">
      <h3>Payment status</h3>

      {paymentStatus === "paid" && (
        <p className="statusPaid">
          ✅ Payment received - order confirmed
          {payment?.mpesa_receipt_number && ` (M-Pesa code: ${payment.mpesa_receipt_number})`}.
        </p>
      )}

      {paymentStatus === "pending" && polling && (
        <p className="statusPending">
          ⏳ Waiting for payment. Enter your M-Pesa PIN on your phone when prompted.
        </p>
      )}

      {paymentStatus === "pending" && !polling && (
        <p className="statusPending">
          Still pending. If you already paid, enter your M-Pesa code below to check again.
        </p>
      )}

      {paymentStatus === "failed" && (
        <p className="statusFailed">
          ❌ Payment {orderStatus === "cancelled" ? "cancelled" : "did not go through"}
          {payment?.result_desc && `: ${payment.result_desc}`}.
        </p>
      )}

      {actionError && <p className="statusError">{actionError}</p>}

      {paymentStatus !== "paid" && (
        <div className="statusActions">
          <button type="button" onClick={handleRetryPay} disabled={retrying}>
            {retrying ? "Sending prompt..." : "Resend M-Pesa prompt"}
          </button>

          <form className="reconcileForm" onSubmit={handleReconcile}>
            <input
              type="text"
              placeholder="Already paid? Enter your M-Pesa code"
              value={reportedCode}
              onChange={(e) => setReportedCode(e.target.value)}
            />
            <button type="submit" disabled={reconciling}>
              {reconciling ? "Checking..." : "Check"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

PaymentStatusCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    status: PropTypes.string,
    payment_status: PropTypes.string,
    payment: PropTypes.object,
  }).isRequired,
  mpesaPhone: PropTypes.string.isRequired,
  onUpdate: PropTypes.func,
};
