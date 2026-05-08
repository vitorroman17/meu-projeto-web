import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        produtos: path.resolve(__dirname, "produtos.html"),
        contato: path.resolve(__dirname, "contato.html"),
      },
    },
  },
});
