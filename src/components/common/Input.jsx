import { forwardRef, useId } from 'react'

const Input = forwardRef(({ label, error, hint, icon, rightElement, className = '', ...props }, ref) => {
  const id = useId()

  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>}
        <input
          ref={ref}
          id={id}
          className={`w-full px-4 py-2.5 rounded-lg border transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 ${error ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 dark:border-gray-700'} ${icon ? 'pl-10' : ''} ${rightElement ? 'pr-10' : ''} ${className}`}
          {...props}
        />
        {rightElement && <span className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</span>}
      </div>
      {error  && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {hint   && !error && <p className="mt-1 text-sm text-gray-500">{hint}</p>}
    </div>
  )
})

Input.displayName = 'Input'
export default Input