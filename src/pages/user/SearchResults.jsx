import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../../redux/slices/productsSlice';
import ProductCard from '../../components/product/ProductCard';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const products = useSelector(selectAllProducts);

  const results = useMemo(() => {
    if (!q) return [];
    const lower = q.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower)
    );
  }, [products, q]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="page-title">Search Results</h1>
        <p className="text-gray-500 mt-2">
          {results.length > 0
            ? `Found ${results.length} results for "${q}"`
            : `No results for "${q}"`}
        </p>
      </div>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No products found
          </h3>
          <p className="text-gray-500">Try searching with different keywords</p>
        </div>
      )}
    </div>
  );
}
