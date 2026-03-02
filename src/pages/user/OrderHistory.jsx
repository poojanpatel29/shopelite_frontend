import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/slices/authSlice'
import { MOCK_ORDERS } from '../../mock/orders'
import { useEffect, useState } from 'react'
import { ordersApi } from '../../services/realApi'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Price from '../../components/common/Price'

const statusMap = { delivered: 'success', shipped: 'primary', processing: 'warning', cancelled: 'danger', pending: 'default' }

export default function OrderHistory() {
  const user = useSelector(selectUser)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ordersApi.getMyOrders()
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="page-title mb-8">Order History</h1>
      {orders.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-8xl mb-6">📦</div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-8">Start shopping to see your orders here</p>
          <Link to="/products" className="btn-primary px-8 py-3">Browse Products</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-mono text-sm text-primary-600 font-semibold">{order.id}</p>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <Badge variant={statusMap[order.status] || 'default'} className="capitalize">{order.status}</Badge>
              </div>
              <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
                {order.items.map((item, i) => (
                  <img key={i} src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" title={item.name} />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{order.items.length} item(s)</p>
                  <p className="font-bold text-gray-900 dark:text-white text-lg"><Price amount={order.total} /></p>
                </div>
                <div className="flex gap-2">
                  <Link to={`/orders/${order.id}/tracking`}>
                    <Button variant="outline" size="sm">Track</Button>
                  </Link>
                  <Link to={`/order-summary/${order.id}`}>
                    <Button size="sm">Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}