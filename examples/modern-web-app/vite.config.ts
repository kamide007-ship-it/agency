import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['@babel/plugin-transform-runtime'],
      },
    }),
    // Bundle visualizer for analyzing chunk sizes
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html',
    }),
  ],

  // Server config for development
  server: {
    port: 5173,
    strictPort: false,
    open: true,
  },

  // Build optimization
  build: {
    // Output directory
    outDir: 'dist',
    assetsDir: 'assets',

    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      mangle: true,
    },

    // Code splitting strategy
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation': ['framer-motion'],
        },
        // Asset naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|gif|svg/.test(ext)) {
            return `images/[name]-[hash][extname]`;
          } else if (/woff|woff2|eot|ttf|otf/.test(ext)) {
            return `fonts/[name]-[hash][extname]`;
          } else if (ext === 'css') {
            return `css/[name]-[hash][extname]`;
          }
          return `[name]-[hash][extname]`;
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
      },
    },

    // Performance thresholds
    chunkSizeWarningLimit: 500,
    reportCompressedSize: true,

    // Source maps only in development
    sourcemap: false,

    // Target environment
    target: 'esnext',

    // Commonjs globals
    commonjsOptions: {
      ignoreTryCatch: true,
    },
  },

  // Optimization settings
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
    exclude: ['@vite/client'],
  },

  // CSS options
  css: {
    postcss: './postcss.config.js',
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/variables.scss";`,
      },
    },
  },

  // JSON modules
  json: {
    stringify: false,
  },
});
