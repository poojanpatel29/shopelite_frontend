import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute     from './AdminRoute'
import UserLayout     from '../components/layout/UserLayout'
import AdminLayout    from '../components/layout/AdminLayout'

// Auth
import Login              from '../pages/auth/Login'
import Register           from '../pages/auth/Register'
import ForgotPassword     from '../pages/auth/ForgotPassword'
import ResetPassword      from '../pages/auth/ResetPassword'
import EmailVerification  from '../pages/auth/EmailVerification'

// User Pages
import Home           from '../pages/user/Home'
import ProductListing from '../pages/user/ProductListing'
import ProductDetail  from '../pages/user/ProductDetail'
import SearchResults  from '../pages/user/SearchResults'
import Cart           from '../pages/user/Cart'
import Wishlist       from '../pages/user/Wishlist'
import Checkout       from '../pages/user/Checkout'
import OrderSummary   from '../pages/user/OrderSummary'
import OrderHistory   from '../pages/user/OrderHistory'
import OrderTracking  from '../pages/user/OrderTracking'
import Profile        from '../pages/user/Profile'
import EditProfile    from '../pages/user/EditProfile'
import AddressBook    from '../pages/user/AddressBook'
import Notifications  from '../pages/user/Notifications'

// Admin Pages
import Dashboard       from '../pages/admin/Dashboard'
import ManageProducts  from '../pages/admin/ManageProducts'
import AddEditProduct  from '../pages/admin/AddEditProduct'
import ManageOrders    from '../pages/admin/ManageOrders'
import ManageUsers     from '../pages/admin/ManageUsers'
import ManageCategories from '../pages/admin/ManageCategories'
import Analytics       from '../pages/admin/Analytics'

// Extra
import NotFound from '../pages/extra/NotFound'
import About    from '../pages/extra/About'
import Settings from '../pages/extra/Settings'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/auth/login"               element={<Login />} />
      <Route path="/auth/register"            element={<Register />} />
      <Route path="/auth/forgot-password"     element={<ForgotPassword />} />
      <Route path="/auth/reset-password"      element={<ResetPassword />} />
      <Route path="/auth/verify-email"        element={<EmailVerification />} />

      {/* User Layout */}
      <Route element={<UserLayout />}>
        <Route path="/"                       element={<Home />} />
        <Route path="/products"               element={<ProductListing />} />
        <Route path="/products/:id"           element={<ProductDetail />} />
        <Route path="/search"                 element={<SearchResults />} />
        <Route path="/about"                  element={<About />} />
        <Route path="/cart"                   element={<Cart />} />
        <Route path="/wishlist"               element={<Wishlist />} />

        {/* Protected User Routes */}
        <Route path="/checkout"               element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/order-summary/:id"      element={<ProtectedRoute><OrderSummary /></ProtectedRoute>} />
        <Route path="/orders"                 element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
        <Route path="/orders/:id/tracking"    element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} />
        <Route path="/profile"                element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/profile/edit"           element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path="/profile/addresses"      element={<ProtectedRoute><AddressBook /></ProtectedRoute>} />
        <Route path="/notifications"          element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/settings"               element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index                          element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard"               element={<Dashboard />} />
        <Route path="products"                element={<ManageProducts />} />
        <Route path="products/new"            element={<AddEditProduct />} />
        <Route path="products/:id/edit"       element={<AddEditProduct />} />
        <Route path="orders"                  element={<ManageOrders />} />
        <Route path="users"                   element={<ManageUsers />} />
        <Route path="categories"              element={<ManageCategories />} />
        <Route path="analytics"               element={<Analytics />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}