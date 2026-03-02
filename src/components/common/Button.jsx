import { forwardRef } from 'react'

const variants = {
  primary:   'bg-primary-600 hover:bg-primary-700 text-white',
  secondary: 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200',
  danger:    'bg-red-500 hover:bg-red-600 text-white',
  outline:   'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
  ghost:     'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
  accent:    'bg-accent hover:bg-accent-hover text-white',
}

const sizes = {
  sm:   'px-3 py-1.5 text-sm',
  md:   'px-4 py-2',
  lg:   'px-6 py-3 text-lg',
  icon: 'p-2',
}

const Button = forwardRef(({ variant = 'primary', size = 'md', className = '', loading = false, disabled, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      )}
      {children}
    </button>
  )
})

Button.displayName = 'Button'
export default Button