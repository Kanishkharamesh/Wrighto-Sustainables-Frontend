import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'https://wrighto-sustainables-backend.onrender.com', // ✅ your backend server URL
                changeOrigin: true,
                secure: false,
            },
        },
    },
    build: {
        sourcemap: false,
    },
})

