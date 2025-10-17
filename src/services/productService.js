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

const updateProduct = (id, data) => {
  const token = sessionStorage.getItem('token');
  return axios.put(`${API_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};

const deleteProduct = (id) => {
  const token = sessionStorage.getItem('token');
  return axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const createProduct = (data) => {
  const token = sessionStorage.getItem('token');
  return axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};

const productService = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getSellerProducts,
  searchSellerProducts,
  updateProduct,
  deleteProduct,
  createProduct,
};

export default productService;