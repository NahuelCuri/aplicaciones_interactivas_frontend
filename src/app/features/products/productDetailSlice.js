import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../../../services/productService';

// Thunk for single product
export const fetchProductById = createAsyncThunk('productDetail/fetchById', async (productId) => {
    const response = await productService.getProductById(productId);
    return response.data;
});

const initialState = {
  detail: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    clearProductDetail: (state) => {
      state.detail = null;
      state.status = 'idle';
      state.error = null;
    },
    setProductDetail: (state, action) => {
        state.detail = action.payload;
        state.status = 'succeeded';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.detail = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearProductDetail, setProductDetail } = productDetailSlice.actions;
export default productDetailSlice.reducer;
