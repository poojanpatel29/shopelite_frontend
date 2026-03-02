import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toasts: [],
  notifications: [
    { id: 1, title: 'Order Delivered', message: 'Your order ORD-2024-001 has been delivered.', read: false, time: '2 hours ago', type: 'success' },
    { id: 2, title: 'Flash Sale!',     message: '50% off on Electronics today only!',          read: false, time: '5 hours ago', type: 'info' },
    { id: 3, title: 'Review Reminder', message: 'How was your recent purchase?',               read: true,  time: '1 day ago',   type: 'info' },
  ],
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addToast: (state, action) => {
      state.toasts.push({ id: Date.now(), ...action.payload })
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload)
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
  },
})

export const { addToast, removeToast, markAsRead, markAllRead, clearNotification } = notificationsSlice.actions
export default notificationsSlice.reducer

export const selectToasts        = (state) => state.notifications.toasts
export const selectNotifications = (state) => state.notifications.notifications
export const selectUnreadCount   = (state) => state.notifications.notifications.filter((n) => !n.read).length