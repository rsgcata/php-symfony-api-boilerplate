import path from "path"
import tailwindcss from "@tailwindcss/vite"
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        watch: {
            usePolling: true,
        },
        host: true, // needed for the Docker container port mapping to work
        strictPort: true,
        port: 5173, // you can replace this port with any port
        proxy: {
            '/api': {
                target: 'http://nginx:8080',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        },
        fs: {
            strict: false,
        },
        hmr: {
            overlay: false
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    optimizeDeps: {
        force: true // Forces dependency pre-bundling
    },
})
