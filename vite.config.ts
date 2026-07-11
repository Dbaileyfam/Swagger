import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Project Pages URL: https://dbaileyfam.github.io/Swagger/
  base: command === 'build' ? '/Swagger/' : '/',
}))
