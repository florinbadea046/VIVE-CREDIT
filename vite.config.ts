import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@core": path.resolve(__dirname, "src/core"),
      "@modules": path.resolve(__dirname, "src/modules"),
      "@types": path.resolve(__dirname, "src/types"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@store": path.resolve(__dirname, "src/store"),
      "@services": path.resolve(__dirname, "src/services"),
      "@utils": path.resolve(__dirname, "src/core/utils"),
    },
  },
});
