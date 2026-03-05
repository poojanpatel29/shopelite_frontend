const variants = {
  default: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400',
  primary: 'bg-primary-100 dark:bg-primary-950/70 text-primary-700 dark:text-primary-300',
  success: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300',
  warning: 'bg-amber-100  dark:bg-amber-950/60  text-amber-700  dark:text-amber-300',
  danger: 'bg-red-100    dark:bg-red-950/60    text-red-700    dark:text-red-300',
  accent: 'bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300',
  indigo: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300',
  dark: 'bg-zinc-900   dark:bg-zinc-100       text-white      dark:text-zinc-900',
};

export default function Badge({ variant = 'default', children, className = '', dot = false }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide ${variants[variant]} ${className}`}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />}
      {children}
    </span>
  );
}
