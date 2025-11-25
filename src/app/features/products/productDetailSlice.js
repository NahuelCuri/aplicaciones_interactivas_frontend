import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../../../services/productService';
import { fetchImagesByProductId } from '../images/imageSlice';


export const fetchProductById = createAsyncThunk('productDetail/fetchById', async (productId, { dispatch }) => {
    const response = await productService.getProductById(productId);
    if (response.data) {
        dispatch(fetchImagesByProductId(response.data.id));
    }
    return response.data;
});

const initialState = {
  detail: null,
  status: 'idle', 
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
