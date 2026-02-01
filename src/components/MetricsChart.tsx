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

interface ModelMetrics {
  accuracy: number
  precision: number
  recall: number
  f1Score: number
}

interface MetricsChartProps {
  metrics: ModelMetrics
}

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6']

export default function MetricsChart({ metrics }: MetricsChartProps) {
  const data = [
    { name: 'Accuracy', value: (metrics.accuracy * 100).toFixed(1), raw: metrics.accuracy },
    { name: 'Precision', value: (metrics.precision * 100).toFixed(1), raw: metrics.precision },
    { name: 'Recall', value: (metrics.recall * 100).toFixed(1), raw: metrics.recall },
    { name: 'F1 Score', value: (metrics.f1Score * 100).toFixed(1), raw: metrics.f1Score },
  ]

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis
          dataKey="name"
          stroke="var(--color-text-muted)"
          fontSize={12}
          tickLine={false}
        />
        <YAxis
          stroke="var(--color-text-muted)"
          fontSize={12}
          tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
          domain={[0, 1]}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
          }}
          formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Score']}
          cursor={{ fill: 'var(--color-bg)' }}
        />
        <Bar dataKey="raw" radius={[4, 4, 0, 0]} maxBarSize={48}>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
