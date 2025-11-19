import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from '../../../services/categoryService';

// Thunks for all categories
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await categoryService.getAllCategories();
  return response.data;
});

export const createCategory = createAsyncThunk('categories/createCategory', async (categoryData, { dispatch }) => {
  const response = await categoryService.createCategory(categoryData);
  dispatch(fetchCategories()); // Refetch categories to get the latest list
  return response.data;
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ id, data }, { dispatch }) => {
  const response = await categoryService.updateCategory(id, data);
  dispatch(fetchCategories()); // Refetch categories to get the latest list
  return response.data;
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (categoryId, { dispatch }) => {
  await categoryService.deleteCategory(categoryId);
  dispatch(fetchCategories()); // Refetch categories to get the latest list
  return categoryId;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
