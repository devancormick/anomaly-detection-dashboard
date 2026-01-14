import styles from './LogFilters.module.css'

interface LogFiltersProps {
  search: string
  onSearchChange: (v: string) => void
  level: string
  onLevelChange: (v: string) => void
  onPageChange?: (p: number) => void
}

export default function LogFilters({
  search,
  onSearchChange,
  level,
  onLevelChange,
}: LogFiltersProps) {

  return (
    <div className={styles.filters}>
      <input
        type="search"
        placeholder="Search logs..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.search}
      />
      <select
        value={level}
        onChange={(e) => onLevelChange(e.target.value)}
        className={styles.select}
      >
        <option value="">All levels</option>
        <option value="info">Info</option>
        <option value="warning">Warning</option>
        <option value="error">Error</option>
      </select>
    </div>
  )
}
