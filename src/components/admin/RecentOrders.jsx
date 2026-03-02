import { Link } from 'react-router-dom'
import { MOCK_ORDERS } from '../../mock/orders'
import Badge from '../common/Badge'
import Price from '../common/Price'

const statusMap = {
  delivered: 'success',
  shipped:   'primary',
  processing:'warning',
  cancelled: 'danger',
  pending:   'default',
}

export default function RecentOrders() {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title">Recent Orders</h2>
        <Link to="/admin/orders" className="text-sm text-primary-600 hover:text-primary-700 font-medium">View All →</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-gray-100 dark:border-gray-800">
              {['Order ID', 'Items', 'Total', 'Status', 'Date'].map((h) => (
                <th key={h} className="pb-3 pr-4 font-medium text-gray-500 dark:text-gray-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.map((order) => (
              <tr key={order.id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                <td className="py-3 pr-4 font-medium text-primary-600">{order.id}</td>
                <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">{order.items.length} items</td>
                <td className="py-3 pr-4"><Price amount={order.total} className="font-semibold text-gray-900 dark:text-white" /></td>
                <td className="py-3 pr-4"><Badge variant={statusMap[order.status] || 'default'} className="capitalize">{order.status}</Badge></td>
                <td className="py-3 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}