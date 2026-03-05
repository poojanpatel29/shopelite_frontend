import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ordersApi } from '../../services/realApi';

export default function OrderTracking() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersApi.getById(id).then(setOrder).catch(console.error);
    // .finally(() => setLoading(false));
  }, [id]);

  if (!order)
    return (
      <div className="text-center py-16">
        <Link to="/orders" className="btn-primary">
          Back to Orders
        </Link>
      </div>
    );

  const lastDone = [...order.tracking].reverse().findIndex((t) => t.done);
  const currentStep = order.tracking.length - lastDone - 1;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="page-title mb-2">Order Tracking</h1>
      {/* <p className="text-gray-500 mb-8 font-mono text-sm">{order.id}</p> */}
      <div className="card p-8">
        <div className="relative">
          {order.tracking.map((step, i) => (
            <div key={i} className="flex gap-6 relative">
              {/* Line */}
              {i < order.tracking.length - 1 && (
                <div
                  className={`absolute left-[15px] top-8 w-0.5 h-16 ${step.done ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                />
              )}
              {/* Dot */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${step.done ? 'bg-primary-600' : i === currentStep + 1 ? 'bg-gray-200 dark:bg-gray-700 border-2 border-primary-300' : 'bg-gray-100 dark:bg-gray-800'}`}
              >
                {step.done ? (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <div
                    className={`w-2 h-2 rounded-full ${i === currentStep + 1 ? 'bg-primary-400' : 'bg-gray-400'}`}
                  />
                )}
              </div>
              {/* Content */}
              <div className="pb-8">
                <p
                  className={`font-medium ${step.done ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}
                >
                  {step.status}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">
                  {step.date ? new Date(step.date).toLocaleString() : 'Pending'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <Link to="/orders" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          ← Back to Orders
        </Link>
      </div>
    </div>
  );
}
