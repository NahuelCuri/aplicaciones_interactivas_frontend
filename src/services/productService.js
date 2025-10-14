import axios from 'axios';

const API_URL = 'http://localhost:8080/products';

const getAllProducts = () => {
  return axios.get(API_URL);
};

const getProductById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

const getProductsByCategory = (categoryId) => {
  return axios.get(`${API_URL}/category/${categoryId}`);
};

const getSellerProducts = () => {
  const token = sessionStorage.getItem('token');
  return axios.get(`${API_URL}/my-products`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const searchSellerProducts = (name) => {
  const token = sessionStorage.getItem('token');
  return axios.get(`${API_URL}/my-products/search?name=${name}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const productService = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getSellerProducts,
  searchSellerProducts,
};

export default productService;
