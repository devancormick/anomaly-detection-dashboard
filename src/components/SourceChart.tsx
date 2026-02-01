import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface DataItem {
  name: string
  count: number
}

interface SourceChartProps {
  data: DataItem[]
}

export default function SourceChart({ data }: SourceChartProps) {
  const displayData = data.map((d) => ({
    ...d,
    shortName: d.name.replace(/-/g, ' '),
  }))

  return (
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
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
