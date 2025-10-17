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

const becomeSeller = () => {
  return axios.put(`${API_URL}/become-seller`, {}, getAuthHeaders());
};

export default {
  becomeSeller,
};
