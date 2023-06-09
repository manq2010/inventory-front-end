import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { itemsPaths } from './itemsTypes';
import { itemsApi } from './itemsApi';

const SHOW_ITEMS = 'inventory/item/SHOW';
const SHOW_ITEM = 'inventory/item/SHOW/:id';
const ADD_ITEM = 'inventory/item/ADD';
const DELETE_ITEM = 'inventory/item/DELETE';

// Base Url
const BASE_URL = process.env.REACT_APP_BASE_URL;

// Get all items
export const getItems = createAsyncThunk(SHOW_ITEMS, async (thunkAPI) => {
  try {
    const data = await itemsApi.getItems(`${itemsPaths.items}`);
    return data.results;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.error);
  }
});

export const getItem = createAsyncThunk(SHOW_ITEM, async (id, thunkAPI) => {
  try {
    const data = await itemsApi.getItem(`${itemsPaths.items}/${id}`);
    console.log(data.results);
    return data.results;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.error);
  }
});

// Add item
// export const addItem = createAsyncThunk(ADD_ITEM, async (item, thunkAPI) => {
//   // console.log('addItem', item);
//   try {
//     const data = await itemsApi.addItem(`${itemsPaths.items}`, item);
//     return data.results;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response.data.error);
//   }
// });

export const addItem = createAsyncThunk(ADD_ITEM, async (item, thunkAPI) => {
  const API_URL = `${BASE_URL}/api/v1/items`;
  // const token = localStorage.getItem('token');
  const requestOptions = {
    method: 'POST',
    headers: {
      // Authorization: `Bearer ${token}`,
    },
  };
  try {
    return await axios.post(API_URL, item, requestOptions);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.error);
  }
});

// Delete an item
export const deleteItem = createAsyncThunk(DELETE_ITEM, async (id, thunkAPI) => {
  try {
    await itemsApi.deleteItem(`${itemsPaths.items}/${id}`, id);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.error);
  }
});

const initialState = {
  isLoading: false,
  success: false,
  error: null,
  items: [],
  item: null,
  response: null,
  totalItems: 0,
  ordering: null,
  filters: null,
  searchQuery: null,
};

// Item Slice
const itemSlice = createSlice({
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
    // Get Items
    builder.addCase(getItems.pending, (state) => ({
      ...state,
      isLoading: true,
      error: '',
    }));

    builder.addCase(getItems.fulfilled, (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      items: action.payload.data.data.items,
    }));

    builder.addCase(getItems.rejected, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }));

    // Get Item
    builder.addCase(getItem.pending, (state) => ({
      ...state,
      isLoading: true,
      error: '',
    }));

    builder.addCase(getItem.fulfilled, (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      item: action.payload.data.data.items,
    }));

    builder.addCase(getItem.rejected, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }));

    // Add Item

    builder.addCase(addItem.pending, (state) => ({
      ...state,
      isLoading: true,
      error: '',
    }));

    builder.addCase(addItem.fulfilled, (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      response: action.payload.data.data,
    }));

    builder.addCase(addItem.rejected, (state, action) => ({
      ...state,
      isLoading: false,
      errors: action.payload.data.errors,
    }));

    // Delete Item

    builder.addCase(deleteItem.pending, (state) => ({
      ...state,
      isLoading: true,
      error: '',
    }));

    builder.addCase(deleteItem.fulfilled, (state, action) => {
      const id = action.payload;

      return {
        ...state,
        isLoading: false,
        success: true,
        id,
        list: state.list.filter((item) => item.id !== id),
      };
    });

    builder.addCase(deleteItem.rejected, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload.data.error,
    }));
  },
});

// export default itemSlice.reducer;
export const { resetErrors } = itemSlice.actions;
export const itemReducer = itemSlice.reducer;
