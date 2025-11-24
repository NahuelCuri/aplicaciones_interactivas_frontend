import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../../../services/productService';
import { fetchImagesByProductId } from '../images/imageSlice';

// Thunks for seller products
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
  // 1. Perform the update on the backend
  const response = await productService.updateProduct(id, data);
  let updatedProduct = response.data;

  if (updatedProduct) {
    // 2. Fetch the images immediately. 
    // We capture the 'action' returned by the dispatch to access the payload.
    const imageResultAction = await dispatch(fetchImagesByProductId(updatedProduct.id));

    // 3. Check if the image fetch was successful
    if (fetchImagesByProductId.fulfilled.match(imageResultAction)) {
      const fetchedImages = imageResultAction.payload; // This is the array of actual image objects
      
      // 4. EXTRACT the fresh IDs from the images we just fetched
      const freshImageIds = fetchedImages.map(img => img.id);

      // 5. Override the product's imageIds with these fresh IDs.
      // This ensures the Product List slice points to the exact same IDs that are now in the Images slice.
      updatedProduct = {
        ...updatedProduct,
        imageIds: freshImageIds
      };
    }
  }
  
  return updatedProduct;
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
        const productId = action.payload;
        state.list = state.list.filter(p => p.id !== productId);
      });
  },
});

export default sellerProductsSlice.reducer;
