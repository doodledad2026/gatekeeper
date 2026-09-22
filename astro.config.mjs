import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://expertedge-zeta.vercel.app",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
});
