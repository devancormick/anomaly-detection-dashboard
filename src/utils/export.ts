import { LogEntry } from '../services/api'
import { format } from 'date-fns'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

export function exportToCSV(logs: LogEntry[]) {
  const headers = ['Timestamp', 'Level', 'Source', 'Message', 'Anomaly']
  const rows = logs.map((l) => [
    format(new Date(l.timestamp), 'yyyy-MM-dd HH:mm:ss'),
    l.level,
    l.source,
    `"${l.message.replace(/"/g, '""')}"`,
    l.isAnomaly ? 'Yes' : 'No',
  ])
  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `anomaly-logs-${format(new Date(), 'yyyy-MM-dd')}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function exportToPDF(logs: LogEntry[], total: number) {
  const doc = new jsPDF()
  doc.setFontSize(18)
  doc.text('Anomaly Detection - Log Export', 14, 20)
  doc.setFontSize(11)
  doc.text(`Generated: ${format(new Date(), 'PPpp')} | Showing ${logs.length} of ${total} logs`, 14, 28)
  doc.setFontSize(10)
  const head = [['Timestamp', 'Level', 'Source', 'Message', 'Anomaly']]
  const body = logs.map((l) => [
    format(new Date(l.timestamp), 'yyyy-MM-dd HH:mm'),
    l.level,
    l.source,
    l.message.slice(0, 40) + (l.message.length > 40 ? '...' : ''),
    l.isAnomaly ? 'Yes' : 'No',
  ])
  autoTable(doc, {
    head,
    body,
    startY: 35,
    theme: 'plain',
    styles: { fontSize: 9 },
    headStyles: { fillColor: [59, 130, 246] },
  })
  doc.save(`anomaly-logs-${format(new Date(), 'yyyy-MM-dd')}.pdf`)
}
