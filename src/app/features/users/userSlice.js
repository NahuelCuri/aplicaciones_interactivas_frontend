import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../../services/userService';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await userService.getUsers();
  return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, data }, { dispatch }) => {
  const response = await userService.updateUser(id, data);
  dispatch(fetchUsers()); 
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId, { dispatch }) => {
  await userService.deleteUser(userId);
  dispatch(fetchUsers()); 
  return userId;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
