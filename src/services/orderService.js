import api from './api';

const API_URL = '/order';

const getCart = () => {
  return api.get(`${API_URL}/cart`);
};

const addItemToCart = (productId, quantity) => {
  return api.post(`${API_URL}/cart/items`, { productId, quantity });
};

const removeItemFromCart = (productId) => {
  return api.delete(`${API_URL}/cart/items/${productId}`);
};

const updateCartItemQuantity = (productId, quantity) => {
  return api.put(`${API_URL}/cart/items/${productId}`, { quantity });
};

const getOrdersByUser = (buyerId) => {
  return api.get(`${API_URL}/users/${buyerId}/orders`);
};

const checkout = () => {
  return api.post(`${API_URL}/checkout`, {});
};

export default {
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  getOrdersByUser,
  checkout,
};
