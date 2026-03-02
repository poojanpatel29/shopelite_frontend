import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

export default function ResetPassword() {
  const [form, setForm]     = useState({ password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    navigate('/auth/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-950 dark:to-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">New Password</h1>
          <p className="text-gray-500 mt-2">Choose a strong password</p>
        </div>
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="New Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Min 6 characters" required />
            <Input label="Confirm Password" type="password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} error={form.password && form.confirm && form.password !== form.confirm ? "Passwords don't match" : ''} required />
            <Button type="submit" className="w-full" size="lg" loading={loading}>Reset Password</Button>
          </form>
        </div>
      </div>
    </div>
  )
}