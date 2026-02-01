import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

interface DataItem {
  name: string
  value: number
  fill: string
}

interface LogLevelChartProps {
  data: DataItem[]
}

export default function LogLevelChart({ data }: LogLevelChartProps) {
  const filtered = data.filter((d) => d.value > 0)
  if (filtered.length === 0) return null

  return (
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
  )
}
