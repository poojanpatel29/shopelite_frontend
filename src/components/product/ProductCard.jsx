import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import Button from '../common/Button'
import Badge from '../common/Badge'
import StarRating from '../common/StarRating'
import Price from '../common/Price'

export default function ProductCard({ product }) {
  const { addItem, toggleWishlist, isInWishlist, isInCart } = useCart()
  const inWishlist = isInWishlist(product.id)
  const inCart = isInCart(product.id)

  const discountedPrice = product.discount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : null

  return (
    <div className="card group overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img src={product.image} alt={product.name} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
        </Link>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.discount > 0 && <Badge variant="danger">-{product.discount}%</Badge>}
          {product.isNew && <Badge variant="primary">New</Badge>}
          {product.stock < 10 && product.stock > 0 && <Badge variant="warning">Low Stock</Badge>}
          {product.stock === 0 && <Badge variant="default">Out of Stock</Badge>}
        </div>
        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:scale-110 transition-transform"
        >
          <svg className={`w-4 h-4 ${inWishlist ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} stroke="currentColor" viewBox="0 0 24 24" fill="none">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{product.category}</p>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-1 mb-1">{product.name}</h3>
        </Link>
        <StarRating rating={product.rating} reviewCount={product.reviews} />
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <Price amount={discountedPrice ?? product.price} className="text-lg font-bold text-gray-900 dark:text-white" />
            {discountedPrice && <Price amount={product.price} strike />}
          </div>
          <Button
            size="sm"
            variant={inCart ? 'secondary' : 'primary'}
            disabled={product.stock === 0}
            onClick={() => addItem(product)}
          >
            {inCart ? '✓ Added' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  )
}