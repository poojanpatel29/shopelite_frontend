import { useDispatch, useSelector } from 'react-redux'
import { selectNotifications, markAsRead, markAllRead, clearNotification } from '../../redux/slices/notificationsSlice'
import Button from '../../components/common/Button'
import Badge from '../../components/common/Badge'

const typeVariant = { success: 'success', info: 'primary', warning: 'warning', danger: 'danger' }

export default function Notifications() {
  const dispatch = useDispatch()
  const notifications = useSelector(selectNotifications)
  const unread = notifications.filter((n) => !n.read).length

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="page-title">Notifications</h1>
          {unread > 0 && <p className="text-sm text-gray-500 mt-1">{unread} unread</p>}
        </div>
        {unread > 0 && <Button variant="outline" size="sm" onClick={() => dispatch(markAllRead())}>Mark All Read</Button>}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔔</div>
          <p className="text-gray-500">No notifications</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div key={n.id} onClick={() => dispatch(markAsRead(n.id))}
              className={`card p-5 cursor-pointer transition-all hover:shadow-md ${!n.read ? 'border-l-4 border-l-primary-500' : ''}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{n.title}</p>
                    {!n.read && <Badge variant={typeVariant[n.type] || 'default'}>New</Badge>}
                  </div>
                  <p className="text-sm text-gray-500">{n.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{n.time}</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); dispatch(clearNotification(n.id)) }}
                  className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}