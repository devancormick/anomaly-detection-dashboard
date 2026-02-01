import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { useNotifications } from '../contexts/NotificationContext'
import styles from './Header.module.css'

export default function Header() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { unreadCount, clearUnread } = useNotifications()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleNotificationsClick = () => {
    clearUnread()
    navigate('/')
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft} />
      <div className={styles.headerRight}>
        <button
          className={styles.notificationBtn}
          onClick={handleNotificationsClick}
          title="View alerts"
          aria-label={`${unreadCount} unread alerts`}
        >
          <span className={styles.bell}>🔔</span>
          {unreadCount > 0 && (
            <span className={styles.badge}>{unreadCount > 9 ? '9+' : unreadCount}</span>
          )}
        </button>
        <button
          className={styles.themeBtn}
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{user?.name ?? user?.email}</span>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
