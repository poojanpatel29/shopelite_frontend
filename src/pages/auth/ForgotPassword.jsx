import { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setSent(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-950 dark:to-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center"><span className="text-white font-display font-bold">S</span></div>
            <span className="font-display font-bold text-2xl text-gray-900 dark:text-white">ShopElite</span>
          </Link>
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Reset Password</h1>
          <p className="text-gray-500 mt-2">We'll send you a reset link</p>
        </div>
        <div className="card p-8">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Check your email!</h3>
              <p className="text-gray-500 text-sm">We've sent a reset link to <strong>{email}</strong></p>
              <Link to="/auth/login" className="text-primary-600 font-medium text-sm">Back to Sign In</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Email Address" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Button type="submit" className="w-full" size="lg" loading={loading}>Send Reset Link</Button>
              <Link to="/auth/login" className="block text-center text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">← Back to Sign In</Link>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}