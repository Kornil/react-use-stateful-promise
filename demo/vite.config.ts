import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  root: resolve(__dirname),
  plugins: react({
    babel: {
      plugins: [["babel-plugin-react-compiler"]],
    },
  }),
  base: "/react-use-stateful-promise/",
  build: {
    lib: {
      entry: resolve(__dirname, 'main.tsx'),
      formats: ['es']
    },
    outDir: "../dist-demo",
  },
});
