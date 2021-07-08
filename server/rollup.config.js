import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import alias from "@rollup/plugin-alias";
import path from "path";

module.exports = {
  // input: "./src/index.ts",
  input: "build/server/src/index.js",
  output: {
    dir: "bundle",
    format: "cjs",
    sourcemap: true,
    exports: "default",
  },
  external: ["express", "connect-history-api-fallback", "cross-env", "dotenv", "tedious", "xlsx"],
  plugins: [
    commonjs(),
    alias({
      entries: [
        {
          find: "@const",
          replacement: path.resolve(__dirname, "build/const.js"),
        },
        {
          find: "@",
          replacement: path.resolve(__dirname, "build/server/src/"),
        },
      ],
    }),
    nodeResolve(),
  ],
};
