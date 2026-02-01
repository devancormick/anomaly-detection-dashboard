export interface LogEntry {
  id: string
  timestamp: string
  level: 'info' | 'warning' | 'error'
  message: string
  source: string
  isAnomaly: boolean
}

export interface AnomalyAlert {
  id: string
  timestamp: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  logId: string
  resolved: boolean
}

export interface ModelMetrics {
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  lastUpdated: string
}

export interface AnomalyTrend {
  date: string
  count: number
  severity: string
}

const generateMockLogs = (): LogEntry[] => {
  const levels: LogEntry['level'][] = ['info', 'warning', 'error']
  const sources = ['auth-service', 'api-gateway', 'ml-pipeline', 'database']
  const messages = [
    'User login successful',
    'Connection timeout',
    'Database query executed',
    'Anomaly detected in log pattern',
    'Rate limit exceeded',
    'Cache miss',
    'Request processed',
  ]
  const logs: LogEntry[] = []
  for (let i = 0; i < 100; i++) {
    const level = levels[Math.floor(Math.random() * levels.length)]
    const isAnomaly = Math.random() > 0.9
    logs.push({
      id: `log-${i + 1}`,
      timestamp: new Date(Date.now() - i * 60000).toISOString(),
      level,
      message: messages[Math.floor(Math.random() * messages.length)],
      source: sources[Math.floor(Math.random() * sources.length)],
      isAnomaly: isAnomaly || (level === 'error' && Math.random() > 0.5),
    })
  }
  return logs.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
}

const generateMockAlerts = (): AnomalyAlert[] => [
  { id: '1', timestamp: new Date().toISOString(), severity: 'high', message: 'Unusual spike in error rate', logId: 'log-1', resolved: false },
  { id: '2', timestamp: new Date(Date.now() - 3600000).toISOString(), severity: 'medium', message: 'Anomalous login pattern detected', logId: 'log-5', resolved: true },
  { id: '3', timestamp: new Date(Date.now() - 7200000).toISOString(), severity: 'critical', message: 'Multiple failed authentication attempts', logId: 'log-12', resolved: false },
]

const mockLogs = generateMockLogs()
const mockAlerts = generateMockAlerts()

export const api = {
  async getLogs(page = 1, limit = 20, search = '', level = ''): Promise<{ logs: LogEntry[]; total: number }> {
    await new Promise((r) => setTimeout(r, 300))
    let filtered = [...mockLogs]
    if (search) {
      filtered = filtered.filter((l) =>
        l.message.toLowerCase().includes(search.toLowerCase()) ||
        l.source.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (level) filtered = filtered.filter((l) => l.level === level)
    const total = filtered.length
    const start = (page - 1) * limit
    const logs = filtered.slice(start, start + limit)
    return { logs, total }
  },

  async getAlerts(): Promise<AnomalyAlert[]> {
    await new Promise((r) => setTimeout(r, 200))
    return mockAlerts
  },

  async getModelMetrics(): Promise<ModelMetrics> {
    await new Promise((r) => setTimeout(r, 200))
    return {
      accuracy: 0.94,
      precision: 0.91,
      recall: 0.89,
      f1Score: 0.9,
      lastUpdated: new Date().toISOString(),
    }
  },

  async getAnomalyTrend(days = 7): Promise<AnomalyTrend[]> {
    await new Promise((r) => setTimeout(r, 200))
    return Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
      count: Math.floor(Math.random() * 20) + 1,
      severity: ['low', 'medium', 'high'][i % 3],
    })).reverse()
  },

  async getLogLevelDistribution(): Promise<{ name: string; value: number; fill: string }[]> {
    await new Promise((r) => setTimeout(r, 200))
    const counts = { info: 0, warning: 0, error: 0 }
    mockLogs.forEach((l) => { counts[l.level]++ })
    return [
      { name: 'Info', value: counts.info, fill: '#22c55e' },
      { name: 'Warning', value: counts.warning, fill: '#f59e0b' },
      { name: 'Error', value: counts.error, fill: '#ef4444' },
    ]
  },

  async getSeverityDistribution(): Promise<{ name: string; count: number }[]> {
    await new Promise((r) => setTimeout(r, 200))
    const counts = { low: 0, medium: 0, high: 0, critical: 0 }
    mockAlerts.forEach((a) => { counts[a.severity]++ })
    return [
      { name: 'Low', count: counts.low },
      { name: 'Medium', count: counts.medium },
      { name: 'High', count: counts.high },
      { name: 'Critical', count: counts.critical },
    ]
  },

  async getSourceDistribution(): Promise<{ name: string; count: number }[]> {
    await new Promise((r) => setTimeout(r, 200))
    const counts: Record<string, number> = {}
    mockLogs.forEach((l) => { counts[l.source] = (counts[l.source] || 0) + 1 })
    return Object.entries(counts).map(([name, count]) => ({ name, count }))
  },

  getRealtimeLogs(callback: (log: LogEntry) => void): () => void {
    const interval = setInterval(() => {
      const levels: LogEntry['level'][] = ['info', 'warning', 'error']
      const sources = ['auth-service', 'api-gateway', 'ml-pipeline']
      const messages = ['New log entry', 'Event processed', 'Check completed']
      if (Math.random() > 0.7) {
        callback({
          id: `realtime-${Date.now()}`,
          timestamp: new Date().toISOString(),
          level: levels[Math.floor(Math.random() * 3)],
          message: messages[Math.floor(Math.random() * 3)],
          source: sources[Math.floor(Math.random() * 3)],
          isAnomaly: Math.random() > 0.95,
        })
      }
    }, 2000)
    return () => { clearInterval(interval) }
  },
}
