import axios from 'axios';

const API_URL = 'http://localhost:4002/auth';

const login = (email, password) => {
  return axios.post(`${API_URL}/authenticate`, {
    email,
    password,
  });
};

const register = (username, email, password, role) => {
  return axios.post(`${API_URL}/register`, {
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
