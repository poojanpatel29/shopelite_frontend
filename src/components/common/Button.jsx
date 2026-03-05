import { forwardRef } from 'react';

const variants = {
  primary:
    'bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white shadow-lg shadow-primary-600/20 hover:shadow-primary-600/30',
  secondary:
    'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700',
  outline:
    'border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300',
  ghost: 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400',
  danger: 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white shadow-lg shadow-red-500/20',
  accent: 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20',
  dark: 'bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900',
};

const sizes = {
  xs: 'px-2.5 py-1.5 text-xs rounded-lg',
  sm: 'px-3.5 py-2 text-sm rounded-xl',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
  xl: 'px-8 py-4 text-base rounded-2xl',
  icon: 'p-2.5 rounded-xl',
};

const Button = forwardRef(
  (
    {
      variant = 'primary',
      size = 'md',
      className = '',
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
        inline-flex items-center justify-center gap-2
        font-semibold transition-all duration-200
        disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
        ${variants[variant]} ${sizes[size]} ${className}
      `}
        {...props}
      >
        {loading ? (
          <svg className="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-20"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
