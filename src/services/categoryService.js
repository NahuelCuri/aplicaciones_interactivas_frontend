import axios from 'axios';

const API_URL = 'http://localhost:8080/categories';

const getAllCategories = () => {
  return axios.get(API_URL);
};

const categoryService = {
  getAllCategories,
};

export default categoryService;
