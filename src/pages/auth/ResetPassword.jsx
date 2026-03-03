import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

export default function ResetPassword() {
  const [form, setForm]       = useState({ password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const navigate              = useNavigate()

  const mismatch = form.password && form.confirm && form.password !== form.confirm

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (mismatch) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    navigate('/auth/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center gap-2.5 mb-10 justify-center">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-600/30">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="font-bold text-xl text-zinc-900 dark:text-white">Shop<span className="text-primary-600">Elite</span></span>
        </Link>

        <div className="card p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">New Password</h1>
            <p className="text-zinc-500 text-sm mt-1">Choose a strong, unique password</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="New Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Min 6 characters"
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              error={mismatch ? "Passwords don't match" : ''}
              placeholder="Repeat password"
              required
            />
            <Button type="submit" className="w-full" size="lg" loading={loading} disabled={!!mismatch}>
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}