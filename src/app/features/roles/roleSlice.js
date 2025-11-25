import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import roleService from '../../../services/roleService';

export const fetchRoles = createAsyncThunk('roles/fetchRoles', async () => {
  const response = await roleService.getAllRoles();
  return response.data;
});

const rolesSlice = createSlice({
  name: 'roles',
  initialState: {
    roles: [],
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default rolesSlice.reducer;
