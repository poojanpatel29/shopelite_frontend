import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setProducts,
  selectAllProducts,
  selectFeaturedProducts,
} from '../../redux/slices/productsSlice';
import { productsApi, categoriesApi } from '../../services/realApi';
import ProductCard from '../../components/product/ProductCard';

const CATEGORY_ICONS = {
  electronics: '💻',
  clothing: '👗',
  books: '📚',
  'home-garden': '🏠',
  sports: '⚽',
  beauty: '💄',
};

export default function Home() {
  const dispatch = useDispatch();
  const featured = useSelector(selectFeaturedProducts);
  const all = useSelector(selectAllProducts);
  const [categories, setCategories] = useState([]);

  const newest = useMemo(
    () => [...all].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 4),
    [all]
  );
  const deals = useMemo(() => all.filter((p) => p.discount > 0).slice(0, 4), [all]);

  useEffect(() => {
    if (all.length === 0) {
      productsApi
        .getAll({ per_page: 20 })
        .then((data) => {
          dispatch(setProducts(data.items));
        })
        .catch(console.error);
    }

    categoriesApi.getAll().then(setCategories).catch(console.error);
  }, [all.length, dispatch]);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, #0ea5e9 0%, transparent 50%), radial-gradient(circle at 80% 50%, #7c3aed 0%, transparent 50%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-primary-500/20 text-primary-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-primary-500/30">
              🔥 Festive Sale — Up to 50% Off
            </span>
            <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6">
              Shop the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-cyan-400">
                Future
              </span>
              <br />
              Today
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-md">
              Discover thousands of premium products. Fast delivery across India, easy returns, and
              unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/products" className="btn-primary text-lg px-8 py-3 rounded-xl">
                Shop Now →
              </Link>
              <Link
                to="/products?filter=deals"
                className="btn-secondary text-lg px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white"
              >
                View Deals
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-purple-500/30 rounded-3xl blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600"
                alt="Shopping"
                className="relative rounded-3xl object-cover w-full h-full shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            ['1L+', 'Products'],
            ['50L+', 'Happy Customers'],
            ['100%', 'Secure Checkout'],
            ['24/7', 'Customer Support'],
          ].map(([val, label]) => (
            <div key={label}>
              <p className="text-2xl font-display font-bold">{val}</p>
              <p className="text-primary-200 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="page-title">Shop by Category</h2>
              <p className="text-gray-500 mt-1">Find exactly what you're looking for</p>
            </div>
            <Link to="/products" className="text-primary-600 font-medium text-sm hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="card p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="text-4xl mb-3">{CATEGORY_ICONS[cat.slug] || '🛍️'}</div>
                <h3 className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-primary-600 transition-colors">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="page-title">Featured Products</h2>
              <p className="text-gray-500 mt-1">Hand-picked just for you</p>
            </div>
            <Link to="/products" className="text-primary-600 font-medium text-sm hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featured.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Deals Banner */}
      {deals.length > 0 && (
        <section className="bg-gradient-to-r from-accent to-red-500 text-white py-12 mb-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="font-medium mb-2 opacity-90">⚡ Limited Time Offer</p>
            <h2 className="text-4xl font-display font-bold mb-4">Festive Season Deals</h2>
            <p className="text-orange-100 mb-6">
              Up to 50% off — Diwali, Holi & more. Don't miss out!
            </p>
            <Link
              to="/products?filter=deals"
              className="bg-white text-accent hover:bg-gray-50 font-semibold px-8 py-3 rounded-xl transition-colors inline-block"
            >
              Grab the Deals →
            </Link>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newest.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="page-title">New Arrivals</h2>
              <p className="text-gray-500 mt-1">Fresh picks just landed</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newest.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
