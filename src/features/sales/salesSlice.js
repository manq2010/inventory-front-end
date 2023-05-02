import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { salesPaths } from './salesType';
import { itemsApi } from './salesApi';

const SHOW_SALES = 'inventory/sale/SHOW';
const SHOW_SALE = 'inventory/sale/SHOW/:id';
const ADD_SALE = 'inventory/sale/ADD';
const DELETE_SALE = 'inventory/sale/DELETE';

// Base Url
const BASE_URL = process.env.REACT_APP_BASE_URL;

// Get all sales
export const getSales = createAsyncThunk(SHOW_SALES, async (thunkAPI) => {
  try {
    const data = await itemsApi.getSales(`${salesPaths.sales}`);
    return data.results;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.error);
  }
});

export const getSale = createAsyncThunk(SHOW_SALE, async (id, thunkAPI) => {
  try {
    const data = await itemsApi.getSale(`${salesPaths.sales}/${id}`);
    console.log(data.results);
    return data.results;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.error);
  }
});

// Add sale
// export const addSale = createAsyncThunk(ADD_ITEM, async (item, thunkAPI) => {
//   // console.log('addSale', item);
//   try {
//     const data = await itemsApi.addSale(`${itemsPaths.items}`, item);
//     return data.results;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response.data.error);
//   }
// });

export const addSale = createAsyncThunk(ADD_SALE, async (sale, thunkAPI) => {
  const API_URL = `${BASE_URL}/api/v1/sales`;
  // const token = localStorage.getSale('token');
  const requestOptions = {
    method: 'POST',
    headers: {
      // Authorization: `Bearer ${token}`,
    },
  };
  try {
    return await axios.post(API_URL, sale, requestOptions);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.error);
  }
});

// Delete a sale
export const deleteSale = createAsyncThunk(DELETE_SALE, async (id, thunkAPI) => {
  try {
    await itemsApi.deleteSale(`${salesPaths.sales}/${id}`, id);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.error);
  }
});

const initialState = {
  isLoading: false,
  success: false,
  error: null,
  sales: [],
  sale: null,
  response: null,
  totalSales: 0,
  ordering: null,
  filters: null,
  searchQuery: null,
};

// Sale Slice
const saleSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    resetErrors: (state) => ({
      ...state,
      error: '',
      isLoading: false,
      success: false,
      response: null,
    }),
  },
  extraReducers: (builder) => {
    // Get sales
    builder.addCase(getSales.pending, (state) => ({
      ...state,
      isLoading: true,
      error: '',
    }));

    builder.addCase(getSales.fulfilled, (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      sales: action.payload.data.data.sales,
    }));

    builder.addCase(getSales.rejected, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }));

    // Get sale
    builder.addCase(getSale.pending, (state) => ({
      ...state,
      isLoading: true,
      error: '',
    }));

    builder.addCase(getSale.fulfilled, (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      sale: action.payload.data.data.sales,
    }));

    builder.addCase(getSale.rejected, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }));

    // Add sale

    builder.addCase(addSale.pending, (state) => ({
      ...state,
      isLoading: true,
      error: '',
    }));

    builder.addCase(addSale.fulfilled, (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      response: action.payload.data.data,
    }));

    builder.addCase(addSale.rejected, (state, action) => ({
      ...state,
      isLoading: false,
      errors: action.payload.data.errors,
    }));

    // Delete Sale

    builder.addCase(deleteSale.pending, (state) => ({
      ...state,
      isLoading: true,
      error: '',
    }));

    builder.addCase(deleteSale.fulfilled, (state, action) => {
      const id = action.payload;

      return {
        ...state,
        isLoading: false,
        success: true,
        id,
        list: state.list.filter((item) => item.id !== id),
      };
    });

    builder.addCase(deleteSale.rejected, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload.data.error,
    }));
  },
});

// export default saleSlice.reducer;
export const { resetErrors } = saleSlice.actions;
export const saleReducer = saleSlice.reducer;
