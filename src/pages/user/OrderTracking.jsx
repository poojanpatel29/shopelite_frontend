import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ordersApi } from '../../services/realApi';

const STEP_ICONS = {
  'Order Placed': '📋',
  Processing: '⚙️',
  Shipped: '🚚',
  'Out for Delivery': '📦',
  Delivered: '✅',
};

export default function OrderTracking() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersApi
      .getById(id)
      .then(setOrder)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-zinc-200 border-t-primary-600" />
      </div>
    );

  if (!order)
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Order not found</h2>
        <Link to="/orders" className="btn-primary">
          Back to Orders
        </Link>
      </div>
    );

  const tracking = order.tracking || [];

  const lastDoneIdx = tracking.reduce((acc, step, i) => (step.done ? i : acc), -1);

  // Progress percentage
  const progressPct =
    tracking.length > 0 ? Math.round(((lastDoneIdx + 1) / tracking.length) * 100) : 0;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back link */}
      <Link
        to="/orders"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-primary-600 transition-colors font-medium mb-6"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Orders
      </Link>

      <div className="mb-6">
        <h1 className="page-title">Order Tracking</h1>
        <p className="font-mono text-xs font-bold text-primary-600 dark:text-primary-400 mt-1 tracking-wider">
          {order.order_number}
        </p>
      </div>

      <div className="card p-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Progress
            </span>
            <span className="text-xs font-bold text-primary-600">{progressPct}%</span>
          </div>
          <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {tracking.map((step, i) => {
            const isDone = step.done;
            const isCurrent = i === lastDoneIdx + 1;
            const isPending = !isDone && !isCurrent;

            return (
              <div key={i} className="flex gap-5 relative">
                {/* Connector line between dots */}
                {i < tracking.length - 1 && (
                  <div
                    className={`absolute left-[17px] top-9 w-0.5 h-14 rounded-full transition-colors duration-300 ${
                      isDone ? 'bg-primary-500' : 'bg-zinc-100 dark:bg-zinc-800'
                    }`}
                  />
                )}

                {/* Step dot */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${
                    isDone
                      ? 'bg-primary-600 shadow-lg shadow-primary-600/30'
                      : isCurrent
                        ? 'bg-white dark:bg-zinc-800 border-2 border-primary-400 shadow-md'
                        : 'bg-zinc-100 dark:bg-zinc-800'
                  }`}
                >
                  {isDone ? (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span className={`text-sm ${isPending ? 'grayscale opacity-40' : ''}`}>
                      {STEP_ICONS[step.status] || '○'}
                    </span>
                  )}
                </div>

                {/* Step content */}
                <div className="pb-10 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p
                      className={`font-semibold text-sm ${
                        isDone
                          ? 'text-zinc-900 dark:text-white'
                          : isCurrent
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-zinc-400'
                      }`}
                    >
                      {step.status}
                    </p>
                    {isCurrent && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary-600 bg-primary-50 dark:bg-primary-950/50 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                        In Progress
                      </span>
                    )}
                    {isDone && i === lastDoneIdx && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                        ✓ Latest
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {step.date
                      ? new Date(step.date).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'Pending'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
