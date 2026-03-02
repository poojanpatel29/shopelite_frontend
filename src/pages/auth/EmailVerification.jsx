import { Link } from 'react-router-dom'

export default function EmailVerification() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-950 dark:to-gray-900 p-4">
      <div className="card p-12 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        </div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">Verify your email</h1>
        <p className="text-gray-500 mb-6">We've sent a verification email. Please check your inbox and click the link to activate your account.</p>
        <Link to="/auth/login" className="btn-primary inline-block">Back to Sign In</Link>
      </div>
    </div>
  )
}