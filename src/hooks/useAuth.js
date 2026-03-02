import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  loginStart, loginSuccess, loginFailure,
  logout as logoutAction, updateUser, selectAuth, selectUser, selectIsAdmin,
} from '../redux/slices/authSlice'
import { clearCart } from '../redux/slices/cartSlice'
import { addToast } from '../redux/slices/notificationsSlice'
import { authApi } from '../services/realApi'
import api from '../services/api'

export function useAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth     = useSelector(selectAuth)
  const user     = useSelector(selectUser)
  const isAdmin  = useSelector(selectIsAdmin)

  const login = async (email, password) => {
    dispatch(loginStart())
    try {
      // Step 1 — get tokens
      const tokens = await authApi.login({ email, password })

      // Step 2 — manually attach token to header for the /me call
      // because Redux hasn't updated yet at this point
      const me = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${tokens.access_token}` }
      }).then(r => r.data)

      // Step 3 — now save everything to Redux
      dispatch(loginSuccess({ ...tokens, user: me }))
      dispatch(addToast({ type: 'success', message: `Welcome back, ${me.name}!` }))
      navigate(me.role === 'admin' ? '/admin/dashboard' : '/')
      return { success: true }
    } catch (err) {
      const msg = err.response?.data?.detail || 'Invalid email or password'
      dispatch(loginFailure(msg))
      return { success: false, error: msg }
    }
  }

  const register = async (data) => {
    dispatch(loginStart())
    try {
      // Step 1 — register and get tokens
      const tokens = await authApi.register({
        name:     data.name,
        email:    data.email,
        password: data.password,
        phone:    data.phone || null,
      })

      // Step 2 — manually attach token for /me call
      const me = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${tokens.access_token}` }
      }).then(r => r.data)

      // Step 3 — save to Redux
      dispatch(loginSuccess({ ...tokens, user: me }))
      dispatch(addToast({ type: 'success', message: 'Account created successfully!' }))
      navigate('/')
      return { success: true }
    } catch (err) {
      const msg = err.response?.data?.detail || 'Registration failed'
      dispatch(loginFailure(msg))
      return { success: false, error: msg }
    }
  }

  const logout = () => {
    dispatch(logoutAction())
    dispatch(clearCart())
    dispatch(addToast({ type: 'info', message: 'Logged out successfully' }))
    navigate('/auth/login')
  }

  const refreshProfile = async () => {
    try {
      const me = await authApi.me()
      dispatch(updateUser(me))
    } catch {
      logout()
    }
  }

  return { ...auth, user, isAdmin, login, register, logout, refreshProfile }
}