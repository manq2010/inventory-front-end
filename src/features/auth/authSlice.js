/* eslint-disable no-param-reassign */
// import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import IUser from './authTypes';

const LOGIN = 'inventory/authentication/LOGIN';

// Initialize token from local storage
const token = localStorage.getItem('token') || null;

// Base URL
const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
//   user: {
//     first_name: 'John',
//     last_name: 'Doe',
//   },
  token,
  isLoading: false,
  success: false,
  error: '',
};

// NB: change username to name

// Method getToken
export const getToken = createAsyncThunk(LOGIN, async (username, thunkAPI) => {
  const API_URL = `${BASE_URL}/login`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    return await axios.post(API_URL, JSON.stringify({ username }), requestOptions);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.error);
  }
});

// Authentication Slice
export const authSlice = createSlice({
//   name: 'user',
  name: 'authentication',
  initialState,
  reducers: {
    logout: (state) => {
    //   state.user = null;
      localStorage.removeItem('token');
      return {
        ...state,
        isLoading: false,
        success: false,
        error: '',
        token: '',
        username: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getToken.pending, (state) => ({
      ...state,
      isLoading: true,
      error: '',
    }));

    builder.addCase(getToken.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.data.token);
      return {
        ...state,
        isLoading: false,
        success: true,
        token: action.payload.data.token,
        username: action.payload.data.username,
      };
    });

    builder.addCase(getToken.rejected, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }));
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
