import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  addToWishlist,
  removeFromWishlist,
  moveToCart,
} from '../redux/slices/cartSlice';
import {
  selectCartItems,
  selectWishlistItems,
  selectCartCount,
  selectCartTotal,
} from '../redux/slices/cartSlice';
import { addToast } from '../redux/slices/notificationsSlice';

export function useCart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const wishlist = useSelector(selectWishlistItems);
  const cartCount = useSelector(selectCartCount);
  const cartTotal = useSelector(selectCartTotal);

  const addItem = (product, quantity = 1) => {
    dispatch(addToCart({ ...product, quantity }));
    dispatch(addToast({ type: 'success', message: `${product.name} added to cart!` }));
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
    dispatch(addToast({ type: 'info', message: 'Item removed from cart' }));
  };

  const updateQty = (id, quantity) => dispatch(updateQuantity({ id, quantity }));
  const clear = () => dispatch(clearCart());

  const toggleWishlist = (product) => {
    const inWishlist = wishlist.some((i) => i.id === product.id);
    if (inWishlist) {
      dispatch(removeFromWishlist(product.id));
      dispatch(addToast({ type: 'info', message: 'Removed from wishlist' }));
    } else {
      dispatch(addToWishlist(product));
      dispatch(addToast({ type: 'success', message: 'Added to wishlist!' }));
    }
  };

  const moveToBag = (id) => {
    dispatch(moveToCart(id));
    dispatch(addToast({ type: 'success', message: 'Moved to cart!' }));
  };

  return {
    items,
    wishlist,
    cartCount,
    cartTotal,
    addItem,
    removeItem,
    updateQty,
    clear,
    toggleWishlist,
    moveToBag,
    isInCart: (id) => items.some((i) => i.id === id),
    isInWishlist: (id) => wishlist.some((i) => i.id === id),
  };
}
