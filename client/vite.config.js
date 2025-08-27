import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  "process.env": {},
  optimizeDeps: {
    exclude: ["@tinymce/miniature"], // Exclude it from dependency optimization
  },

  build: {
    minify: false, // Skip minification to save memory
    sourcemap: false, // Disable sourcemaps to reduce build size
    chunkSizeWarningLimit: 2000, // Increase chunk size warning threshold
  },
});
