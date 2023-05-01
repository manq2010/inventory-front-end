/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const LOGIN = 'inventory/registration/SIGNUP';

// BASE_URL
const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
//   user: {
//     first_name: 'John',
//     last_name: 'Doe',
//   },
  isLoading: false,
  success: false,
  error: '',
  message: '',
};

// Register user
export const register = createAsyncThunk(LOGIN, async (username, thunkAPI) => {
  const API_URL = `${BASE_URL}/signup`;
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

export const registrationSlice = createSlice({
//   name: 'user',
  name: 'registration',
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.user = null;
    // },
    reset: (state) => ({
      ...state,
      isLoading: false,
      success: false,
      error: '',
      message: '',
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => ({
      ...state,
      isLoading: true,
      error: '',
    }));

    builder.addCase(register.fulfilled, (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      message: action.payload.data.message,
    }));

    builder.addCase(register.rejected, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }));
  },
});

// export const { logout } = registrationSlice.actions;
export const { reset } = registrationSlice.actions;

export const registrationReducer = registrationSlice.reducer;
