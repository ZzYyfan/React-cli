import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.scss', '.css'],
    alias: {
      '@': join(__dirname, './src')
    }
  },
  plugins: [react()]
})
