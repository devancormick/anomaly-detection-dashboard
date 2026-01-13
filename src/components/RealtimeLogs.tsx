import { LogEntry } from '../services/api'
import { format } from 'date-fns'
import styles from './RealtimeLogs.module.css'

interface RealtimeLogsProps {
  logs: LogEntry[]
}

const levelColors: Record<string, string> = {
  info: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-danger)',
}

export default function RealtimeLogs({ logs }: RealtimeLogsProps) {
  if (logs.length === 0) {
    return (
      <p className={styles.empty}>Waiting for new logs... (updates every few seconds)</p>
    )
  }

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <span>Time</span>
        <span>Level</span>
        <span>Source</span>
        <span>Message</span>
        <span>Anomaly</span>
      </div>
      {logs.map((log) => (
        <div key={log.id} className={styles.row}>
          <span className={styles.time}>{format(new Date(log.timestamp), 'HH:mm:ss')}</span>
          <span
            className={styles.level}
            style={{ color: levelColors[log.level] || 'var(--color-text-muted)' }}
          >
            {log.level}
          </span>
          <span className={styles.source}>{log.source}</span>
          <span className={styles.message}>{log.message}</span>
          <span className={log.isAnomaly ? styles.anomaly : styles.normal}>
            {log.isAnomaly ? '⚠️ Yes' : '-'}
          </span>
        </div>
      ))}
    </div>
  )
}
