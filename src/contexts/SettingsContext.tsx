import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface AppSettings {
  apiEndpoint: string
  refreshInterval: number
  notifications: boolean
}

const DEFAULT_SETTINGS: AppSettings = {
  apiEndpoint: 'https://api.example.com/v1',
  refreshInterval: 30,
  notifications: true,
}

const STORAGE_KEY = 'dashboard_settings'

interface SettingsContextType {
  settings: AppSettings
  saveSettings: (s: Partial<AppSettings>) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) }
      }
    } catch {
      // ignore parse errors
    }
    return DEFAULT_SETTINGS
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const saveSettings = (updates: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }))
  }

  return (
    <SettingsContext.Provider value={{ settings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider')
  return ctx
}
