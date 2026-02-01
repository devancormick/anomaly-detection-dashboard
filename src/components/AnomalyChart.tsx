import { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Brush,
} from 'recharts'
import ChartDetailModal from './ChartDetailModal'

interface ChartPoint {
  date: string
  count: number
}

interface AnomalyChartProps {
  data: ChartPoint[]
}

export default function AnomalyChart({ data }: AnomalyChartProps) {
  const [selected, setSelected] = useState<{ date: string; label: string; count: number } | null>(null)
  const formatted = data.map((d) => ({
    ...d,
    label: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }))

  return (
    <>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={formatted} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="label" stroke="var(--color-text-muted)" fontSize={12} tickLine={false} />
        <YAxis stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
          }}
          labelStyle={{ color: 'var(--color-text)' }}
          formatter={(value: number) => [value, 'Anomalies']}
        />
        <Legend
          layout="horizontal"
          align="center"
          verticalAlign="top"
          formatter={() => <span style={{ color: 'var(--color-text-muted)' }}>Anomaly count</span>}
        />
        <Area
          type="monotone"
          dataKey="count"
          stroke="var(--color-primary)"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorCount)"
          dot={(props) => {
            const { cx, cy, payload } = props
            return (
              <circle
                key={props.index}
                cx={cx}
                cy={cy}
                r={6}
                fill="var(--color-primary)"
                stroke="var(--color-bg-card)"
                strokeWidth={2}
                style={{ cursor: 'pointer' }}
                onClick={() => payload && setSelected(payload as { date: string; label: string; count: number })}
              />
            )
          }}
          activeDot={(props) => {
            const { cx, cy, payload } = props
            return (
              <circle
                cx={cx}
                cy={cy}
                r={8}
                fill="var(--color-primary)"
                stroke="var(--color-bg-card)"
                strokeWidth={2}
                style={{ cursor: 'pointer' }}
                onClick={() => payload && setSelected(payload as { date: string; label: string; count: number })}
              />
            )
          }}
          isAnimationActive={true}
        />
        <Brush
          dataKey="label"
          height={24}
          stroke="var(--color-border)"
          fill="var(--color-bg)"
          travellerWidth={8}
        />
      </AreaChart>
    </ResponsiveContainer>
    <ChartDetailModal
      isOpen={!!selected}
      onClose={() => setSelected(null)}
      title={selected ? `${selected.label}: ${selected.count} anomalies` : ''}
    >
      {selected && (
        <>
          <p>
            <strong>Date:</strong> {new Date(selected.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p>
            <strong>Anomaly count:</strong> {selected.count} anomalies were detected on this day. 
            Spikes in anomaly counts may indicate increased system activity, emerging patterns, or potential issues requiring investigation.
          </p>
        </>
      )}
    </ChartDetailModal>
    </>
  )
}
