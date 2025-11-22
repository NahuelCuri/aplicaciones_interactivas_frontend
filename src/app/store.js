import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productsReducer, { initialState as productsInitialState } from './features/products/productsSlice';
import productDetailReducer from './features/products/productDetailSlice';
import sellerProductsReducer from './features/products/sellerProductsSlice';
import filterReducer from './features/filters/filterSlice';
import categoriesReducer from './features/categories/categorySlice';
import usersReducer from './features/users/userSlice';
import authReducer, { logout } from './features/auth/authSlice';
import cartReducer from './features/cart/cartSlice';
import orderReducer from './features/orders/orderSlice';
import rolesReducer from './features/roles/roleSlice';
import { notificationsListenerMiddleware } from './middleware/notificationsMiddleware';
import api from '../services/api';

const appReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  productDetail: productDetailReducer,
  sellerProducts: sellerProductsReducer,
  filters: filterReducer,
  categories: categoriesReducer,
  users: usersReducer,
  cart: cartReducer,
  orders: orderReducer,
  roles: rolesReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    // On logout, create a new state.
    const { products, categories, roles } = state;
    state = {
      // Keep fully public slices
      categories,
      roles,
      // For the products slice, keep public data but reset user-specific data
      products: {
        ...productsInitialState,
        list: products.list,
        status: products.status,
      },
    };
    // Slices not defined in the new state object (auth, cart, users, filters, productDetail, sellerProducts)
    // will be reset to their initial state by the appReducer.
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(notificationsListenerMiddleware.middleware),
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
