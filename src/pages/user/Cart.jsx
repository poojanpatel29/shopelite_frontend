import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../../redux/slices/cartSlice'
import CartItem from '../../components/cart/CartItem'
import CartSummary from '../../components/cart/CartSummary'
import Button from '../../components/common/Button'

export default function Cart() {
  const items = useSelector(selectCartItems)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="page-title mb-8">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-8xl mb-6">🛒</div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-8">Add items to start shopping</p>
          <Link to="/products" className="btn-primary px-8 py-3">Browse Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 card p-6">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="section-title">Items ({items.reduce((s, i) => s + i.quantity, 0)})</h2>
            </div>
            {items.map((item) => <CartItem key={item.id} item={item} />)}
          </div>
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  )
}