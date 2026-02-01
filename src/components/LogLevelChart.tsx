import { useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import ChartDetailModal from './ChartDetailModal'

interface DataItem {
  name: string
  value: number
  fill: string
}

interface LogLevelChartProps {
  data: DataItem[]
}

const LEVEL_DETAILS: Record<string, string> = {
  Info: 'Informational log entries indicating normal system operation. These typically include successful operations, status updates, and general flow tracking. No action required.',
  Warning: 'Log entries signaling potential issues or unusual conditions that may need attention. Warnings often precede errors and can help with proactive monitoring.',
  Error: 'Log entries indicating failures or exceptions. These require investigation and may impact system functionality. Errors are prioritized in anomaly detection.',
}

export default function LogLevelChart({ data }: LogLevelChartProps) {
  const [selected, setSelected] = useState<DataItem | null>(null)
  const filtered = data.filter((d) => d.value > 0)
  if (filtered.length === 0) return null

  return (
    <>
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={filtered}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          onClick={(data) => data && setSelected(data as DataItem)}
          cursor="pointer"
        >
          {filtered.map((entry, index) => (
            <Cell key={index} fill={entry.fill} stroke="var(--color-bg-card)" strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
          }}
          formatter={(value: number) => [value, 'Logs']}
        />
        <Legend
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
          formatter={(value, entry) => {
            const payload = entry?.payload as DataItem | undefined
            return (
              <span style={{ color: 'var(--color-text)' }}>
                {value}: {payload?.value ?? 0}
              </span>
            )
          }}
        />
      </PieChart>
    </ResponsiveContainer>
    <ChartDetailModal
      isOpen={!!selected}
      onClose={() => setSelected(null)}
      title={selected ? `${selected.name} Logs: ${selected.value}` : ''}
    >
      {selected && LEVEL_DETAILS[selected.name] && (
        <p>{LEVEL_DETAILS[selected.name]}</p>
      )}
    </ChartDetailModal>
    </>
  )
}
