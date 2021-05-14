import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  root: './client',
  publicDir: './client/public',
  server: {
    port: 29537,
  },
  define: {},
});