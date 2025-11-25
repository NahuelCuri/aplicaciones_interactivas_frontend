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
import imagesReducer from './features/images/imageSlice';
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
  images: imagesReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    const { products, categories, roles, images } = state; 
    state = {
      categories,
      roles,
      images, 
      products: {
        ...productsInitialState,
        list: products.list,
        status: products.status,
      },
    };
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(notificationsListenerMiddleware.middleware),
});

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
