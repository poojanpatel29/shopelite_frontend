import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import Price from '../common/Price'

export default function CartItem({ item }) {
  const { removeItem, updateQty } = useCart()
  const price = item.discount ? item.price * (1 - item.discount / 100) : item.price

  return (
    <div className="flex gap-4 py-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <Link to={`/products/${item.id}`}>
        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl bg-gray-100 flex-shrink-0" />
      </Link>
      <div className="flex-1 min-w-0">
        <Link to={`/products/${item.id}`}>
          <h4 className="font-medium text-gray-900 dark:text-white hover:text-primary-600 transition-colors truncate">{item.name}</h4>
        </Link>
        <p className="text-sm text-gray-500 capitalize">{item.category}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium">−</button>
            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
            <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium">+</button>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-900 dark:text-white">
              <Price amount={price * item.quantity} />
            </span>
            <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}