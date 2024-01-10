import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@components', replacement: '/src/components' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@styles', replacement: '/src/styles' },
      { find: '@api', replacement: '/src/api' },
      { find: '@models', replacement: '/src/models' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@redux', replacement: '/src/redux' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@contexts', replacement: '/src/contexts' },
    ],
  },
})
