import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../../../services/productService';
import { createProduct, updateProduct, deleteProduct } from './sellerProductsSlice';
import { fetchImagesByProductId } from '../images/imageSlice';


export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { dispatch }) => {
  const response = await productService.getAllProducts();
  if (response.data) {
    response.data.forEach(product => {
      if (product.imageIds && product.imageIds.length > 0) {
        dispatch(fetchImagesByProductId(product.id));
      }
    });
  }
  return response.data;
});

export const initialState = {
  list: [],
  status: 'idle', 
  error: null,
};


const productsSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        const newProductDetail = action.payload;
        if (state.status === 'succeeded') {
          state.list.unshift(newProductDetail);
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const deletedId = action.payload.id; 
        state.list = state.list.filter(product => product.id !== deletedId);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const index = state.list.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
          state.list[index] = updatedProduct;
        }
      });
  },
});

export default productsSlice.reducer;

