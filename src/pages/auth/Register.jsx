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
    if (!form.name.trim())                    e.name = 'Name is required'
    if (!form.email.includes('@'))            e.email = 'Valid email required'
    if (form.password.length < 6)             e.password = 'Min 6 characters'
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

  const f = (field) => ({ value: form[field], onChange: (e) => setForm({ ...form, [field]: e.target.value }), error: errors[field] })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-950 dark:to-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center"><span className="text-white font-display font-bold">S</span></div>
            <span className="font-display font-bold text-2xl text-gray-900 dark:text-white">ShopElite</span>
          </Link>
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Create account</h1>
          <p className="text-gray-500 mt-2">Join thousands of happy shoppers</p>
        </div>
        <div className="card p-8">
          {serverError && <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 text-sm">{serverError}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name"      type="text"     placeholder="John Doe"            {...f('name')} required />
            <Input label="Email Address"  type="email"    placeholder="you@example.com"     {...f('email')} required />
            <Input label="Password"       type="password" placeholder="Min. 6 characters"   {...f('password')} required />
            <Input label="Confirm Password" type="password" placeholder="Repeat password"   {...f('confirmPassword')} required />
            <Button type="submit" className="w-full" size="lg" loading={loading}>Create Account</Button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}