import { AnomalyAlert } from '../services/api'
import { formatDistanceToNow } from 'date-fns'
import styles from './AlertsPanel.module.css'

interface AlertsPanelProps {
  alerts: AnomalyAlert[]
}

const severityColors: Record<string, string> = {
  low: 'var(--color-success)',
  medium: 'var(--color-warning)',
  high: 'var(--color-danger)',
  critical: '#dc2626',
}

export default function AlertsPanel({ alerts }: AlertsPanelProps) {
  if (alerts.length === 0) {
    return <p className={styles.empty}>No active alerts</p>
  }

  return (
    <div className={styles.list}>
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={[styles.alert, alert.resolved ? styles.resolved : ''].join(' ')}
        >
          <span
            className={styles.severity}
            style={{ color: severityColors[alert.severity] || 'var(--color-text-muted)' }}
          >
            {alert.severity}
          </span>
          <p className={styles.message}>{alert.message}</p>
          <span className={styles.time}>
            {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
            {alert.resolved && ' • Resolved'}
          </span>
        </div>
      ))}
    </div>
  )
}
