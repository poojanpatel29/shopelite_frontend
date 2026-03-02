export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="page-title mb-4">About ShopElite</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">We're on a mission to make premium shopping accessible to everyone, everywhere.</p>
      </div>

      {/* Story */}
      <div className="card p-8 mb-8">
        <h2 className="section-title mb-4">Our Story</h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">Founded in 2020, ShopElite started with a simple idea: great products shouldn't be hard to find or afford. We curate the best items from around the world and bring them directly to your door with exceptional service.</p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Today, we serve over 50,000 happy customers with a catalog of 10,000+ premium products, backed by 24/7 support and a hassle-free return policy.</p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {[['🌟', 'Quality First', 'Every product is hand-picked and quality-checked before it reaches you.'],
          ['⚡', 'Fast Delivery', 'Most orders arrive within 2-5 business days with real-time tracking.'],
          ['💚', 'Customer Love', 'Our support team is here 24/7 to ensure your satisfaction.']
        ].map(([icon, title, desc]) => (
          <div key={title} className="card p-6 text-center">
            <div className="text-4xl mb-3">{icon}</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-500">{desc}</p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div id="contact" className="card p-8">
        <h2 className="section-title mb-6">Contact Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[['📧', 'Email', 'support@shopelite.com'],
            ['📞', 'Phone', '+1-800-SHOP-ELITE'],
            ['📍', 'Address', '123 Commerce St, San Francisco, CA']
          ].map(([icon, label, value]) => (
            <div key={label} className="text-center">
              <div className="text-3xl mb-2">{icon}</div>
              <p className="font-medium text-gray-900 dark:text-white mb-1">{label}</p>
              <p className="text-sm text-gray-500">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}