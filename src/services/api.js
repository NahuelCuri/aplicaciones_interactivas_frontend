import axios from 'axios';
import { store } from '../app/store';
import { logout } from '../app/features/auth/authSlice';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the error is because of an expired token
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // We check if there was a token to begin with.
      // This avoids logging out on initial unauthorized access attempts.
      if (store.getState().auth.token) {
        console.log('Token expired or invalid. Logging out silently.');
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);

export default api;
