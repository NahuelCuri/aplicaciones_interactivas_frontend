import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../../services/authService';
import userService from '../../../services/userService';
import { jwtDecode } from 'jwt-decode';

// Function to get user data from token
const getUserFromToken = (token) => {
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      // Assuming the token payload has user details directly
      // Adjust if the payload structure is different
      const user = {
        id: decodedToken.userId,
        email: decodedToken.sub,
        roles: decodedToken.roles || [],
      };
      return user;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
  return null;
};


const token = localStorage.getItem('token');
const user = token ? getUserFromToken(token) : null;

const initialState = {
  user: user,
  token: token,
  isAuthenticated: !!user,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await authService.login(email, password);
    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    const user = getUserFromToken(access_token);
    return { user, token: access_token };
  } catch (err) {
    const message = err.response?.data?.message || err.message || 'Failed to log in';
    return rejectWithValue(message);
  }
});

export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await authService.register(userData.username, userData.email, userData.password, userData.role);
    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    const user = getUserFromToken(access_token);
    return { user, token: access_token };
  } catch (err) {
    const message = err.response?.data?.message || err.message || 'Failed to register';
    return rejectWithValue(message);
  }
});

export const upgradeToSeller = createAsyncThunk('auth/upgradeToSeller', async (_, { rejectWithValue }) => {
  try {
    const response = await userService.becomeSeller();
    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    const user = getUserFromToken(access_token);
    return { user, token: access_token };
  } catch (err) {
    const message = err.response?.data?.message || err.message || 'Failed to become seller';
    return rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Upgrade to Seller
      .addCase(upgradeToSeller.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(upgradeToSeller.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(upgradeToSeller.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectAuthIsLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
export const selectIsAdmin = (state) => state.auth.user?.roles?.includes('ADMIN');
export const selectIsSeller = (state) => state.auth.user?.roles?.includes('SELLER');
export const selectIsBuyer = (state) => state.auth.user?.roles?.includes('BUYER');


export default authSlice.reducer;
