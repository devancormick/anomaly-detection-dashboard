import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface Toast {
  id: string
  message: string
  severity: 'info' | 'warning' | 'error'
}

interface NotificationContextType {
  unreadCount: number
  toasts: Toast[]
  addUnread: () => void
  clearUnread: () => void
  showToast: (message: string, severity?: Toast['severity']) => void
  dismissToast: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0)
  const [toasts, setToasts] = useState<Toast[]>([])

  const addUnread = useCallback(() => {
    setUnreadCount((c) => c + 1)
  }, [])

  const clearUnread = useCallback(() => {
    setUnreadCount(0)
  }, [])

  const showToast = useCallback((message: string, severity: Toast['severity'] = 'info') => {
    const id = `toast-${Date.now()}`
    setToasts((prev) => [...prev, { id, message, severity }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <NotificationContext.Provider
      value={{ unreadCount, toasts, addUnread, clearUnread, showToast, dismissToast }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider')
  return ctx
}
