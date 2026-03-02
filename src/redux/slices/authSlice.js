import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:            null,
  isAuthenticated: false,
  accessToken:     null,
  refreshToken:    null,
  loading:         false,
  error:           null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart:   (state) => { state.loading = true; state.error = null },
    loginSuccess: (state, action) => {
      state.loading         = false
      state.isAuthenticated = true
      state.user            = action.payload.user
      state.accessToken     = action.payload.access_token
      state.refreshToken    = action.payload.refresh_token
      state.error           = null
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error   = action.payload
    },
    logout: (state) => {
      state.user            = null
      state.isAuthenticated = false
      state.accessToken     = null
      state.refreshToken    = null
      state.error           = null
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
    setTokens: (state, action) => {
      state.accessToken  = action.payload.access_token
      state.refreshToken = action.payload.refresh_token
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  loginStart, loginSuccess, loginFailure,
  logout, updateUser, setTokens, clearError,
} = authSlice.actions
export default authSlice.reducer

export const selectAuth    = (state) => state.auth
export const selectUser    = (state) => state.auth.user
export const selectIsAdmin = (state) => state.auth.user?.role === 'admin'