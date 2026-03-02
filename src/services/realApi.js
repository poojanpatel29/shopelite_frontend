import api from './api'

// ── Auth ─────────────────────────────────────────────────────────────────────
export const authApi = {
  login:    (data)  => api.post('/auth/login', data).then(r => r.data),
  register: (data)  => api.post('/auth/register', data).then(r => r.data),
  me:       ()      => api.get('/auth/me').then(r => r.data),
  refresh:  (token) => api.post('/auth/refresh', { refresh_token: token }).then(r => r.data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }).then(r => r.data),
  resetPassword:  (token, password) => api.post('/auth/reset-password', { token, new_password: password }).then(r => r.data),
}

// ── Products ──────────────────────────────────────────────────────────────────
export const productsApi = {
  getAll: (params) => api.get('/products', { params }).then(r => r.data),
  // params: { page, per_page, category, search, min_price, max_price, sort_by, in_stock }

  getById:  (id)      => api.get(`/products/${id}`).then(r => r.data),
  create:   (data)    => api.post('/products', data).then(r => r.data),
  update:   (id, data)=> api.put(`/products/${id}`, data).then(r => r.data),
  delete:   (id)      => api.delete(`/products/${id}`),
}

// ── Orders ────────────────────────────────────────────────────────────────────
export const ordersApi = {
  create:       (data) => api.post('/orders', data).then(r => r.data),
  getMyOrders:  ()     => api.get('/orders/my').then(r => r.data),
  getById:      (id)   => api.get(`/orders/${id}`).then(r => r.data),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }).then(r => r.data),
  getAll:       ()     => api.get('/orders').then(r => r.data),          // admin
}

// ── Users ─────────────────────────────────────────────────────────────────────
export const usersApi = {
  getProfile: ()      => api.get('/users/me').then(r => r.data),
  update:     (data)  => api.patch('/users/me', data).then(r => r.data),
  getAll:     ()      => api.get('/users').then(r => r.data),            // admin
  deactivate: (id)    => api.patch(`/users/${id}/deactivate`).then(r => r.data),
}

// ── Addresses ─────────────────────────────────────────────────────────────────
export const addressApi = {
  getAll:   ()      => api.get('/users/me/addresses').then(r => r.data),
  create:   (data)  => api.post('/users/me/addresses', data).then(r => r.data),
  update:   (id, d) => api.put(`/users/me/addresses/${id}`, d).then(r => r.data),
  delete:   (id)    => api.delete(`/users/me/addresses/${id}`),
  setDefault:(id)   => api.patch(`/users/me/addresses/${id}/default`).then(r => r.data),
}

// ── Categories ────────────────────────────────────────────────────────────────
export const categoriesApi = {
  getAll:  ()      => api.get('/categories').then(r => r.data),
  create:  (data)  => api.post('/categories', data).then(r => r.data),
  delete:  (id)    => api.delete(`/categories/${id}`),
}

// ── Analytics (admin) ─────────────────────────────────────────────────────────
export const analyticsApi = {
  getDashboard: () => api.get('/analytics/dashboard').then(r => r.data),
  getSales:     () => api.get('/analytics/sales').then(r => r.data),
}