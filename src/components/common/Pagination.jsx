import { usePagination } from '../../hooks/usePagination'
import Button from './Button'

export default function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }) {
  const { totalPages, pages, hasPrev, hasNext, startItem, endItem } = usePagination({ totalItems, itemsPerPage, currentPage })

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between mt-8">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing <span className="font-medium text-gray-900 dark:text-white">{startItem}–{endItem}</span> of{' '}
        <span className="font-medium text-gray-900 dark:text-white">{totalItems}</span> results
      </p>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="sm" disabled={!hasPrev} onClick={() => onPageChange(currentPage - 1)}>Prev</Button>
        {pages.map((page, i) =>
          page === '...'
            ? <span key={i} className="px-3 py-1 text-gray-400">...</span>
            : <button key={i} onClick={() => onPageChange(page)}
                className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all ${page === currentPage ? 'bg-primary-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>
                {page}
              </button>
        )}
        <Button variant="outline" size="sm" disabled={!hasNext} onClick={() => onPageChange(currentPage + 1)}>Next</Button>
      </div>
    </div>
  )
}