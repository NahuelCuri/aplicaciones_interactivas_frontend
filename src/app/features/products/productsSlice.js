import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../../../services/productService';
import { createProduct } from './sellerProductsSlice';

// Thunk for all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await productService.getAllProducts();
  return response.data;
});

export const initialState = {
  list: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};


const productsSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Reducers for public products
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
      // When a seller creates a product, add it to the main product list
      .addCase(createProduct.fulfilled, (state, action) => {
        const newProductDetail = action.payload;
        // This transformation logic is similar to sellerProductsSlice to ensure consistency
        const newProductList = {
          ...newProductDetail,
          mainImageBase64: newProductDetail.images?.[0]?.content || null,
        };
        // Add the new product to the beginning of the list for immediate visibility
        if (state.status === 'succeeded') {
          state.list.unshift(newProductList);
        }
        // If the list hasn't been fetched yet, we don't need to add it,
        // as it will be included in the next fetch.
      });
  },
});

export default productsSlice.reducer;

