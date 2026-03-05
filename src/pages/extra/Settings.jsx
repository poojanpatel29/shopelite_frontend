import { useTheme } from '../../context/ThemeContext';
import { useDispatch } from 'react-redux';
import { addToast } from '../../redux/slices/notificationsSlice';
import Button from '../../components/common/Button';

export default function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const dispatch = useDispatch();

  const save = () => dispatch(addToast({ type: 'success', message: 'Settings saved!' }));

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="page-title mb-8">Settings</h1>

      <div className="space-y-4">
        2:50 PM
        {/* Appearance */}
        <div className="card p-6">
          <h2 className="section-title mb-4">Appearance</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
              <p className="text-sm text-gray-500">Toggle dark/light theme</p>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-12 h-6 rounded-full transition-colors ${isDark ? 'bg-primary-600' : 'bg-gray-200'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isDark ? 'translate-x-6' : 'translate-x-0'}`}
              />
            </button>
          </div>
        </div>
        {/* Notifications */}
        <div className="card p-6">
          <h2 className="section-title mb-4">Notifications</h2>
          <div className="space-y-4">
            {[
              ['Order Updates', 'Get notified about your order status'],
              ['Promotions', 'Receive deals and exclusive offers'],
              ['Newsletter', 'Weekly product highlights'],
            ].map(([title, desc]) => (
              <div key={title} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{title}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
                <button className="relative w-10 h-5 bg-primary-600 rounded-full">
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full shadow" />
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Privacy */}
        <div className="card p-6">
          <h2 className="section-title mb-4">Privacy</h2>
          <div className="space-y-3">
            {['Save browsing history', 'Personalized recommendations', 'Share analytics data'].map(
              (item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-primary-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                </label>
              )
            )}
          </div>
        </div>
        <Button size="lg" className="w-full" onClick={save}>
          Save Settings
        </Button>
      </div>
    </div>
  );
}
