import { useSelector } from 'react-redux'
import { selectWishlistItems } from '../../redux/slices/cartSlice'
import { useCart } from '../../hooks/useCart'
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import ProductCard from '../../components/product/ProductCard'

export default function Wishlist() {
  const wishlist = useSelector(selectWishlistItems)
  const { moveToBag, toggleWishlist } = useCart()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="page-title mb-8">My Wishlist ({wishlist.length})</h1>
      {wishlist.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-8xl mb-6">💔</div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-8">Save items you love here</p>
          <Link to="/products" className="btn-primary px-8 py-3">Discover Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}