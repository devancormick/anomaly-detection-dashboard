import { useState, useEffect } from 'react'
import { useSettings } from '../contexts/SettingsContext'
import styles from './Settings.module.css'

export default function Settings() {
  const { settings, saveSettings } = useSettings()
  const [apiEndpoint, setApiEndpoint] = useState(settings.apiEndpoint)
  const [refreshInterval, setRefreshInterval] = useState(settings.refreshInterval)
  const [notifications, setNotifications] = useState(settings.notifications)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setApiEndpoint(settings.apiEndpoint)
    setRefreshInterval(settings.refreshInterval)
    setNotifications(settings.notifications)
  }, [settings])

  const handleSave = () => {
    saveSettings({ apiEndpoint, refreshInterval, notifications })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className={styles.settingsPage}>
      <h1 className={styles.title}>Settings</h1>
      <p className={styles.subtitle}>Configure dashboard preferences</p>

      <section className={styles.section}>
        <h2>API Configuration</h2>
        <div className={styles.field}>
          <label htmlFor="apiEndpoint">API Base URL</label>
          <input
            id="apiEndpoint"
            type="url"
            value={apiEndpoint}
            onChange={(e) => setApiEndpoint(e.target.value)}
            placeholder="https://api.example.com/v1"
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Refresh Settings</h2>
        <div className={styles.field}>
          <label htmlFor="refreshInterval">Real-time refresh interval (seconds)</label>
          <input
            id="refreshInterval"
            type="number"
            min={5}
            max={120}
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Notifications</h2>
        <div className={styles.field}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
            Enable anomaly alerts notifications
          </label>
        </div>
      </section>

      <div className={styles.actions}>
        <button className={styles.saveBtn} onClick={handleSave}>
          {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}
