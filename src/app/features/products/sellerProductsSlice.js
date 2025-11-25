import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../../../services/productService';
import { fetchImagesByProductId } from '../images/imageSlice';

export const fetchSellerProducts = createAsyncThunk('sellerProducts/fetch', async (_, { dispatch }) => {
  const response = await productService.getSellerProducts();
  if (response.data) {
    for (const product of response.data) {
      if (product.imageIds && product.imageIds.length > 0) {
        await dispatch(fetchImagesByProductId(product.id));
      }
    }
  }
  return response.data;
});

export const searchSellerProducts = createAsyncThunk('sellerProducts/search', async (searchTerm) => {
  const response = await productService.searchSellerProducts(searchTerm);
  return response.data;
});

export const createProduct = createAsyncThunk('sellerProducts/create', async (productData, { getState, dispatch }) => {
  const response = await productService.createProduct(productData);
  const newProductDetail = response.data;
  
  if (newProductDetail && newProductDetail.id) {
    await dispatch(fetchImagesByProductId(newProductDetail.id));
  }

  const { categories } = getState().categories;
  const category = categories.find(cat => cat.id == newProductDetail.categoryId);
  const categoryName = category ? category.name : 'Unknown';

  return {
    ...newProductDetail,
    categoryName,
  };
});

export const updateProduct = createAsyncThunk('sellerProducts/update', async ({ id, data }, { dispatch }) => {
  const response = await productService.updateProduct(id, data);
  let updatedProduct = response.data;

  if (updatedProduct) {
    const imageResultAction = await dispatch(fetchImagesByProductId(updatedProduct.id));

    if (fetchImagesByProductId.fulfilled.match(imageResultAction)) {
      const fetchedImages = imageResultAction.payload;
      
      const freshImageIds = fetchedImages.map(img => img.id);

      updatedProduct = {
        ...updatedProduct,
        imageIds: freshImageIds
      };
    }
  }
  
  return updatedProduct;
});

export const deleteProduct = createAsyncThunk('sellerProducts/delete', async (productId, { getState }) => {
  const state = getState();
  const productToDelete = state.sellerProducts.list.find(p => p.id === productId);
  const imageIds = productToDelete ? productToDelete.imageIds : [];

  await productService.deleteProduct(productId);

  return { id: productId, imageIds };
});

const initialState = {
  list: [],
  status: 'idle', 
  error: null,
};

const sellerProductsSlice = createSlice({
  name: 'sellerProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(createProduct.fulfilled, (state, action) => {
        const newProductDetail = action.payload;
        state.list.push(newProductDetail);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProductDetail = action.payload;
        const index = state.list.findIndex(p => p.id === updatedProductDetail.id);
        if (index !== -1) {
          state.list[index] = updatedProductDetail;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const productId = action.payload.id; 
        state.list = state.list.filter(p => p.id !== productId);
      });
  },
});

export default sellerProductsSlice.reducer;
