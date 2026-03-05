import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function Login() {
  const { login, loading, error } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form.email, form.password);
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-zinc-950">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-950 dark:bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-zinc-950/60 to-indigo-900/80" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Shop<span className="text-primary-400">Elite</span>
            </span>
          </Link>
          <div>
            <blockquote
              className="text-white/90 text-2xl font-light leading-relaxed mb-6"
              style={{ fontFamily: 'Instrument Serif, serif' }}
            >
              "The best shopping experience, curated just for you."
            </blockquote>
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/40?img=44"
                className="w-10 h-10 rounded-full ring-2 ring-white/20"
                alt=""
              />
              <div>
                <p className="text-white text-sm font-medium">Priya Sharma</p>
                <p className="text-white/50 text-xs">Verified Shopper</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2.5 mb-10 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-lg text-zinc-900 dark:text-white">
              Shop<span className="text-primary-600">Elite</span>
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Welcome back
            </h1>
            <p className="text-zinc-500 mt-2 text-sm">Sign in to your account to continue</p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-2.5">
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
            />
            <Input
              label="Password"
              type={showPass ? 'text' : 'password'}
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              iconRight={
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPass ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.75}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.75}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    )}
                  </svg>
                </button>
              }
            />
            <div className="flex justify-end">
              <Link
                to="/auth/forgot-password"
                className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-zinc-500 mt-6">
            Don't have an account?{' '}
            <Link
              to="/auth/register"
              className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
