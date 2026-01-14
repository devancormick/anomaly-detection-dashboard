import { useEffect, useState, useCallback } from 'react'
import { api, LogEntry } from '../services/api'
import LogTable from '../components/LogTable'
import LogFilters from '../components/LogFilters'
import ExportButtons from '../components/ExportButtons'
import styles from './Logs.module.css'

const PAGE_SIZE = 20

export default function Logs() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [level, setLevel] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchLogs = useCallback(async () => {
    setLoading(true)
    const res = await api.getLogs(page, PAGE_SIZE, search, level)
    setLogs(res.logs)
    setTotal(res.total)
    setLoading(false)
  }, [page, search, level])

  useEffect(() => {
    fetchLogs()
  }, [fetchLogs])


  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className={styles.logsPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Logs</h1>
        <p className={styles.subtitle}>Search and filter log entries</p>
      </div>
      <div className={styles.toolbar}>
        <LogFilters
          search={search}
          onSearchChange={(v) => { setSearch(v); setPage(1) }}
          level={level}
          onLevelChange={(v) => { setLevel(v); setPage(1) }}
          onPageChange={setPage}
        />
        <ExportButtons logs={logs} total={total} />
      </div>
      <LogTable logs={logs} loading={loading} />
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </button>
          <span className={styles.pageInfo}>
            Page {page} of {totalPages} ({total} total)
          </span>
          <button
            className={styles.pageBtn}
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
