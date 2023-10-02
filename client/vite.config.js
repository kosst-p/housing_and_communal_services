import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

export default defineConfig( {
    root: `${ __dirname }/src`,
    server: {
        port: 8080
    },
    plugins: [
        react(),
        eslint(),
        checker( {
            typescript: true,
        } ),
    ],
    build: {
        outDir: `${ __dirname }/dist`,
    },
} );
