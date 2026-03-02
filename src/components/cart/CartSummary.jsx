import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectCartTotal, selectCartItems } from '../../redux/slices/cartSlice'
import { selectAuth } from '../../redux/slices/authSlice'
import Button from '../common/Button'
import Price from '../common/Price'

export default function CartSummary() {
  const navigate = useNavigate()
  const total = useSelector(selectCartTotal)
  const items = useSelector(selectCartItems)
  const { isAuthenticated } = useSelector(selectAuth)
  const shipping = total > 500 ? 0 : 99
  const tax = total * 0.18
  const grand = total + shipping + tax

  if (items.length === 0) return null

  return (
    <div className="card p-6 sticky top-24">
      <h2 className="section-title mb-6">Order Summary</h2>
      <div className="flex justify-between">
        <span className="text-gray-500">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
        <Price amount={total} className="font-medium" />
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500">Shipping</span>
        {shipping === 0
          ? <span className="text-green-500 font-medium">FREE</span>
          : <Price amount={shipping} className="font-medium" />
        }
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500">GST (18%)</span>
        <Price amount={tax} className="font-medium" />
      </div>
      {total < 500 && (
        <p className="text-xs text-primary-600 bg-primary-50 dark:bg-primary-900/20 px-3 py-2 rounded-lg">
          Add ₹{(500 - total).toLocaleString('en-IN')} more for free shipping!
        </p>
      )}
      <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex justify-between font-bold text-base">
        <span>Total</span>
        <Price amount={grand} />
      </div>
      <Button className="w-full mt-6" onClick={() => navigate(isAuthenticated ? '/checkout' : '/auth/login')}>
        {isAuthenticated ? 'Proceed to Checkout' : 'Sign In to Checkout'}
      </Button>
      <Button variant="outline" className="w-full mt-2" onClick={() => navigate('/products')}>
        Continue Shopping
      </Button>
    </div>
  )
}