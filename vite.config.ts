import path from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, 'src/api'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@providers': path.resolve(__dirname, 'src/providers'),
      '@queries': path.resolve(__dirname, 'src/queries'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@utils': path.resolve(__dirname, 'src/utils')
    }
  }
})
