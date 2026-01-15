import { LogEntry } from '../services/api'
import { exportToCSV } from '../utils/export'
import { exportToPDF } from '../utils/export'
import styles from './ExportButtons.module.css'

interface ExportButtonsProps {
  logs: LogEntry[]
  total: number
}

export default function ExportButtons({ logs, total }: ExportButtonsProps) {
  const handleCSV = () => exportToCSV(logs)
  const handlePDF = () => exportToPDF(logs, total)

  return (
    <div className={styles.buttons}>
      <button className={styles.btn} onClick={handleCSV}>
        Export CSV
      </button>
      <button className={styles.btn} onClick={handlePDF}>
        Export PDF
      </button>
    </div>
  )
}
