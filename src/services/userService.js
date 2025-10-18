import axios from 'axios';

const API_URL = 'http://localhost:8080/users';

const getAuthHeaders = () => {
  const token = sessionStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getUsers = () => {
  return axios.get(API_URL, getAuthHeaders());
};

const updateUser = (id, userData) => {
  return axios.put(`${API_URL}/${id}`, userData, getAuthHeaders());
};

const deleteUser = (id) => {
  return axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};

const becomeSeller = () => {
  return axios.put(`${API_URL}/become-seller`, {}, getAuthHeaders());
};

export default {
  getUsers,
  updateUser,
  deleteUser,
  becomeSeller,
};
