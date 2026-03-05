import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <div className="text-center max-w-md">
        <div className="text-[120px] font-display font-bold text-gray-100 dark:text-gray-900 leading-none select-none">
          404
        </div>
        <div className="relative -mt-12">
          <div className="text-8xl mb-4">😕</div>
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
            Page not found
          </h2>
          <p className="text-gray-500 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/" className="btn-primary px-6 py-2.5">
              Go Home
            </Link>
            <Link to="/products" className="btn-secondary px-6 py-2.5">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
