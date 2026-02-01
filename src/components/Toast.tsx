import { useNotifications } from '../contexts/NotificationContext'
import styles from './Toast.module.css'

export default function Toast() {
  const { toasts, dismissToast } = useNotifications()

  if (toasts.length === 0) return null

  return (
    <div className={styles.container}>
      {toasts.map((t) => (
        <div
          key={t.id}
          className={[styles.toast, styles[t.severity]].join(' ')}
          role="alert"
        >
          <span className={styles.message}>{t.message}</span>
          <button
            className={styles.dismiss}
            onClick={() => dismissToast(t.id)}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
