import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">S</span>
              </div>
              <span className="font-display font-bold text-xl text-gray-900 dark:text-white">ShopElite</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Premium products, exceptional service. Your one-stop shop for everything you need.</p>
          </div>
          {[
            { title: 'Shop', links: [['Products', '/products'], ['Categories', '/products'], ['Deals', '/products?sort=discount'], ['New Arrivals', '/products?filter=new']] },
            { title: 'Account', links: [['My Profile', '/profile'], ['Orders', '/orders'], ['Wishlist', '/wishlist'], ['Addresses', '/profile/addresses']] },
            {
              title: 'Support', links: [
                ['About Us', '/about'],
                ['Contact', '/about#contact'],
                ['Shipping Policy', '/about#shipping'],
                ['Return & Refund', '/about#returns'],
              ]
            }
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(([label, to]) => (
                  <li key={label}><Link to={to} className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} ShopElite India Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <Link to="/about" className="hover:text-gray-600 dark:hover:text-gray-300">Privacy</Link>
            <Link to="/about" className="hover:text-gray-600 dark:hover:text-gray-300">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}