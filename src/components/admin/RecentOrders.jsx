import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ordersApi } from '../../services/realApi';
import Badge from '../common/Badge';
import Price from '../common/Price';

const statusMap = {
  delivered: 'success',
  shipped: 'primary',
  processing: 'warning',
  cancelled: 'danger',
  pending: 'default',
};

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersApi
      .getAll()
      .then((data) => setOrders(data.slice(0, 5)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title">Recent Orders</h2>
        <Link
          to="/admin/orders"
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          View All →
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-primary-600" />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-400 py-8">No orders yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-100 dark:border-gray-800">
                {['Order', 'Items', 'Total', 'Status', 'Date'].map((h) => (
                  <th key={h} className="pb-3 pr-4 font-medium text-gray-500 dark:text-gray-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="py-3 pr-4 font-medium text-primary-600 font-mono text-xs">
                    {order.order_number}
                  </td>
                  <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">
                    {order.items?.length} items
                  </td>
                  <td className="py-3 pr-4">
                    <Price
                      amount={order.total}
                      className="font-semibold text-gray-900 dark:text-white"
                    />
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant={statusMap[order.status] || 'default'} className="capitalize">
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-3 text-gray-500">
                    {order.created_at
                      ? new Date(order.created_at).toLocaleDateString('en-IN')
                      : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
