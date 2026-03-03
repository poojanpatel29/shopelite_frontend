import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllProducts } from '../../redux/slices/productsSlice'
import { productsApi } from '../../services/realApi'
import { useCart } from '../../hooks/useCart'
import ProductImageGallery from '../../components/product/ProductImageGallery'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import ProductCard from '../../components/product/ProductCard'

export default function ProductDetail() {
  const { id } = useParams()
  const allProducts = useSelector(selectAllProducts)
  const [product, setProduct]   = useState(null)
  const [loading, setLoading]   = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const { addItem, toggleWishlist, isInWishlist, isInCart } = useCart()

  useEffect(() => {
    setLoading(true)
    productsApi.getById(id)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-2 border-zinc-200 border-t-primary-600" />
    </div>
  )

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">
      <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6">😕</div>
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Product not found</h2>
      <Link to="/products" className="btn-primary">Browse Products</Link>
    </div>
  )

  const related    = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const finalPrice = product.discount ? (product.price * (1 - product.discount / 100)).toFixed(2) : product.price
  const inWish     = isInWishlist(product.id)
  const inCart     = isInCart(product.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-8 font-medium">
        {[['/', 'Home'], ['/products', 'Products'], [`/products?category=${product.category}`, product.category]].map(([to, label]) => (
          <span key={to} className="flex items-center gap-2">
            <Link to={to} className="hover:text-primary-600 capitalize transition-colors">{label}</Link>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
          </span>
        ))}
        <span className="text-zinc-700 dark:text-zinc-300 truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <ProductImageGallery images={product.images} name={product.name} />

        {/* Info */}
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {product.discount > 0 && <Badge variant="danger">−{product.discount}%</Badge>}
            {product.isNew      && <Badge variant="primary">New</Badge>}
            {product.stock === 0 && <Badge variant="default">Sold Out</Badge>}
            {product.stock > 0 && product.stock < 10 && <Badge variant="warning">Only {product.stock} left</Badge>}
          </div>

          <div>
            <p className="text-[11px] font-bold text-primary-500 uppercase tracking-widest mb-1">{product.category}</p>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white leading-tight">{product.name}</h1>
          </div>

          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? 'text-amber-400' : 'text-zinc-200 dark:text-zinc-700'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{product.rating}</span>
              <span className="text-sm text-zinc-400">({product.reviews} reviews)</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3 py-2">
            <span className="text-4xl font-bold text-zinc-900 dark:text-white">
              ₹{Number(finalPrice).toLocaleString('en-IN')}
            </span>
            {product.discount > 0 && (
              <span className="text-xl text-zinc-400 line-through">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </span>
            )}
            {product.discount > 0 && (
              <span className="text-sm font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-lg">
                Save ₹{(product.price - finalPrice).toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">{product.description}</p>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Qty</span>
            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white dark:hover:bg-zinc-700 transition-colors font-bold text-zinc-600 dark:text-zinc-400"
              >−</button>
              <span className="w-10 text-center font-bold text-zinc-900 dark:text-white text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white dark:hover:bg-zinc-700 transition-colors font-bold text-zinc-600 dark:text-zinc-400"
              >+</button>
            </div>
            <span className="text-xs text-zinc-400">{product.stock} in stock</span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <Button
              size="lg"
              className="flex-1"
              disabled={product.stock === 0}
              onClick={() => addItem(product, quantity)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {inCart ? '✓ Added to Cart' : 'Add to Cart'}
            </Button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-200
                ${inWish
                  ? 'border-red-300 bg-red-50 dark:bg-red-950/30 text-red-500'
                  : 'border-zinc-200 dark:border-zinc-700 hover:border-red-300 text-zinc-400 hover:text-red-500'}`}
            >
              <svg className="w-5 h-5" fill={inWish ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
            {[['🚀', '2–5 day delivery'], ['🛡️', 'Secure payment'], ['🔄', '30-day returns']].map(([icon, label]) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full">
                {icon} {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card mb-16 overflow-hidden">
        <div className="flex border-b border-zinc-100 dark:border-zinc-800">
          {['description', 'specifications', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-semibold capitalize transition-all duration-150 ${
                activeTab === tab
                  ? 'text-primary-600 border-b-2 border-primary-600 -mb-px'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-6">
          {activeTab === 'description' && (
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm max-w-2xl">{product.description}</p>
          )}
          {activeTab === 'specifications' && product.specifications && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 max-w-2xl">
              {Object.entries(product.specifications).map(([k, v], i) => (
                <div key={k} className={`flex gap-4 py-3 ${i % 2 === 0 ? 'border-b border-zinc-100 dark:border-zinc-800' : 'border-b border-zinc-100 dark:border-zinc-800'}`}>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider w-28 shrink-0 pt-0.5">{k}</span>
                  <span className="text-sm font-medium text-zinc-900 dark:text-white">{v}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="max-w-2xl">
              <div className="flex items-center gap-8 pb-6 mb-6 border-b border-zinc-100 dark:border-zinc-800">
                <div className="text-center">
                  <p className="text-6xl font-bold text-zinc-900 dark:text-white">{product.rating}</p>
                  <div className="flex justify-center mt-1">
                    {[1,2,3,4,5].map((s) => (
                      <svg key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? 'text-amber-400' : 'text-zinc-200 dark:text-zinc-700'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">{product.reviews} reviews</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5,4,3,2,1].map((star) => {
                    const pct = star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1
                    return (
                      <div key={star} className="flex items-center gap-2 text-xs">
                        <span className="w-3 text-zinc-500 font-medium">{star}</span>
                        <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="w-7 text-zinc-400">{pct}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <p className="text-sm text-zinc-400">Detailed reviews coming soon.</p>
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