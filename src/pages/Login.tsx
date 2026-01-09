import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import styles from './Login.module.css'

export default function Login() {
  const [email, setEmail] = useState('admin@demo.com')
  const [password, setPassword] = useState('demo123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (isAuthenticated) return <Navigate to="/" replace />

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const success = await login(email, password)
      if (success) navigate('/')
      else setError('Invalid credentials. Try admin@demo.com / demo123')
    } catch {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Anomaly Detection Dashboard</h1>
        <p className={styles.subtitle}>Sign in to access the dashboard</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className={styles.hint}>Use any email/password to sign in (demo)</p>
      </div>
    </div>
  )
}
