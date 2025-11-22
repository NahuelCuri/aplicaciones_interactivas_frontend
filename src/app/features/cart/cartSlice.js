import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from '../../../services/orderService';

const initialState = {
  cart: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async Thunks
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const response = await orderService.getCart();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const addItemToCart = createAsyncThunk('cart/addItemToCart', async ({ productId, quantity }, { dispatch, rejectWithValue }) => {
  try {
    await orderService.addItemToCart(productId, quantity);
    // After adding, fetch the updated cart
    const updatedCart = await dispatch(fetchCart());
    return updatedCart.payload;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart', async (productId, { dispatch, rejectWithValue }) => {
  try {
    await orderService.removeItemFromCart(productId);
    const updatedCart = await dispatch(fetchCart());
    return updatedCart.payload;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateCartItemQuantity = createAsyncThunk('cart/updateCartItemQuantity', async ({ productId, quantity }, { dispatch, rejectWithValue }) => {
  try {
    await orderService.updateCartItemQuantity(productId, quantity);
    const updatedCart = await dispatch(fetchCart());
    return updatedCart.payload;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

import { invalidateOrders } from '../orders/orderSlice';

export const checkoutCart = createAsyncThunk('cart/checkout', async (_, { dispatch, rejectWithValue }) => {
    try {
        const order = await orderService.checkout();
        await dispatch(fetchCart());
        dispatch(invalidateOrders());
        return order.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // The other thunks just trigger a fetch, so we only need to handle fetchCart's lifecycle
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(checkoutCart.fulfilled, (state) => {
        // The fetchCart call in the thunk will update the state, but we can clear it here for an immediate UI response if needed
        state.cart = null;
      });
  },
});

export const { clearCart } = cartSlice.actions;

// Selectors
export const selectCart = (state) => state.cart.cart;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartError = (state) => state.cart.error;

export default cartSlice.reducer;
