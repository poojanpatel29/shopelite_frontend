import StatsCard from '../../components/admin/StatsCard'
import SalesChart from '../../components/admin/SalesChart'
import RecentOrders from '../../components/admin/RecentOrders'
import { useEffect, useState } from 'react'
import { analyticsApi, ordersApi, productsApi, usersApi } from '../../services/realApi'
import { MOCK_ORDERS } from '../../mock/orders'
import { PRODUCTS } from '../../mock/products'
import { MOCK_USERS } from '../../mock/users'
import { inr } from '../../utils/formatters'

export default function Dashboard() {
  const revenue = MOCK_ORDERS.reduce((s, o) => s + o.total, 0)
  const [stats, setStats] = useState({ revenue: 0, orders: 0, products: 0, users: 0 })
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      ordersApi.getAll(),
      productsApi.getAll({ per_page: 1 }),
      usersApi.getAll(),
    ]).then(([ordersData, productsData, usersData]) => {
      setOrders(ordersData.slice(0, 5))
      setStats({
        revenue: ordersData.reduce((s, o) => s + o.total, 0),
        orders: ordersData.length,
        products: productsData.total,
        users: usersData.length,
      })
    }).finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard title="Total Revenue" value={`₹${revenue.toLocaleString('en-IN')}`} change="+12.5" icon="💰" color="primary" />
        <StatsCard title="Total Orders" value={MOCK_ORDERS.length} change="+8.2" icon="📦" color="green" />
        <StatsCard title="Total Products" value={PRODUCTS.length} change="+3.1" icon="🛍️" color="orange" />
        <StatsCard title="Total Users" value={MOCK_USERS.length} change="+5.7" icon="👤" color="purple" />
      </div>

      {/* Chart */}
      <SalesChart />

      {/* Orders */}
      <RecentOrders />
    </div>
  )
}