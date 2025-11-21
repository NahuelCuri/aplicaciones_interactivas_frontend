import api from './api';

const API_URL = '/categories';

const getAllCategories = () => {
  return api.get(API_URL);
};

const createCategory = (categoryData) => {
  return api.post(API_URL, categoryData);
};

const updateCategory = (id, categoryData) => {
  return api.put(`${API_URL}/${id}`, categoryData);
};

const deleteCategory = (id) => {
  return api.delete(`${API_URL}/${id}`);
};

const categoryService = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;
