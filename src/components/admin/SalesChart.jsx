import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const salesData = [12400, 15200, 18900, 14300, 22100, 28000, 24500, 31200, 27800, 35600, 29400, 42000]
const ordersData = [124, 152, 189, 143, 221, 280, 245, 312, 278, 356, 294, 420]

export default function SalesChart() {
  const data = {
    labels: months,
    datasets: [
      {
        label: 'Revenue ($)',
        data: salesData,
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#0ea5e9',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#9ca3af' } },
      y: { grid: { color: 'rgba(156,163,175,0.1)' }, ticks: { color: '#9ca3af', callback: (v) => `₹${(v/1000).toFixed(0)}k` } },
    },
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title">Revenue Overview</h2>
        <span className="text-sm text-gray-400">2024</span>
      </div>
      <Line data={data} options={options} />
    </div>
  )
}