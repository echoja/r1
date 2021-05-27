import { nodeResolve } from "@rollup/plugin-node-resolve";
// import typescript from '@rollup/plugin-typescript';
import alias from "@rollup/plugin-alias";
import path from "path";

module.exports = {
  // input: "./src/index.ts",
  input: "build/server/src/index.js",
  output: {
    dir: "bundle",
    format: "cjs",
    sourcemap: true,
  },
  external: ["express", "connect-history-api-fallback"],
  plugins: [
    // typescript(),
    alias({
      entries: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "build/server/src/"),
        },
      ],
    }),
    nodeResolve(),
  ],
};
