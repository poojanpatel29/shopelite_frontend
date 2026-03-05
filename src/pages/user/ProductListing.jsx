import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilters, setPage } from '../../redux/slices/filtersSlice';
import {
  setProducts,
  setTotal,
  setLoading,
  selectAllProducts,
  selectProductsLoading,
  selectProductsTotal,
} from '../../redux/slices/productsSlice';
import { productsApi } from '../../services/realApi';
import { useDebounce } from '../../hooks/useDebounce';
import ProductCard from '../../components/product/ProductCard';
import ProductFilters from '../../components/product/ProductFilters';
import Pagination from '../../components/common/Pagination';

export default function ProductListing() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const products = useSelector(selectAllProducts);
  const loading = useSelector(selectProductsLoading);
  const total = useSelector(selectProductsTotal);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const debouncedSearch = useDebounce(filters.search, 500);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      try {
        const data = await productsApi.getAll({
          page: filters.page,
          per_page: filters.perPage,
          category: filters.category !== 'all' ? filters.category : undefined,
          search: debouncedSearch || undefined,
          min_price: filters.priceMin > 0 ? filters.priceMin : undefined,
          max_price: filters.priceMax < 200000 ? filters.priceMax : undefined, // ← change 5000 to 200000
          sort_by: filters.sortBy,
          in_stock: filters.inStock || undefined,
        });
        dispatch(setProducts(data.items));
        dispatch(setTotal(data.total));
      } catch (err) {
        console.error(err);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchProducts();
  }, [
    filters.page,
    filters.perPage,
    filters.category,
    debouncedSearch,
    filters.priceMin,
    filters.priceMax,
    filters.sortBy,
    filters.inStock,
    dispatch,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title">All Products</h1>
          <p className="text-gray-500 text-sm mt-1">{total} products found</p>
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          className="lg:hidden btn-secondary text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
            />
          </svg>
          Filters
        </button>
      </div>

      <div className="flex gap-8">
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="card p-6 sticky top-24">
            <ProductFilters />
          </div>
        </aside>

        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-200 border-t-primary-600" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No products found
              </h3>
              <p className="text-gray-500">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          <Pagination
            currentPage={filters.page}
            totalItems={total}
            itemsPerPage={filters.perPage}
            onPageChange={(page) => {
              dispatch(setPage(page));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title">Filters</h2>
              <button onClick={() => setDrawerOpen(false)}>✕</button>
            </div>
            <ProductFilters onClose={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
