import { useEffect, useState } from 'react'
import { api, LogEntry, AnomalyAlert, ModelMetrics } from '../services/api'
import MetricCard from '../components/MetricCard'
import AnomalyChart from '../components/AnomalyChart'
import AlertsPanel from '../components/AlertsPanel'
import RealtimeLogs from '../components/RealtimeLogs'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null)
  const [alerts, setAlerts] = useState<AnomalyAlert[]>([])
  const [trend, setTrend] = useState<{ date: string; count: number }[]>([])
  const [realtimeLogs, setRealtimeLogs] = useState<LogEntry[]>([])

  useEffect(() => {
    api.getModelMetrics().then(setMetrics)
    api.getAlerts().then(setAlerts)
    api.getAnomalyTrend(7).then((data) =>
      setTrend(data.map((d) => ({ date: d.date, count: d.count })))
    )
  }, [])

  useEffect(() => {
    return api.getRealtimeLogs((log) => {
      setRealtimeLogs((prev) => [log, ...prev].slice(0, 10))
    })
  }, [])

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.subtitle}>Real-time anomaly detection overview</p>

      {metrics && (
        <div className={styles.metrics}>
          <MetricCard label="Accuracy" value={`${(metrics.accuracy * 100).toFixed(1)}%`} />
          <MetricCard label="Precision" value={`${(metrics.precision * 100).toFixed(1)}%`} />
          <MetricCard label="Recall" value={`${(metrics.recall * 100).toFixed(1)}%`} />
          <MetricCard label="F1 Score" value={`${(metrics.f1Score * 100).toFixed(1)}%`} />
        </div>
      )}

      <div className={styles.grid}>
        <div className={styles.chartSection}>
          <h2>Anomaly Trend (7 Days)</h2>
          <AnomalyChart data={trend} />
        </div>
        <div className={styles.alertsSection}>
          <h2>Active Alerts</h2>
          <AlertsPanel alerts={alerts} />
        </div>
      </div>

      <div className={styles.realtimeSection}>
        <h2>Real-time Logs</h2>
        <RealtimeLogs logs={realtimeLogs} />
      </div>
    </div>
  )
}
