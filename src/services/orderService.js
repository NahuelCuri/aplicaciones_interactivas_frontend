import axios from 'axios';

const API_URL = 'http://localhost:8080/order';

const getAuthHeaders = () => {
  const token = sessionStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getCart = () => {
  return axios.get(`${API_URL}/cart`, getAuthHeaders());
};

const addItemToCart = (productId, quantity) => {
  return axios.post(`${API_URL}/cart/items`, { productId, quantity }, getAuthHeaders());
};

const removeItemFromCart = (productId) => {
  return axios.delete(`${API_URL}/cart/items/${productId}`, getAuthHeaders());
};

const updateCartItemQuantity = (productId, quantity) => {
  return axios.put(`${API_URL}/cart/items/${productId}`, { quantity }, getAuthHeaders());
};

const getOrdersByUser = (buyerId) => {
  return axios.get(`${API_URL}/users/${buyerId}/orders`, getAuthHeaders());
};

export default {
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  getOrdersByUser,
};
