import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from '../../../services/orderService';

const initialState = {
  orders: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchOrdersByUser = createAsyncThunk('orders/fetchByUser', async (userId, { rejectWithValue }) => {
  try {
    const response = await orderService.getOrdersByUser(userId);
    return response.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message || 'Failed to fetch orders';
    return rejectWithValue(message);
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    invalidateOrders: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersByUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchOrdersByUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { invalidateOrders } = orderSlice.actions;

// Selectors
export const selectUserOrders = (state) => state.orders.orders;
export const selectOrdersStatus = (state) => state.orders.status;
export const selectOrdersError = (state) => state.orders.error;

export default orderSlice.reducer;
