import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../../redux/slices/cartSlice'
import CartItem from '../../components/cart/CartItem'
import CartSummary from '../../components/cart/CartSummary'

export default function Cart() {
  const items = useSelector(selectCartItems)
  const totalQty = items.reduce((s, i) => s + i.quantity, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="page-title">Shopping Cart</h1>
        {items.length > 0 && (
          <p className="text-zinc-500 text-sm mt-1">{totalQty} item{totalQty !== 1 ? 's' : ''} in your cart</p>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-3xl flex items-center justify-center text-5xl mb-6">🛒</div>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Your cart is empty</h3>
          <p className="text-zinc-500 mb-8 max-w-xs">Looks like you haven't added anything yet. Start browsing to find something you love.</p>
          <Link to="/products" className="btn-primary px-8 py-3 rounded-xl text-base">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-5 pb-5 border-b border-zinc-100 dark:border-zinc-800">
                <h2 className="section-title">Items ({totalQty})</h2>
                <Link to="/products" className="text-sm text-primary-600 hover:text-primary-700 font-semibold transition-colors">
                  + Add more
                </Link>
              </div>
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {items.map((item) => <CartItem key={item.id} item={item} />)}
              </div>
            </div>
          </div>
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  )
}