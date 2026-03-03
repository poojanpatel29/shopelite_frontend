import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toasts: [],
  notifications: [], // no hardcoded notifications — added dynamically via addNotification
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    // Toast (temporary popup)
    addToast: (state, action) => {
      state.toasts.push({ id: Date.now(), ...action.payload })
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload)
    },

    // Persistent notifications (bell icon)
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now(),
        read: false,
        time: new Date().toISOString(),
        ...action.payload,
      })
    },
    markAsRead: (state, action) => {
      const n = state.notifications.find((n) => n.id === action.payload)
      if (n) n.read = true
    },
    markAllRead: (state) => {
      state.notifications.forEach((n) => { n.read = true })
    },
    clearNotification: (state, action) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload)
    },
    clearAll: (state) => {
      state.notifications = []
    },
  },
})

export const {
  addToast, removeToast,
  addNotification, markAsRead, markAllRead, clearNotification, clearAll,
} = notificationsSlice.actions

export default notificationsSlice.reducer

export const selectToasts        = (state) => state.notifications.toasts
export const selectNotifications = (state) => state.notifications.notifications
export const selectUnreadCount   = (state) => state.notifications.notifications.filter((n) => !n.read).length