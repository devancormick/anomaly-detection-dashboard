import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import ChartDetailModal from './ChartDetailModal'

interface DataItem {
  name: string
  count: number
}

interface SeverityChartProps {
  data: DataItem[]
}

const SEVERITY_DETAILS: Record<string, string> = {
  Low: 'Minor anomalies that may not require immediate action. Monitor for patterns over time. Typically indicates slight deviations from expected behavior.',
  Medium: 'Moderate anomalies warrant attention. Review related logs and consider investigating if the pattern persists or escalates.',
  High: 'Significant anomalies requiring prompt investigation. May indicate security concerns, system degradation, or unusual activity that could impact operations.',
  Critical: 'Severe anomalies demanding immediate action. Could indicate active threats, critical failures, or urgent issues affecting system availability or security.',
}

const SEVERITY_COLORS: Record<string, string> = {
  Low: '#22c55e',
  Medium: '#f59e0b',
  High: '#ef4444',
  Critical: '#dc2626',
}

export default function SeverityChart({ data }: SeverityChartProps) {
  const [selected, setSelected] = useState<DataItem | null>(null)

  return (
    <>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
        <XAxis type="number" stroke="var(--color-text-muted)" fontSize={12} tickLine={false} />
        <YAxis
          type="category"
          dataKey="name"
          stroke="var(--color-text-muted)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          width={70}
        />
        <Tooltip
          contentStyle={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
          }}
        />
        <Bar
          dataKey="count"
          radius={[0, 4, 4, 0]}
          maxBarSize={24}
          cursor="pointer"
          onClick={(data) => data && setSelected(data as DataItem)}
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={SEVERITY_COLORS[entry.name] || 'var(--color-primary)'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    <ChartDetailModal
      isOpen={!!selected}
      onClose={() => setSelected(null)}
      title={selected ? `${selected.name} Severity: ${selected.count} alerts` : ''}
    >
      {selected && SEVERITY_DETAILS[selected.name] && (
        <p>{SEVERITY_DETAILS[selected.name]}</p>
      )}
    </ChartDetailModal>
    </>
  )
}
