import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import filterReducer from './features/filters/filterSlice';
import categoriesReducer from './features/categories/categorySlice';
import usersReducer from './features/users/userSlice';
import authReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    filters: filterReducer,
    categories: categoriesReducer,
    users: usersReducer,
  },
});
