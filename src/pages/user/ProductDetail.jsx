import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllProducts } from '../../redux/slices/productsSlice'
import { productsApi } from '../../services/realApi'
import { useCart } from '../../hooks/useCart'
import ProductImageGallery from '../../components/product/ProductImageGallery'
import StarRating from '../../components/common/StarRating'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Price from '../../components/common/Price'
import ProductCard from '../../components/product/ProductCard'

export default function ProductDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const allProducts = useSelector(selectAllProducts)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const { addItem, toggleWishlist, isInWishlist, isInCart } = useCart()

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const data = await productsApi.getById(id)
        setProduct(data)
      } catch {
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-200 border-t-primary-600" />
    </div>
  )

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <div className="text-6xl mb-4">😕</div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product not found</h2>
      <Link to="/products" className="btn-primary">Browse Products</Link>
    </div>
  )

  const related = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const finalPrice = product.discount ? (product.price * (1 - product.discount / 100)).toFixed(2) : product.price

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-primary-600">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-primary-600">Products</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-primary-600 capitalize">{product.category}</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white truncate">{product.name}</span>
      </nav>

      {/* Main */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <ProductImageGallery images={product.images} name={product.name} />

        {/* Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-2 flex-wrap">
            {product.discount > 0 && <Badge variant="danger">-{product.discount}%</Badge>}
            {product.isNew && <Badge variant="primary">New</Badge>}
            {product.stock < 10 && product.stock > 0 && <Badge variant="warning">Only {product.stock} left</Badge>}
          </div>
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-wide capitalize">{product.category}</p>
            <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-1">{product.name}</h1>
          </div>
          <StarRating rating={product.rating} reviewCount={product.reviews} size="md" />
          <div className="flex items-baseline gap-3">
            <Price amount={finalPrice} className="text-4xl font-bold text-gray-900 dark:text-white" />
            {product.discount > 0 && <Price amount={product.price} strike className="text-xl" />}
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{product.description}</p>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</label>
            <div className="flex items-center gap-2">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium">−</button>
              <span className="w-10 text-center font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium">+</button>
            </div>
            <span className="text-sm text-gray-400">{product.stock} available</span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1"
              disabled={product.stock === 0}
              onClick={() => addItem(product, quantity)}
            >
              {isInCart(product.id) ? '✓ Added to Cart' : 'Add to Cart'}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => toggleWishlist(product)}
              className={isInWishlist(product.id) ? 'border-red-300 text-red-500' : ''}
            >
              <svg className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            {[['🚀', 'Fast Delivery', '2-5 days'], ['🛡️', 'Secure Payment', '100% Safe'], ['🔄', 'Easy Returns', '30-day policy']].map(([icon, t, sub]) => (
              <div key={t} className="text-center">
                <div className="text-2xl mb-1">{icon}</div>
                <p className="text-xs font-medium text-gray-900 dark:text-white">{t}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card mb-16">
        <div className="flex border-b border-gray-100 dark:border-gray-800">
          {['description', 'specifications', 'reviews'].map((tab) => (
            <button key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-6">
          {activeTab === 'description' && (
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{product.description} This product features advanced technology and premium materials. It has been tested rigorously to ensure the highest quality standards. Whether for personal or professional use, it will exceed your expectations.</p>
          )}
          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(product.specifications).map(([k, v]) => (
                <div key={k} className="flex gap-3 py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                  <span className="text-sm text-gray-500 w-24 flex-shrink-0">{k}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{v}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center gap-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="text-center">
                  <p className="text-5xl font-bold text-gray-900 dark:text-white">{product.rating}</p>
                  <StarRating rating={product.rating} size="md" />
                  <p className="text-sm text-gray-500 mt-1">{product.reviews} reviews</p>
                </div>
              </div>
              {[5, 4, 3, 2, 1].map((star) => {
                const pct = star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1
                return (
                  <div key={star} className="flex items-center gap-3 text-sm">
                    <span className="w-4 text-right text-gray-600 dark:text-gray-400">{star}</span>
                    <svg className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-8 text-gray-500">{pct}%</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 className="page-title mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}