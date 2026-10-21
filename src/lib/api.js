const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

const TOKEN_KEY = "authToken";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

// DRF validation errors come back as {field: ["msg"]} or {detail: "msg"} -
// flatten either shape into one readable string for the UI.
export function errorMessage(err, fallback = "Something went wrong. Please try again.") {
  const data = err?.data;
  if (!data) return err?.message || fallback;
  if (typeof data === "string") return data;
  if (data.detail) return data.detail;
  const firstKey = Object.keys(data)[0];
  if (firstKey) {
    const value = data[firstKey];
    return Array.isArray(value) ? value[0] : String(value);
  }
  return fallback;
}

async function request(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Token ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const error = new Error((data && data.detail) || `Request to ${path} failed`);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  register: (payload) => request("/auth/register", { method: "POST", body: payload, auth: false }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload, auth: false }),
  logout: () => request("/auth/logout", { method: "POST" }),
  me: () => request("/auth/me"),

  addCartItem: (productId, quantity = 1) =>
    request("/cart/add_item/", { method: "POST", body: { product_id: productId, quantity } }),
  clearBackendCart: () => request("/cart/clear/", { method: "POST" }),

  createOrder: (payload) => request("/orders/", { method: "POST", body: payload }),
  listOrders: () => request("/orders/"),
  getOrder: (orderId) => request(`/orders/${orderId}/`),
  payOrder: (orderId, phoneNumber) =>
    request(`/orders/${orderId}/pay/`, { method: "POST", body: { phone_number: phoneNumber } }),
  paymentStatus: (orderId) => request(`/orders/${orderId}/payment-status/`),
  confirmPayment: (orderId, mpesaReceiptNumber) =>
    request(`/orders/${orderId}/confirm-payment/`, {
      method: "POST",
      body: { mpesa_receipt_number: mpesaReceiptNumber },
    }),
};
