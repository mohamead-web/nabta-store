import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// PWA معطل مؤقتًا لتفادي الكراش والكاش
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // يساعدنا في تتبع الأخطاء لو ظهرت
  },
})
