import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import * as sass from 'sass-embedded';
import {fileURLToPath, URL} from 'node:url';
export default defineConfig({
  resolve: {dedupe: ['react', 'react-dom'], alias: {'@REACTOR_ICONS': fileURLToPath(new URL('./node_modules/@reactor/style/src/assets/figma', import.meta.url))}},
  css: {preprocessorOptions: {scss: {api: 'modern-compiler', importers: [new sass.NodePackageImporter()], silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions']}}},
  server: {host: '127.0.0.1', port: 4175, strictPort: true},
  plugins: [react()],
});
