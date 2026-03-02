import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuth } from '../redux/slices/authSlice'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector(selectAuth)
  const location = useLocation()
  if (!isAuthenticated) return <Navigate to="/auth/login" state={{ from: location }} replace />
  return children
}