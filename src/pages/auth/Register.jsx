import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

export default function Register() {
  const { register, loading } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const e = {}
    if (!form.name.trim())                      e.name = 'Name is required'
    if (!form.email.includes('@'))              e.email = 'Valid email required'
    if (form.password.length < 6)               e.password = 'Min 6 characters'
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    const result = await register(form)
    if (!result.success) setServerError(result.error)
  }

  const f = (field) => ({
    value: form[field],
    onChange: (e) => setForm({ ...form, [field]: e.target.value }),
    error: errors[field],
  })

  return (
    <div className="min-h-screen flex bg-white dark:bg-zinc-950">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-zinc-950/60 to-indigo-900/80" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">Shop<span className="text-primary-400">Elite</span></span>
          </Link>
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3 font-semibold">Join 50,000+ shoppers</p>
            <div className="flex flex-col gap-3">
              {['✓ Free delivery on orders over ₹500', '✓ 30-day hassle-free returns', '✓ Exclusive member deals & offers', '✓ 24/7 customer support'].map((f) => (
                <p key={f} className="text-white/80 text-sm">{f}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="flex items-center gap-2.5 mb-10 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-lg text-zinc-900 dark:text-white">Shop<span className="text-primary-600">Elite</span></span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Create account</h1>
            <p className="text-zinc-500 mt-2 text-sm">Join thousands of happy shoppers</p>
          </div>

          {serverError && (
            <div className="mb-5 p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-2.5">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name"        type="text"     placeholder="Priya Sharma"       {...f('name')} required />
            <Input label="Email Address"    type="email"    placeholder="you@example.com"    {...f('email')} required />
            <Input label="Password"         type="password" placeholder="Min. 6 characters"  {...f('password')} required />
            <Input label="Confirm Password" type="password" placeholder="Repeat password"    {...f('confirmPassword')} required />
            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-zinc-500 mt-6">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-primary-600 hover:text-primary-700 font-semibold">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}