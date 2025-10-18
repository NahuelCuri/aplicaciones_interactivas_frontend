import axios from 'axios';

const API_URL = 'http://localhost:8080/categories';

const getAuthHeaders = () => {
  const token = sessionStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getAllCategories = () => {
  return axios.get(API_URL);
};

const createCategory = (categoryData) => {
  return axios.post(API_URL, categoryData, getAuthHeaders());
};

const updateCategory = (id, categoryData) => {
  return axios.put(`${API_URL}/${id}`, categoryData, getAuthHeaders());
};

const deleteCategory = (id) => {
  return axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};

const categoryService = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;
