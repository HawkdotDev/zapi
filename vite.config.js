import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  // build: {
  //   outDir: "dist", // <- where the final extension will live
  //   rollupOptions: {
  //     input: {
  //       content: resolve(new URL("src/utils/content.js", import.meta.url).pathname),
  //       background: resolve(
  //         new URL("src/utils/background.js", import.meta.url).pathname
  //       ),
  //       // optional popup window or dev tools:
  //       // popup: resolve(__dirname, 'src/popup/index.html')
  //     },
  //     output: {
  //       entryFileNames: "[name].js", // <- keep clean names: content.js, background.js
  //       chunkFileNames: "assets/[name]-[hash].js", // <- where shared code goes
  //       assetFileNames: "assets/[name]-[hash][extname]", // <- for images, fonts, etc.
  //     },
  //   },
  // },
});
