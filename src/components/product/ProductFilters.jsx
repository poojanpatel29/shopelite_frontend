import { useDispatch, useSelector } from 'react-redux'
import { setCategory, setPriceRange, setRating, setSortBy, setInStock, resetFilters, selectFilters } from '../../redux/slices/filtersSlice'
import { CATEGORIES } from '../../mock/categories'
import Price from '../../components/common/Price'
import Button from '../common/Button'

export default function ProductFilters({ onClose }) {
  const dispatch = useDispatch()
  const filters  = useSelector(selectFilters)

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Category</h3>
        <div className="space-y-1">
          <button
            onClick={() => dispatch(setCategory('all'))}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all ${filters.category === 'all' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button key={cat.id}
              onClick={() => dispatch(setCategory(cat.slug))}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-sm flex items-center justify-between transition-all ${filters.category === cat.slug ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              <span>{cat.icon} {cat.name}</span>
              <span className="text-xs text-gray-400">{cat.productCount}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Price Range</h3>
        <div className="space-y-2">
          {[[0, 500, 'Under ₹500'], [500, 2000, '₹500 – ₹2000'], [2000, 5000, '₹2000 – ₹5000'], [5000, 500000, 'Over ₹5000']].map(([min, max, label]) => (
            <button key={label}
              onClick={() => dispatch(setPriceRange({ min, max }))}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all ${filters.priceMin === min && filters.priceMax === max ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Minimum Rating</h3>
        <div className="space-y-1">
          {[0, 3, 4, 4.5].map((r) => (
            <button key={r}
              onClick={() => dispatch(setRating(r))}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all ${filters.rating === r ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              {r === 0 ? 'Any Rating' : `${r}+ ⭐`}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Sort By</h3>
        <select
          value={filters.sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="w-full input-field text-sm"
        >
          {[['featured', 'Featured'], ['price-asc', 'Price: Low to High'], ['price-desc', 'Price: High to Low'], ['rating', 'Top Rated'], ['newest', 'Newest']].map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
      </div>

      {/* In Stock */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">In Stock Only</span>
        <button
          onClick={() => dispatch(setInStock(!filters.inStock))}
          className={`relative w-10 h-5 rounded-full transition-colors ${filters.inStock ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${filters.inStock ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
      </div>

      <Button variant="outline" className="w-full" onClick={() => { dispatch(resetFilters()); onClose?.() }}>
        Reset Filters
      </Button>
    </div>
  )
}