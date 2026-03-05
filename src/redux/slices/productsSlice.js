import { createSlice } from '@reduxjs/toolkit';

// No more import of PRODUCTS mock here
const initialState = {
  items: [],
  loading: false,
  error: null,
  selected: null,
  total: 0,
  page: 1,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    addProduct: (state, action) => {
      state.items.unshift(action.payload);
    },
    updateProduct: (state, action) => {
      const idx = state.items.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
  },
});

export const {
  setProducts,
  setTotal,
  setLoading,
  setError,
  setSelected,
  addProduct,
  updateProduct,
  deleteProduct,
} = productsSlice.actions;
export default productsSlice.reducer;

export const selectAllProducts = (state) => state.products.items;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsTotal = (state) => state.products.total;
export const selectProductById = (id) => (state) =>
  state.products.items.find((p) => p.id === Number(id));
export const selectFeaturedProducts = (state) => state.products.items.filter((p) => p.is_featured);
