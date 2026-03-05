import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ordersApi } from '../../services/realApi';
import { addToast } from '../../redux/slices/notificationsSlice';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

const STATUSES = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const statusMap = {
  delivered: 'success',
  shipped: 'primary',
  processing: 'warning',
  cancelled: 'danger',
  pending: 'default',
};

export default function ManageOrders() {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    ordersApi
      .getAll()
      .then(setOrders)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updated = await ordersApi.updateStatus(orderId, newStatus);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
      dispatch(addToast({ type: 'success', message: `Order updated to ${newStatus}` }));
    } catch {
      dispatch(addToast({ type: 'error', message: 'Failed to update status' }));
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-primary-600" />
      </div>
    );

  return (
    <div className="space-y-6">
      <h1 className="page-title">Orders ({orders.length})</h1>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
              filter === s
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {s} {s !== 'all' && `(${orders.filter((o) => o.status === s).length})`}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                {['Order', 'Items', 'Total', 'Payment', 'Status', 'Date', 'Update'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-4 font-medium text-gray-500 dark:text-gray-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">
                    No orders found
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-primary-600 font-semibold text-xs">
                      {order.order_number}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{order.items?.length} items</td>
                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                      ₹{Number(order.total).toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 text-gray-500 capitalize">
                      {order.payment_method || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={statusMap[order.status] || 'default'} className="capitalize">
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(order.created_at).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 py-1 capitalize focus:outline-none focus:ring-1 focus:ring-primary-500"
                      >
                        {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
