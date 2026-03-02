const variants = {
  default:  'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  primary:  'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
  success:  'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  warning:  'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
  danger:   'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  accent:   'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
}

export default function Badge({ variant = 'default', children, className = '' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}