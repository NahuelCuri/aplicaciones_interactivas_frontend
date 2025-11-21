import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../../../services/productService';

// Thunk for all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await productService.getAllProducts();
  return response.data;
});

// Thunks for seller products
export const fetchSellerProducts = createAsyncThunk('products/fetchSellerProducts', async () => {
  try {
    const response = await productService.getSellerProducts();
    return response.data;
  } catch (error) {
    console.error('Error fetching seller products:', error.response ? error.response.data : error.message);
    throw error;
  }
});

export const searchSellerProducts = createAsyncThunk('products/searchSellerProducts', async (searchTerm) => {
  const response = await productService.searchSellerProducts(searchTerm);
  return response.data;
});

export const createProduct = createAsyncThunk('products/createProduct', async (productData, { getState }) => {
  const response = await productService.createProduct(productData);
  const newProductDetail = response.data;
  
  // Enrich the product with the category name from the state
  const { categories } = getState().categories;
  const category = categories.find(cat => cat.id == newProductDetail.categoryId);
  
  const categoryName = category ? category.name : 'Unknown';

  return {
    ...newProductDetail,
    categoryName,
  };
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, data }) => {
  const response = await productService.updateProduct(id, data);
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
  await productService.deleteProduct(productId);
  return productId;
});

// Thunk for single product
export const fetchProductById = createAsyncThunk('products/fetchProductById', async (productId) => {
    const response = await productService.getProductById(productId);
    return response.data;
});


const productsSlice = createSlice({
  name: 'products',
  initialState: {
    // For public product list
    products: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    // For seller's own products
    sellerProducts: [],
    sellerStatus: 'idle',
    sellerError: null,
    // For single product view/edit
    selectedProduct: null,
    selectedProductStatus: 'idle',
    selectedProductError: null,
  },
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.selectedProductStatus = 'idle';
      state.selectedProductError = null;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
      state.selectedProductStatus = 'succeeded';
    },
  },
  extraReducers: (builder) => {
    builder
      // Reducers for public products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Reducers for seller products
      .addCase(fetchSellerProducts.pending, (state) => {
        state.sellerStatus = 'loading';
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.sellerStatus = 'succeeded';
        state.sellerProducts = action.payload;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.sellerStatus = 'failed';
        state.sellerError = action.error.message;
      })
      .addCase(searchSellerProducts.pending, (state) => {
        state.sellerStatus = 'loading';
      })
      .addCase(searchSellerProducts.fulfilled, (state, action) => {
        state.sellerStatus = 'succeeded';
        state.sellerProducts = action.payload;
      })
      .addCase(searchSellerProducts.rejected, (state, action) => {
        state.sellerStatus = 'failed';
        state.sellerError = action.error.message;
      })
      // Reducers for single product
      .addCase(fetchProductById.pending, (state) => {
        state.selectedProductStatus = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProductStatus = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.selectedProductStatus = 'failed';
        state.selectedProductError = action.error.message;
      })
      // Reducers for CRUD operations
      .addCase(createProduct.fulfilled, (state, action) => {
        const newProductDetail = action.payload;
        // Transform the detailed DTO into a list DTO
        const newProductList = {
          ...newProductDetail,
          mainImageBase64: newProductDetail.images?.[0]?.content || null,
        };
        
        state.products.push(newProductList);
        state.sellerProducts.push(newProductList);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProductDetail = action.payload;
        // Transform the detailed DTO into a list DTO
        const updatedProductList = {
          ...updatedProductDetail,
          mainImageBase64: updatedProductDetail.images?.[0]?.content || null,
        };

        // Update public list
        const publicIndex = state.products.findIndex(p => p.id === updatedProductList.id);
        if (publicIndex !== -1) {
          state.products[publicIndex] = updatedProductList;
        }
        // Update seller list
        const sellerIndex = state.sellerProducts.findIndex(p => p.id === updatedProductList.id);
        if (sellerIndex !== -1) {
          state.sellerProducts[sellerIndex] = updatedProductList;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const productId = action.payload;
        // Remove from public list
        state.products = state.products.filter(p => p.id !== productId);
        // Remove from seller list
        state.sellerProducts = state.sellerProducts.filter(p => p.id !== productId);
      });
  },
});

export const { clearSelectedProduct, setSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
