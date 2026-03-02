export default function Price({ amount, className = '', strike = false }) {
  const formatted = '₹' + Number(Math.round(amount)).toLocaleString('en-IN')
  return (
    <span className={`${strike ? 'line-through text-gray-400' : ''} ${className}`}>
      {formatted}
    </span>
  )
}