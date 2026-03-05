import { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ordersApi, productsApi } from '../../services/realApi';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function Analytics() {
  const [stats, setStats] = useState({ revenue: 0, avgOrder: 0, products: 0 });
  const [catData, setCatData] = useState([0, 0, 0, 0, 0, 0]);
  const [orderStatus, setOrderStatus] = useState({
    delivered: 0,
    shipped: 0,
    processing: 0,
    pending: 0,
    cancelled: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([ordersApi.getAll(), productsApi.getAll({ per_page: 100 })])
      .then(([orders, productsData]) => {
        // Revenue stats
        const revenue = orders.reduce((s, o) => s + (o.total || 0), 0);
        const avgOrder = orders.length ? Math.round(revenue / orders.length) : 0;

        setStats({
          revenue,
          avgOrder,
          products: productsData.total || productsData.items?.length || 0,
        });

        // Order status counts
        const statusCount = { delivered: 0, shipped: 0, processing: 0, pending: 0, cancelled: 0 };
        orders.forEach((o) => {
          if (statusCount[o.status] !== undefined) statusCount[o.status]++;
        });
        setOrderStatus(statusCount);

        // Category distribution from products
        const cats = {
          electronics: 0,
          clothing: 0,
          books: 0,
          'home-garden': 0,
          sports: 0,
          beauty: 0,
        };
        productsData.items?.forEach((p) => {
          if (cats[p.category] !== undefined) cats[p.category]++;
        });
        setCatData(Object.values(cats));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categoryChartData = {
    labels: ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports', 'Beauty'],
    datasets: [
      {
        label: 'Products',
        data: catData,
        backgroundColor: ['#0ea5e9', '#6366f1', '#f97316', '#10b981', '#f59e0b', '#ec4899'],
        borderRadius: 8,
      },
    ],
  };

  const donutData = {
    labels: ['Delivered', 'Shipped', 'Processing', 'Pending', 'Cancelled'],
    datasets: [
      {
        data: [
          orderStatus.delivered,
          orderStatus.shipped,
          orderStatus.processing,
          orderStatus.pending,
          orderStatus.cancelled,
        ],
        backgroundColor: ['#10b981', '#0ea5e9', '#f97316', '#f59e0b', '#ef4444'],
      },
    ],
  };

  const barOpts = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#9ca3af' } },
      y: { grid: { color: 'rgba(156,163,175,0.1)' }, ticks: { color: '#9ca3af' } },
    },
  };

  return (
    <div className="space-y-6">
      <h1 className="page-title">Analytics</h1>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ['Total Revenue', loading ? '...' : `₹${stats.revenue.toLocaleString('en-IN')}`],
          ['Avg Order Value', loading ? '...' : `₹${stats.avgOrder.toLocaleString('en-IN')}`],
          ['Total Products', loading ? '...' : stats.products],
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
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-primary-600" />
            </div>
          ) : (
            <Bar data={categoryChartData} options={barOpts} />
          )}
        </div>
        <div className="card p-6">
          <h2 className="section-title mb-4">Order Status Distribution</h2>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-primary-600" />
            </div>
          ) : (
            <Doughnut
              data={donutData}
              options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
