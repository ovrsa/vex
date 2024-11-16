import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/components/__tests__/setupTests.ts', // setup ファイルを指定
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});