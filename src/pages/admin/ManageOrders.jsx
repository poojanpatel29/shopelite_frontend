import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ordersApi } from '../../services/realApi';
import { addToast } from '../../redux/slices/notificationsSlice';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

const STEPS = [
  { key: 'order_placed', label: 'Order Placed', icon: '📋' },
  { key: 'processing', label: 'Processing', icon: '⚙️' },
  { key: 'shipped', label: 'Shipped', icon: '🚚' },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: '📦' },
  { key: 'delivered', label: 'Delivered', icon: '✅' },
];

const STATUS_BADGE = {
  delivered: 'success',
  shipped: 'primary',
  out_for_delivery: 'warning',
  processing: 'warning',
  order_placed: 'default',
};

const FILTERS = ['all', 'order_placed', 'processing', 'shipped', 'out_for_delivery', 'delivered'];

function normalizeStatus(status) {
  return (status || '').toLowerCase().replace(/ /g, '_');
}

function statusToIdx(status) {
  const normalized = normalizeStatus(status);
  if (normalized === 'pending') return 0;
  return STEPS.findIndex((s) => s.key === normalized);
}

function badgeVariant(status) {
  const normalized = normalizeStatus(status);
  if (normalized === 'pending') return 'default';
  return STATUS_BADGE[normalized] || 'default';
}

export default function ManageOrders() {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [advancing, setAdvancing] = useState(null);

  useEffect(() => {
    ordersApi
      .getAll()
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === 'all' ? orders : orders.filter((o) => normalizeStatus(o.status) === filter);

  const filterCount = (f) =>
    f === 'all' ? orders.length : orders.filter((o) => normalizeStatus(o.status) === f).length;

  const handleAdvance = async (order) => {
    const currentIdx = statusToIdx(order.status);
    const nextStep = STEPS[currentIdx + 1];
    if (!nextStep) return;

    setAdvancing(order.id);
    try {
      const updated = await ordersApi.updateStatus(order.id, nextStep.key);
      setOrders((prev) => prev.map((o) => (o.id === order.id ? updated : o)));
      dispatch(addToast({ type: 'success', message: `Order moved to "${nextStep.label}"` }));
    } catch (err) {
      dispatch(
        addToast({
          type: 'error',
          message: err?.response?.data?.detail || 'Failed to update order',
        })
      );
    } finally {
      setAdvancing(null);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-zinc-200 border-t-primary-600" />
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="page-title">Orders</h1>
        <p className="text-zinc-500 text-sm mt-1">{orders.length} total orders</p>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all duration-150 ${
              filter === f
                ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {f.replace(/_/g, ' ')}
            <span className={`ml-1.5 text-xs ${filter === f ? 'opacity-70' : 'text-zinc-400'}`}>
              ({filterCount(f)})
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/50">
                {['Order', 'Items', 'Total', 'Payment', 'Status', 'Progress', 'Action'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3.5 text-xs font-bold text-zinc-400 uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-zinc-400">
                    No orders found
                  </td>
                </tr>
              ) : (
                filtered.map((order) => {
                  const currentIdx = statusToIdx(order.status);
                  const nextStep =
                    currentIdx >= 0 && currentIdx < STEPS.length - 1 ? STEPS[currentIdx + 1] : null;
                  const isFinal = currentIdx === STEPS.length - 1;
                  const isAdvancing = advancing === order.id;

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30 transition-colors"
                    >
                      {/* Order number + date */}
                      <td className="px-5 py-4">
                        <p className="font-mono text-xs font-bold text-primary-600 dark:text-primary-400 tracking-wider">
                          {order.order_number}
                        </p>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          {new Date(order.created_at).toLocaleDateString('en-IN')}
                        </p>
                      </td>

                      {/* Items */}
                      <td className="px-5 py-4 text-zinc-500">
                        {order.items?.length} item{order.items?.length !== 1 ? 's' : ''}
                      </td>

                      {/* Total */}
                      <td className="px-5 py-4 font-bold text-zinc-900 dark:text-white">
                        ₹{Number(order.total).toLocaleString('en-IN')}
                      </td>

                      {/* Payment */}
                      <td className="px-5 py-4 text-zinc-500 capitalize">
                        {order.payment_method || '—'}
                      </td>

                      {/* Status badge */}
                      <td className="px-5 py-4">
                        <Badge
                          variant={badgeVariant(order.status)}
                          dot
                          className="capitalize whitespace-nowrap"
                        >
                          {(order.status || '').replace(/_/g, ' ')}
                        </Badge>
                      </td>

                      {/* Mini progress bar */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-0.5">
                          {STEPS.map((step, i) => (
                            <div
                              key={step.key}
                              title={step.label}
                              className={`h-1.5 w-4 rounded-full transition-all duration-300 ${
                                i <= currentIdx ? 'bg-primary-500' : 'bg-zinc-200 dark:bg-zinc-700'
                              }`}
                            />
                          ))}
                          <span className="text-xs text-zinc-400 ml-1.5 whitespace-nowrap">
                            {currentIdx + 1}/{STEPS.length}
                          </span>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4">
                        {isFinal ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-lg">
                            ✓ Complete
                          </span>
                        ) : nextStep ? (
                          <Button
                            size="sm"
                            onClick={() => handleAdvance(order)}
                            loading={isAdvancing}
                            disabled={isAdvancing}
                            className="whitespace-nowrap"
                          >
                            {nextStep.icon} {nextStep.label}
                          </Button>
                        ) : null}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
