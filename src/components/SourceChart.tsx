import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import ChartDetailModal from './ChartDetailModal'

interface DataItem {
  name: string
  count: number
}

interface SourceChartProps {
  data: DataItem[]
}

const SOURCE_DETAILS: Record<string, string> = {
  'auth-service': 'Authentication and authorization service logs. Includes login attempts, token validation, session management, and access control events.',
  'api-gateway': 'API gateway and request routing logs. Tracks incoming requests, rate limiting, routing decisions, and gateway-level errors.',
  'ml-pipeline': 'Machine learning pipeline and model inference logs. Captures feature extraction, model predictions, anomaly scores, and pipeline execution events.',
  'database': 'Database connection and query logs. Includes connection pool status, query execution, transactions, and database-level errors.',
}

export default function SourceChart({ data }: SourceChartProps) {
  const [selected, setSelected] = useState<DataItem | null>(null)
  const displayData = data.map((d) => ({
    ...d,
    shortName: d.name.replace(/-/g, ' '),
  }))

  return (
    <>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={displayData} margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis
          dataKey="shortName"
          stroke="var(--color-text-muted)"
          fontSize={11}
          tickLine={false}
          interval={0}
        />
        <YAxis stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
          }}
          formatter={(value: number) => [value, 'Logs']}
        />
        <Bar
          dataKey="count"
          fill="var(--color-primary)"
          radius={[4, 4, 0, 0]}
          maxBarSize={40}
          cursor="pointer"
          onClick={(data) => data && setSelected(data as DataItem)}
        />
      </BarChart>
    </ResponsiveContainer>
    <ChartDetailModal
      isOpen={!!selected}
      onClose={() => setSelected(null)}
      title={selected ? `${selected.name}: ${selected.count} logs` : ''}
    >
      {selected && (
        <p>{SOURCE_DETAILS[selected.name] ?? `Logs from ${selected.name}. ${selected.count} log entries were captured from this source.`}</p>
      )}
    </ChartDetailModal>
    </>
  )
}
