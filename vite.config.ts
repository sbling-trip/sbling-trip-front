import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import viteImagemin from 'vite-plugin-imagemin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react(),
    viteImagemin({
      optipng: {
        optimizationLevel: 7, // PNG 최적화 수준 설정 (0-7)
      },
      pngquant: {
        quality: [0.8, 0.9], // PNG 품질 설정 (0-1)
        speed: 4, // PNG 압축 속도 설정 (1-11)
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox', // 뷰박스 제거 플러그인 활성화
          },
          {
            name: 'removeEmptyAttrs', // 빈 속성 제거 플러그인 비활성화
            active: false,
          },
        ],
      },
      webp: { quality: 75 }, // WebP 품질 설정 (0-100)
    }),
  ],
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
      { find: '@auth', replacement: '/src/auth' },
    ],
  },
})
