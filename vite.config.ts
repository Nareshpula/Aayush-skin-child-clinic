import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
     output: {
       manualChunks: {
         'vendor': ['react', 'react-dom', 'react-router-dom'],
         'ui': ['framer-motion', 'lucide-react'],
         'utils': ['@supabase/supabase-js'],
         'appointment': ['@emailjs/browser'],
       }
     }
    },
    outDir: 'dist',
    emptyOutDir: true,
    copyPublicDir: true,
   cssCodeSplit: true,
   sourcemap: false,
   minify: 'terser',
   terserOptions: {
     compress: {
       drop_console: true,
       drop_debugger: true
     },
     format: {
       comments: false
     }
   },
   reportCompressedSize: false
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', '@supabase/supabase-js'],
    exclude: []
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    }
  }
});
