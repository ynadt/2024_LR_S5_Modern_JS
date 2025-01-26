import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    build: {
        sourcemap: true,
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setupTests.tsx',
        // include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
        coverage: {
            all: false,
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: ['tests/**/*', '**/__tests__/**', '**/*.test.{ts,tsx}'],
        },
    },
});
