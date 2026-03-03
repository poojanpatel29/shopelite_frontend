import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import Badge from '../common/Badge'
import Price from '../common/Price'

export default function ProductCard({ product }) {
  const { addItem, toggleWishlist, isInWishlist, isInCart } = useCart()
  const inWishlist = isInWishlist(product.id)
  const inCart     = isInCart(product.id)

  const discountedPrice = product.discount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : null

  return (
    <div className="group relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:shadow-zinc-200/60 dark:hover:shadow-zinc-950/60 hover:-translate-y-0.5 transition-all duration-300">

      {/* Image container */}
      <div className="relative overflow-hidden bg-zinc-50 dark:bg-zinc-800 aspect-[4/3]">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.discount > 0 && (
            <Badge variant="danger" className="shadow-sm">−{product.discount}%</Badge>
          )}
          {product.isNew && (
            <Badge variant="primary" className="shadow-sm">New</Badge>
          )}
          {product.stock === 0 && (
            <Badge variant="default" className="shadow-sm">Sold Out</Badge>
          )}
          {product.stock > 0 && product.stock < 10 && (
            <Badge variant="warning" className="shadow-sm">Only {product.stock} left</Badge>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`
            absolute top-3 right-3
            w-8 h-8 rounded-full flex items-center justify-center
            shadow-md transition-all duration-200
            ${inWishlist
              ? 'bg-red-500 text-white scale-110'
              : 'bg-white/90 dark:bg-zinc-800/90 text-zinc-400 hover:text-red-500 hover:scale-110'}
          `}
        >
          <svg className="w-4 h-4" fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out p-3">
          <button
            disabled={product.stock === 0}
            onClick={() => addItem(product)}
            className={`
              w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg
              ${inCart
                ? 'bg-emerald-500 text-white'
                : product.stock === 0
                  ? 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
                  : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100'}
            `}
          >
            {inCart ? '✓ Added to Cart' : product.stock === 0 ? 'Out of Stock' : 'Quick Add'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-primary-500 uppercase tracking-widest mb-1">
              {product.category}
            </p>
            <Link to={`/products/${product.id}`}>
              <h3 className="font-semibold text-zinc-900 dark:text-white text-sm leading-snug hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>
          </div>
        </div>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className={`w-3 h-3 ${star <= Math.round(product.rating) ? 'text-amber-400' : 'text-zinc-200 dark:text-zinc-700'}`}
                  fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-zinc-400 dark:text-zinc-500">
              {product.rating.toFixed(1)} {product.reviews > 0 && `(${product.reviews})`}
            </span>
          </div>
        )}

        {/* Price row */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-zinc-900 dark:text-white">
              ₹{Number(discountedPrice ?? product.price).toLocaleString('en-IN')}
            </span>
            {discountedPrice && (
              <span className="text-sm text-zinc-400 line-through">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <button
            disabled={product.stock === 0}
            onClick={() => addItem(product)}
            className={`
              w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 font-bold
              ${inCart
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                : product.stock === 0
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-300 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md shadow-primary-600/20'}
            `}
          >
            {inCart
              ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            }
          </button>
        </div>
      </div>
    </div>
  )
}