import api from './api';

const API_URL = '/auth';

const login = (email, password) => {
  console.log('authService.login called with:', { email, password });
  return api.post(`${API_URL}/authenticate`, {
    email,
    password,
  });
};

const register = (username, email, password, role) => {
  return api.post(`${API_URL}/register`, {
    username,
    email,
    password,
    role,
  });
};

const authService = {
  login,
  register,
};

export default authService;
