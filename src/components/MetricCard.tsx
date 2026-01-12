import styles from './MetricCard.module.css'

interface MetricCardProps {
  label: string
  value: string
}

export default function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  )
}
