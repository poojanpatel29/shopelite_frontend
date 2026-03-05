import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  wishlist: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    addToWishlist: (state, action) => {
      const exists = state.wishlist.find((i) => i.id === action.payload.id);
      if (!exists) state.wishlist.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((i) => i.id !== action.payload);
    },
    moveToCart: (state, action) => {
      const item = state.wishlist.find((i) => i.id === action.payload);
      if (item) {
        const existing = state.items.find((i) => i.id === item.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          state.items.push({ ...item, quantity: 1 });
        }
        state.wishlist = state.wishlist.filter((i) => i.id !== action.payload);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  addToWishlist,
  removeFromWishlist,
  moveToCart,
} = cartSlice.actions;
export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectWishlistItems = (state) => state.cart.wishlist;
export const selectCartCount = (state) => state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, i) => {
    const price = i.discount ? i.price * (1 - i.discount / 100) : i.price;
    return sum + price * i.quantity;
  }, 0);
export const selectIsInWishlist = (id) => (state) => state.cart.wishlist.some((i) => i.id === id);
export const selectIsInCart = (id) => (state) => state.cart.items.some((i) => i.id === id);
