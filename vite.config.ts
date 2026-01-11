import { defineConfig } from "vite";
import fs from "fs";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const isDev = process.env.ENV === "DEVELOPMENT";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  server: {
    ...(!isDev
      ? {}
      : {
          https: {
            key: fs.readFileSync("./cert/key.pem"),
            cert: fs.readFileSync("./cert/cert.pem"),
          },
        }),
    port: 5174,
  },
});
