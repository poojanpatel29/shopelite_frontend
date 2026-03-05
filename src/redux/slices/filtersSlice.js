import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  category: 'all',
  priceMin: 0,
  priceMax: 200000,
  rating: 0,
  sortBy: 'featured',
  inStock: false,
  page: 1,
  perPage: 12,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
      state.page = 1;
    },
    setPriceRange: (state, action) => {
      state.priceMin = action.payload.min;
      state.priceMax = action.payload.max;
      state.page = 1;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
      state.page = 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setInStock: (state, action) => {
      state.inStock = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    resetFilters: () => {
      return { ...initialState };
    },
  },
});

export const {
  setSearch,
  setCategory,
  setPriceRange,
  setRating,
  setSortBy,
  setInStock,
  setPage,
  resetFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;

export const selectFilters = (state) => state.filters;
