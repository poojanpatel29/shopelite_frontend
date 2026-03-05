import { forwardRef } from 'react';

const Input = forwardRef(
  ({ label, error, hint, icon, iconRight, className = '', size = 'md', ...props }, ref) => {
    const sizeClass =
      size === 'sm' ? 'py-2 text-sm' : size === 'lg' ? 'py-4 text-base' : 'py-3 text-sm';

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
            w-full ${icon ? 'pl-10' : 'pl-4'} ${iconRight ? 'pr-10' : 'pr-4'} ${sizeClass}
            rounded-xl
            border ${
              error
                ? 'border-red-400 dark:border-red-500 focus:ring-red-500/30 focus:border-red-500'
                : 'border-zinc-200 dark:border-zinc-700 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500/20'
            }
            bg-zinc-50 dark:bg-zinc-800/60
            text-zinc-900 dark:text-zinc-100
            placeholder:text-zinc-400 dark:placeholder:text-zinc-500
            focus:outline-none focus:ring-2
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
            {...props}
          />
          {iconRight && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500">
              {iconRight}
            </div>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
        {hint && !error && <p className="mt-1.5 text-xs text-zinc-400">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
