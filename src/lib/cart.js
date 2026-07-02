// Get cart from localStorage
export const getCart = () => {
  if (typeof window === "undefined") return [];

  const cart = localStorage.getItem("cart");

  try {
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error parsing cart:", error);
    return [];
  }
};

// Save cart to localStorage
export const saveCart = (cart) => {
  if (typeof window === "undefined") return;

  localStorage.setItem("cart", JSON.stringify(cart));
};

// Add product to cart
export const addToCart = (product) => {
  const cart = getCart();

  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || null,
      quantity: 1,
    });
  }

  saveCart(cart);
};

// Remove product completely from cart
export const removeFromCart = (id) => {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.id !== id);

  saveCart(updatedCart);
};

// Increase or decrease quantity
export const updateQuantity = (id, change) => {
  const cart = getCart();

  const item = cart.find((product) => product.id === id);

  if (!item) return;

  item.quantity += change;

  // Remove item if quantity becomes 0
  if (item.quantity <= 0) {
    const updatedCart = cart.filter((product) => product.id !== id);
    saveCart(updatedCart);
  } else {
    saveCart(cart);
  }
};