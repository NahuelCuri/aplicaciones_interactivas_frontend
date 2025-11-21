import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import filterReducer from './features/filters/filterSlice';
import categoriesReducer from './features/categories/categorySlice';
import usersReducer from './features/users/userSlice';
import authReducer, { logout } from './features/auth/authSlice';
import cartReducer from './features/cart/cartSlice';
import api from '../services/api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    filters: filterReducer,
    categories: categoriesReducer,
    users: usersReducer,
    cart: cartReducer,
  },
});

// Setup interceptors after store is created
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      if (store.getState().auth.token) {
        console.log('Token expired or invalid. Logging out silently.');
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);
