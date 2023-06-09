/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { set } from 'lodash';
// features
import createApiQueryFromState from '../utils/api';
import { dogsApi, DogsPathsEnum } from './dogsApi';

export const getBreeds = createAsyncThunk('offers/getBreeds',
  async (query, { rejectWithValue }) => {
    try {
      const res = await dogsApi.getBreeds(`${DogsPathsEnum.breeds}`);
      return res;
    } catch (error) {
      rejectWithValue('Error');
    }
  });

const initialState = {
  breedsTable: {
    data: null,
    totalItems: 0,
    page: 0,
    ordering: null,
    itemsPerPage: 10,
    apiQuery: '?limit=20',
    filters: null,
    searchQuery: null,
    isLoading: false,
    error: null,
  },
};

const dogsSlice = createSlice({
  name: 'dogs',
  initialState,
  reducers: {
    updateState(state, action) {
      const { path, value } = action.payload;
      // https://dustinpfister.github.io/2018/12/04/lodash_set/
      set(state, path, value);
    },
    updateTableState(state, action) {
      const { table, prop, value } = action.payload;
      // https://dustinpfister.github.io/2018/12/04/lodash_set/
      set(state, `${table}.${prop}`, value);

      if (['itemsPerPage'].includes(prop)) state[table].page = 1;
      state[table].apiQuery = createApiQueryFromState(state[table]);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBreeds.fulfilled, (state, action) => {
      state.breedsTable.isLoading = false;
      if (action.payload) {
        const { results, totalItems } = action.payload;
        state.breedsTable.data = results;
        state.breedsTable.totalItems = totalItems;
        if (state.breedsTable.page === 0 && totalItems) state.breedsTable.page = 1;
      }
    });
    builder.addCase(getBreeds.pending, (state) => {
      state.breedsTable.isLoading = true;
      if (state.breedsTable.error) state.breedsTable.error = null;
    });
    builder.addCase(getBreeds.rejected, (state, action) => {
      state.breedsTable.isLoading = false;
      state.breedsTable.error = action.payload;
    });
  },
});

const { updateState, updateTableState } = dogsSlice.actions;

const dogsReducer = dogsSlice.reducer;

export { updateState, updateTableState, dogsReducer };
