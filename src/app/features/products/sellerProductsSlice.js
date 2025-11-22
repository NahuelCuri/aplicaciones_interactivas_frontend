import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../../../services/productService';

// Thunks for seller products
export const fetchSellerProducts = createAsyncThunk('sellerProducts/fetch', async () => {
  const response = await productService.getSellerProducts();
  return response.data;
});

export const searchSellerProducts = createAsyncThunk('sellerProducts/search', async (searchTerm) => {
  const response = await productService.searchSellerProducts(searchTerm);
  return response.data;
});

export const createProduct = createAsyncThunk('sellerProducts/create', async (productData, { getState }) => {
  const response = await productService.createProduct(productData);
  const newProductDetail = response.data;
  
  const { categories } = getState().categories;
  const category = categories.find(cat => cat.id == newProductDetail.categoryId);
  const categoryName = category ? category.name : 'Unknown';

  return {
    ...newProductDetail,
    categoryName,
  };
});

export const updateProduct = createAsyncThunk('sellerProducts/update', async ({ id, data }) => {
  const response = await productService.updateProduct(id, data);
  return response.data;
});

export const deleteProduct = createAsyncThunk('sellerProducts/delete', async (productId) => {
  await productService.deleteProduct(productId);
  return productId;
});

const initialState = {
  list: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const sellerProductsSlice = createSlice({
  name: 'sellerProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch and search
      .addCase(fetchSellerProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(searchSellerProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchSellerProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(searchSellerProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // CRUD operations
      .addCase(createProduct.fulfilled, (state, action) => {
        const newProductDetail = action.payload;
        // Transform the detailed DTO into a list DTO if necessary
        const newProductList = {
          ...newProductDetail,
          mainImageBase64: newProductDetail.images?.[0]?.content || null,
        };
        state.list.push(newProductList);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProductDetail = action.payload;
        const updatedProductList = {
          ...updatedProductDetail,
          mainImageBase64: updatedProductDetail.images?.[0]?.content || null,
        };
        const index = state.list.findIndex(p => p.id === updatedProductList.id);
        if (index !== -1) {
          state.list[index] = updatedProductList;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const productId = action.payload;
        state.list = state.list.filter(p => p.id !== productId);
      });
  },
});

export default sellerProductsSlice.reducer;
