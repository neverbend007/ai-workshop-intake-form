import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { Plugin } from 'vite';

// Custom plugin to inject the config script
const injectConfigScript = (): Plugin => {
  return {
    name: 'inject-config-script',
    transformIndexHtml(html) {
      return html.replace(
        '</head>', 
        '<script src="/config.js"></script></head>'
      );
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    injectConfigScript(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));