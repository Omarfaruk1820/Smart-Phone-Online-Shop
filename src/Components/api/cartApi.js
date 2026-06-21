import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://smart-phone-online-shop-by-node.vercel.app",
});

// Add to cart
export const addToCart = async (cartItem) => {
  const res = await axiosPublic.post("/cart", cartItem);
  return res.data;
};

// Get cart items
export const getCartItems = async (email) => {
  const res = await axiosPublic.get(`/cart/${email}`);
  return res.data;
};

// Increase quantity
export const increaseQuantity = async (id) => {
  const res = await axiosPublic.patch(`/cart/increase/${id}`);
  return res.data;
};

// Decrease quantity
export const decreaseQuantity = async (id) => {
  const res = await axiosPublic.patch(`/cart/decrease/${id}`);
  return res.data;
};

// Remove item
export const deleteCartItem = async (id) => {
  const res = await axiosPublic.delete(`/cart/${id}`);
  return res.data;
};

// Clear cart
export const clearCart = async (email) => {
  const res = await axiosPublic.delete(`/cart/clear/${email}`);
  return res.data;
};

// Cart count
export const getCartCount = async (email) => {
  const res = await axiosPublic.get(`/cart-count/${email}`);
  return res.data;
};

// Cart summary
export const getCartSummary = async (email) => {
  const res = await axiosPublic.get(`/cart-summary/${email}`);
  return res.data;
};
