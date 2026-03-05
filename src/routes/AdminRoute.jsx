import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth, selectIsAdmin } from '../redux/slices/authSlice';

export default function AdminRoute({ children }) {
  const { isAuthenticated } = useSelector(selectAuth);
  const isAdmin = useSelector(selectIsAdmin);
  if (!isAuthenticated) return <Navigate to="/auth/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
}
