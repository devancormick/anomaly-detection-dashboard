import { LogEntry } from '../services/api'
import { format } from 'date-fns'
import styles from './LogTable.module.css'

interface LogTableProps {
  logs: LogEntry[]
  loading: boolean
}

const levelColors: Record<string, string> = {
  info: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-danger)',
}

export default function LogTable({ logs, loading }: LogTableProps) {
  if (loading) {
    return (
      <div className={styles.table}>
        <div className={styles.loading}>Loading logs...</div>
      </div>
    )
  }

  if (logs.length === 0) {
    return (
      <div className={styles.table}>
        <div className={styles.empty}>No logs found</div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Level</th>
            <th>Source</th>
            <th>Message</th>
            <th>Anomaly</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className={log.isAnomaly ? styles.anomalyRow : ''}>
              <td className={styles.time}>{format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss')}</td>
              <td>
                <span
                  className={styles.level}
                  style={{ color: levelColors[log.level] || 'var(--color-text-muted)' }}
                >
                  {log.level}
                </span>
              </td>
              <td>{log.source}</td>
              <td>{log.message}</td>
              <td>{log.isAnomaly ? '⚠️ Yes' : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
