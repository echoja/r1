import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import styleImport from "vite-plugin-style-import";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // styleImport({
    //   libs: [
    //     {
    //       libraryName: "element-plus",
    //       esModule: true,
    //       ensureStyleFile: true,
    //       resolveStyle: (name) => {
    //         name = name.slice(3);
    //         return `element-plus/packages/theme-chalk/src/${name}.scss`;
    //       },
    //       resolveComponent: (name) => {
    //         return `element-plus/lib/${name}`;
    //       },
    //     },
    //   ],
    // }),
  ],
  base: "/app/",
  publicDir: "public",
  server: {
    port: 29537,
    proxy: {
      '/api': {
        target: 'http://58.234.162.208:29540',
        changeOrigin: true,
      },
    },
  },
  define: {},

  resolve: {
    alias: [
      {
        find: "@/",
        replacement: `${path.resolve(__dirname, "./src")}/`,
      },
      {
        find: "@type",
        replacement: path.resolve(__dirname, "../type"),
      },
      {
        find: "@const",
        replacement: path.resolve(__dirname, "../const"),
      },
      {
        find: "~element-plus",
        replacement: path.resolve(__dirname, "./node_modules/element-plus"),
      },
    ],
  },
});
