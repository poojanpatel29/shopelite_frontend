import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'https://shopelite-backend-8skx.onrender.com/api/v1'

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export function setupInterceptors(store) {
  axiosInstance.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const original = error.config

      if (error.response?.status === 401 && !original._retry) {
        original._retry = true
        try {
          const refreshToken = store.getState().auth.refreshToken
          if (!refreshToken) throw new Error('No refresh token')

          const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
            refresh_token: refreshToken,
          })

          store.dispatch({ type: 'auth/setTokens', payload: data })
          original.headers.Authorization = `Bearer ${data.access_token}`
          return axiosInstance(original)
        } catch {
          store.dispatch({ type: 'auth/logout' })
        }
      }
      return Promise.reject(error)
    }
  )
}

export default axiosInstance