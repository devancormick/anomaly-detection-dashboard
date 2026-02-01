import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'anomaly-detection-dashboard'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'serve' ? '/' : `/${repoName}/`,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}))
