import { useEffect, useState } from 'react'
import { ordersApi, productsApi, usersApi } from '../../services/realApi'
import StatsCard from '../../components/admin/StatsCard'
import SalesChart from '../../components/admin/SalesChart'
import RecentOrders from '../../components/admin/RecentOrders'

export default function Dashboard() {
  const [stats, setStats]     = useState({ revenue: 0, orders: 0, products: 0, users: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      ordersApi.getAll(),
      productsApi.getAll({ per_page: 1 }),
      usersApi.getAll(),
    ]).then(([orders, productsData, users]) => {
      setStats({
        revenue:  orders.reduce((s, o) => s + (o.total || 0), 0),
        orders:   orders.length,
        products: productsData.total,
        users:    users.length,
      })
    }).catch(console.error).finally(() => setLoading(false))
  }, [])

  const CARDS = [
    { title: 'Total Revenue',  value: loading ? '…' : `₹${stats.revenue.toLocaleString('en-IN')}`, change: '+12.5', icon: 'revenue',  color: 'violet'  },
    { title: 'Total Orders',   value: loading ? '…' : stats.orders,   change: '+8.2', icon: 'orders',   color: 'blue'    },
    { title: 'Products',       value: loading ? '…' : stats.products, change: '+3.1', icon: 'products', color: 'amber'   },
    { title: 'Customers',      value: loading ? '…' : stats.users,    change: '+5.7', icon: 'users',    color: 'emerald' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Dashboard</h1>
        <p className="text-zinc-500 text-sm mt-1">Welcome back! Here's what's happening today.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {CARDS.map((c) => <StatsCard key={c.title} {...c} />)}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2"><SalesChart /></div>
        <div><RecentOrders /></div>
      </div>
    </div>
  )
}