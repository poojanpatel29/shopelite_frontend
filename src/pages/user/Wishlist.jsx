import { useSelector } from 'react-redux'
import { selectWishlistItems } from '../../redux/slices/cartSlice'
import { Link } from 'react-router-dom'
import ProductCard from '../../components/product/ProductCard'

export default function Wishlist() {
  const wishlist = useSelector(selectWishlistItems)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="page-title">My Wishlist</h1>
        {wishlist.length > 0 && (
          <p className="text-zinc-500 text-sm mt-1">{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-3xl flex items-center justify-center text-5xl mb-6">💝</div>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Your wishlist is empty</h3>
          <p className="text-zinc-500 mb-8 max-w-xs">Save items you love by tapping the heart icon on any product.</p>
          <Link to="/products" className="btn-primary px-8 py-3 rounded-xl text-base">
            Discover Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}