import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';
import ToastContainer from '../common/Toast';
import { useState } from 'react';

const NAV_ITEMS = [
  {
    to: '/admin/dashboard',
    label: 'Dashboard',
    d: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
  },
  {
    to: '/admin/products',
    label: 'Products',
    d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  },
  {
    to: '/admin/orders',
    label: 'Orders',
    d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  },
  {
    to: '/admin/users',
    label: 'Users',
    d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  },
  {
    to: '/admin/categories',
    label: 'Categories',
    d: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z',
  },
  {
    to: '/admin/analytics',
    label: 'Analytics',
    d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      {/* ── Sidebar ── */}
      <aside
        className={`relative flex flex-col bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-800 transition-all duration-300 ease-in-out shrink-0 ${collapsed ? 'w-[60px]' : 'w-[220px]'}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 h-14 px-4 border-b border-zinc-100 dark:border-zinc-800 shrink-0 overflow-hidden">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md shadow-primary-600/30 shrink-0">
            <span className="text-white font-bold text-xs">S</span>
          </div>
          {!collapsed && (
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-bold text-zinc-900 dark:text-white text-sm tracking-tight whitespace-nowrap">
                Shop<span className="text-primary-600">Elite</span>
              </span>
              <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-md whitespace-nowrap">
                Admin
              </span>
            </div>
          )}
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto overflow-x-hidden">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-sm font-medium whitespace-nowrap overflow-hidden
                ${
                  isActive
                    ? 'bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300'
                    : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
                }`
              }
            >
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={item.d} />
              </svg>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="border-t border-zinc-100 dark:border-zinc-800 p-3 shrink-0">
          <div
            className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2.5'} overflow-hidden`}
          >
            <img
              src={user?.avatar || `https://i.pravatar.cc/100?u=${user?.email}`}
              alt={user?.name}
              className="w-7 h-7 rounded-lg object-cover shrink-0 ring-2 ring-zinc-100 dark:ring-zinc-700"
            />
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                  {user?.name}
                </p>
                <p className="text-[10px] text-zinc-400 truncate capitalize">{user?.role}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="h-14 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between px-5 shrink-0">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <svg
              className="w-4 h-4 text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {isDark ? (
                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-zinc-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-700" />
            <button
              onClick={() => navigate('/')}
              className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors px-2 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              View Store
            </button>
            <button
              onClick={logout}
              className="text-xs font-medium text-red-500 hover:text-red-600 transition-colors px-2 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-zinc-50 dark:bg-zinc-950">
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}
