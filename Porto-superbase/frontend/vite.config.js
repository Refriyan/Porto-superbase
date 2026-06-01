import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    target: "esnext",
    chunkSizeWarningLimit: 1000,
    // Minify CSS
    cssMinify: true,
    // Minify JS
    minify: "esbuild",
    rollupOptions: {
      output: {
        // Hash di nama file = cache busting otomatis
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
        manualChunks: {
          "vendor-react":    ["react", "react-dom", "react-router-dom"],
          "vendor-supabase": ["@supabase/supabase-js"],
          "vendor-three":    ["three", "@react-three/fiber", "@react-three/drei", "@react-three/rapier"],
          "vendor-motion":   ["framer-motion"],
          "vendor-gsap":     ["gsap"],
          "vendor-icons":    ["react-icons"],
        }
      }
    }
  },

  server: { hmr: true },
})
