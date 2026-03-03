import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ordersApi } from '../../services/realApi'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Price from '../../components/common/Price'

const statusMap = {
  delivered:  'success',
  shipped:    'primary',
  processing: 'warning',
  cancelled:  'danger',
  pending:    'default',
}

export default function OrderSummary() {
  const { id }              = useParams()
  const [order,   setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(false)

  useEffect(() => {
    ordersApi.getById(id)
      .then(setOrder)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="flex justify-center items-center py-24">
      <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-primary-600" />
    </div>
  )

  if (error || !order) return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Order not found</h2>
      <Link to="/orders" className="btn-primary">View Orders</Link>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Success Banner */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Order Confirmed!</h1>
        <p className="text-gray-500 mt-2">
          Thank you! Your order <strong>{order.order_number}</strong> has been placed.
        </p>
      </div>

      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Order Details</h2>
          <Badge variant={statusMap[order.status] || 'default'} className="capitalize">
            {order.status}
          </Badge>
        </div>

        {/* Items */}
        <div className="space-y-3">
          {order.items?.map((item, i) => (
            <div key={i} className="flex gap-3 py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</p>
                <p className="text-gray-500 text-xs">×{item.quantity}</p>
              </div>
              <Price amount={item.price * item.quantity} className="font-semibold" />
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <Price amount={order.subtotal} />
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Shipping</span>
            {order.shipping === 0
              ? <span className="text-green-500 font-medium">FREE</span>
              : <Price amount={order.shipping} />}
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">GST (18%)</span>
            <Price amount={order.tax} />
          </div>
          <div className="flex justify-between font-bold text-base border-t border-gray-100 dark:border-gray-800 pt-2">
            <span>Total</span>
            <Price amount={order.total} />
          </div>
        </div>

        {/* Delivery Address */}
        {order.address && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Delivering to</p>
            <p className="text-sm text-gray-500">{order.address.full_name}</p>
            <p className="text-sm text-gray-500">{order.address.street}, {order.address.city}</p>
            <p className="text-sm text-gray-500">{order.address.state} — {order.address.zip}</p>
          </div>
        )}

        {/* Payment */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Payment Method</p>
          <p className="text-sm text-gray-500 capitalize">{order.payment_method}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Link to={`/orders/${id}/tracking`} className="flex-1">
          <Button variant="outline" className="w-full">Track Order</Button>
        </Link>
        <Link to="/products" className="flex-1">
          <Button className="w-full">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  )
}