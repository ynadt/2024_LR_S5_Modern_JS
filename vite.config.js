import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            assets: path.resolve(__dirname, 'src/assets'),
            components: path.resolve(__dirname, 'src/components'),
            contexts: path.resolve(__dirname, 'src/contexts'),
            data: path.resolve(__dirname, 'src/data'),
            pages: path.resolve(__dirname, 'src/pages'),
            services: path.resolve(__dirname, 'src/services'),
            src: path.resolve(__dirname, 'src'),
            hooks: path.resolve(__dirname, 'src/hooks'),
        },
    },
});
