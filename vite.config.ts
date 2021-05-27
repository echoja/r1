import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  root: path.resolve(__dirname, './client'),
  base: '/app/',
  publicDir: 'public',
  server: {
    port: 29537,
  },
  define: {},

  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './client/src')
      }
    ]
  }
});