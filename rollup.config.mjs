import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const plugins = () => [nodeResolve(), commonjs()];

export default [
  {
    input: "src/wtc-barfystars.js",
    plugins: plugins(),
    output: [
      { file: "dist/wtc-barfystars.js", format: "cjs", exports: "named", sourcemap: true },
      { file: "dist/wtc-barfystars.module.js", format: "es", sourcemap: true },
      { file: "dist/wtc-barfystars.modern.mjs", format: "es", sourcemap: true },
      { file: "dist/wtc-barfystars.umd.js", format: "umd", exports: "named", name: "wtcBarfystars", sourcemap: true },
    ],
  },
  {
    input: "src/react/index.js",
    external: ["react"],
    plugins: plugins(),
    output: [
      { file: "dist/react/index.js", format: "cjs", exports: "named", banner: '"use client";', sourcemap: true },
      { file: "dist/react/index.mjs", format: "es", banner: '"use client";', sourcemap: true },
    ],
    onwarn(warning, warn) {
      if (warning.code === "MODULE_LEVEL_DIRECTIVE" && warning.message.includes("use client")) return;
      warn(warning);
    },
  },
];
