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
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-supabase": ["@supabase/supabase-js"],
          "vendor-three": ["three", "@react-three/fiber", "@react-three/drei", "@react-three/rapier"],
          "vendor-motion": ["framer-motion"],
          "vendor-gsap": ["gsap"],
        }
      }
    }
  },

  // Optimize dev server
  server: {
    hmr: true,
  }
})