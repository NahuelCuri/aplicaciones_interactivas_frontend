import axios from 'axios';

const API_URL = 'http://localhost:8080/products';

const getAllProducts = () => {
  return axios.get(API_URL);
};

const getProductById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

const productService = {
  getAllProducts,
  getProductById,
};

export default productService;
