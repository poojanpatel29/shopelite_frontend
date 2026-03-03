import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-600/25">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-xl text-zinc-900 dark:text-white tracking-tight">
                Shop<span className="text-primary-600">Elite</span>
              </span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
              Premium products, exceptional service. Your one-stop shop for everything you need, delivered across India.
            </p>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {['🔒 Secure Pay', '🚀 Fast Delivery', '↩️ Easy Returns'].map((badge) => (
                <span key={badge} className="text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-lg">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: 'Shop',
              links: [
                ['All Products',  '/products'],
                ['Categories',    '/products'],
                ['Deals',         '/products?sort=discount'],
                ['New Arrivals',  '/products?filter=new'],
              ],
            },
            {
              title: 'Account',
              links: [
                ['My Profile',  '/profile'],
                ['My Orders',   '/orders'],
                ['Wishlist',    '/wishlist'],
                ['Addresses',   '/profile/addresses'],
              ],
            },
            {
              title: 'Support',
              links: [
                ['About Us',        '/about'],
                ['Contact Us',      '/about#contact'],
                ['Shipping Policy', '/about#shipping'],
                ['Returns & Refund','/about#returns'],
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-widest mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map(([label, to]) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-400">
            © {new Date().getFullYear()} ShopElite India Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[['Privacy Policy', '/about'], ['Terms of Use', '/about'], ['Cookie Policy', '/about']].map(([label, to]) => (
              <Link key={label} to={to} className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}