import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'comps': path.resolve(__dirname, './src/components'),
      'features': path.resolve(__dirname, './src/features'),
      'hooks': path.resolve(__dirname, './src/hooks'),
      'store': path.resolve(__dirname, './src/store'),
      'styles': path.resolve(__dirname, './src/styles'),
      'utils': path.resolve(__dirname, './src/utils'),
      'pages': path.resolve(__dirname, './src/pages'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/styles/_variables.scss" as *; @use "src/styles/_mixins.scss" as *;`
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  define: {
    'process.env': process.env
  }
})
