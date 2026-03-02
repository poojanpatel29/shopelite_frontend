export default function StatsCard({ title, value, change, icon, color = 'primary' }) {
  const colors = {
    primary: 'bg-primary-50 dark:bg-primary-900/20 text-primary-600',
    green:   'bg-green-50 dark:bg-green-900/20 text-green-600',
    orange:  'bg-orange-50 dark:bg-orange-900/20 text-orange-600',
    purple:  'bg-purple-50 dark:bg-purple-900/20 text-purple-600',
  }
  const isPositive = parseFloat(change) >= 0

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${colors[color]}`}>{icon}</div>
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${isPositive ? 'bg-green-50 dark:bg-green-900/20 text-green-600' : 'bg-red-50 dark:bg-red-900/20 text-red-500'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(parseFloat(change))}%
        </span>
      </div>
      <p className="text-2xl font-display font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{title}</p>
    </div>
  )
}