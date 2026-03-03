import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const months    = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const salesData = [12400, 15200, 18900, 14300, 22100, 28000, 24500, 31200, 27800, 35600, 29400, 42000]

export default function SalesChart() {
  const data = {
    labels: months,
    datasets: [
      {
        label: 'Revenue (₹)',
        data: salesData,
        borderColor: '#7c3aed',
        backgroundColor: 'rgba(124, 58, 237, 0.08)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: '#7c3aed',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(9,9,11,0.9)',
        titleColor: '#fff',
        bodyColor: '#a1a1aa',
        borderColor: 'rgba(124,58,237,0.3)',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (ctx) => ` ₹${ctx.raw.toLocaleString('en-IN')}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: '#71717a', font: { size: 11 } },
      },
      y: {
        grid: { color: 'rgba(113,113,122,0.1)', drawBorder: false },
        border: { display: false, dash: [4, 4] },
        ticks: {
          color: '#71717a',
          font: { size: 11 },
          callback: (v) => `₹${(v / 1000).toFixed(0)}k`,
        },
      },
    },
    interaction: { mode: 'index', intersect: false },
  }

  return (
    <div className="card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="section-title">Revenue Overview</h2>
          <p className="text-xs text-zinc-400 mt-0.5">Monthly revenue for 2024</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-lg">
          ↑ 12.5% vs last year
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  )
}