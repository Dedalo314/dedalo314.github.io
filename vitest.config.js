import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: ['**/node_modules/**', '**/dist/**', '**/src/test/e2e/**'],
    setupFiles: './src/test/setup.ts',
    alias: {
      'astro:content': new URL('./src/content/config.ts', import.meta.url)
        .pathname,
    },
  },
});
