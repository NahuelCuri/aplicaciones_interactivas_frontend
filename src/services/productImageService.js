import api from './api';

const API_URL = '/product-images';

const addImageToProduct = (productId, imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  return api.post(`${API_URL}/product/${productId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const getImagesByProduct = (productId) => {
  return api.get(`${API_URL}/product/${productId}`);
};

const deleteImage = (imageId) => {
  return api.delete(`${API_URL}/${imageId}`);
};

const productImageService = {
  addImageToProduct,
  getImagesByProduct,
  deleteImage,
};

export default productImageService;
