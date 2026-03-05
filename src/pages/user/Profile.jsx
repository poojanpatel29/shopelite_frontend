import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';
import { ordersApi, addressApi } from '../../services/realApi';
import { useCart } from '../../hooks/useCart';

export default function Profile() {
  const user = useSelector(selectUser);
  const { wishlist } = useCart();
  const [orderCount, setOrderCount] = useState(0);
  const [addressCount, setAddressCount] = useState(0);

  useEffect(() => {
    ordersApi
      .getMyOrders()
      .then((orders) => setOrderCount(orders.length))
      .catch(() => setOrderCount(0));

    addressApi
      .getAll()
      .then((addrs) => setAddressCount(addrs.length))
      .catch(() => setAddressCount(0));
  }, []);

  const stats = [
    { label: 'Total Orders', value: orderCount },
    { label: 'Wishlist Items', value: wishlist.length },
    { label: 'Addresses', value: addressCount },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="card p-8 mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative">
          <img
            src={user?.avatar || `https://i.pravatar.cc/150?u=${user?.email}`}
            alt={user?.name}
            className="w-24 h-24 rounded-2xl object-cover shadow-lg"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
            {user?.name}
          </h1>
          <p className="text-gray-500">{user?.email}</p>
          {user?.phone && <p className="text-sm text-gray-400 mt-1">{user.phone}</p>}
          <p className="text-sm text-gray-400 mt-1">
            Member since{' '}
            {user?.created_at
              ? new Date(user.created_at).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                })
              : '—'}
          </p>
        </div>
        <Link to="/profile/edit" className="btn-secondary">
          Edit Profile
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="card p-6 text-center">
            <p className="text-3xl font-display font-bold text-gray-900 dark:text-white">
              {s.value}
            </p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          ['/orders', '📦', 'Order History', 'View and track your orders'],
          ['/wishlist', '❤️', 'Wishlist', 'Items saved for later'],
          ['/profile/addresses', '📍', 'Addresses', 'Manage delivery addresses'],
          ['/notifications', '🔔', 'Notifications', 'View all notifications'],
          ['/settings', '⚙️', 'Settings', 'Account preferences'],
        ].map(([to, icon, title, desc]) => (
          <Link
            key={to}
            to={to}
            className="card p-5 flex items-center gap-4 hover:shadow-lg transition-all duration-200 group"
          >
            <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center text-2xl">
              {icon}
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                {title}
              </p>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
            <svg
              className="w-5 h-5 text-gray-300 ml-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
