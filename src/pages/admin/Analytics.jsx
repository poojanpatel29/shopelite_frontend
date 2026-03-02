import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { MOCK_ORDERS } from '../../mock/orders'
import { PRODUCTS } from '../../mock/products'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export default function Analytics() {
  const categoryData = {
    labels: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty'],
    datasets: [{
      label: 'Products',
      data: [7, 3, 4, 2, 2, 2],
      backgroundColor: ['#0ea5e9', '#6366f1', '#f97316', '#10b981', '#f59e0b', '#ec4899'],
      borderRadius: 8,
    }],
  }

  const donutData = {
    labels: ['Delivered', 'Shipped', 'Processing'],
    datasets: [{
      data: [1, 1, 0],
      backgroundColor: ['#10b981', '#0ea5e9', '#f97316'],
    }],
  }

  const opts = { responsive: true, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { color: '#9ca3af' } }, y: { grid: { color: 'rgba(156,163,175,0.1)' }, ticks: { color: '#9ca3af' } } } }

  return (
    <div className="space-y-6">
      <h1 className="page-title">Analytics</h1>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ['Total Revenue', `₹${MOCK_ORDERS.reduce((s, o) => s + o.total, 0).toLocaleString('en-IN')}`],
          ['Avg Order Value', `₹${Math.round(MOCK_ORDERS.reduce((s, o) => s + o.total, 0) / (MOCK_ORDERS.length || 1)).toLocaleString('en-IN')}`],
          ['Total Products', PRODUCTS.length],
          ['Conversion Rate', '3.4%'],
        ].map(([label, val]) => (
          <div key={label} className="card p-6 text-center">
            <p className="text-2xl font-display font-bold text-gray-900 dark:text-white">{val}</p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="section-title mb-4">Products by Category</h2>
          <Bar data={categoryData} options={opts} />
        </div>
        <div className="card p-6">
          <h2 className="section-title mb-4">Order Status</h2>
          <Doughnut data={donutData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
        </div>
      </div>
    </div>
  )
}