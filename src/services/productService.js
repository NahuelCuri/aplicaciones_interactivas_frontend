import api from './api';

const API_URL = '/products';

const getAllProducts = () => {
  return api.get(API_URL);
};

const getProductById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

const getProductsByCategory = (categoryId) => {
  return api.get(`${API_URL}/category/${categoryId}`);
};

const getSellerProducts = () => {
  return api.get(`${API_URL}/my-products`);
};

const searchSellerProducts = (name) => {
  return api.get(`${API_URL}/my-products/search?name=${name}`);
};

const updateProduct = (id, data) => {
  return api.put(`${API_URL}/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const deleteProduct = (id) => {
  return api.delete(`${API_URL}/${id}`);
};

const createProduct = (data) => {
  return api.post(API_URL, data, {
    headers: {
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