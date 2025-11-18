import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  server: {
    allowedHosts: ['myfront', 'localhost', 'insightbox.com'],
    port: 3000, // 포트 번호 설정
    host: true, // 외부에서 접속 가능
    hmr: {
      host: 'insightbox.com', // 현재 접속하는 도메인
      protocol: 'ws', // HTTP면 ws, HTTPS면 wss
      port: 3000, // Vite dev 서버 포트
    },
  },
  resolve: {
    alias: {
      '@': '/src', // 절대경로로 설정 (Vite에선 '/'는 프로젝트 루트)
    },
  },
});
