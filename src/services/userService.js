import api from './api';

const API_URL = '/users';

const getUsers = () => {
  return api.get(API_URL);
};

const updateUser = (id, userData) => {
  return api.put(`${API_URL}/${id}`, userData);
};

const deleteUser = (id) => {
  return api.delete(`${API_URL}/${id}`);
};

const becomeSeller = () => {
  return api.put(`${API_URL}/become-seller`, {});
};

export default {
  getUsers,
  updateUser,
  deleteUser,
  becomeSeller,
};
