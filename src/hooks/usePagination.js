import { useMemo } from 'react'

export function usePagination({ totalItems, itemsPerPage, currentPage }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const pages = useMemo(() => {
    const range = []
    const delta = 2
    const left  = Math.max(1, currentPage - delta)
    const right = Math.min(totalPages, currentPage + delta)

    if (left > 1) { range.push(1); if (left > 2) range.push('...') }
    for (let i = left; i <= right; i++) range.push(i)
    if (right < totalPages) { if (right < totalPages - 1) range.push('...'); range.push(totalPages) }
    return range
  }, [currentPage, totalPages])

  return {
    totalPages,
    pages,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
    startItem: (currentPage - 1) * itemsPerPage + 1,
    endItem:   Math.min(currentPage * itemsPerPage, totalItems),
  }
}