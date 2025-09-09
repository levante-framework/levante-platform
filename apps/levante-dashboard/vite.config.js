import { sentryVitePlugin } from '@sentry/vite-plugin';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import mkcert from 'vite-plugin-mkcert';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import UnheadVite from '@unhead/addons/vite';
import * as child from 'child_process';
import { readFileSync } from 'fs';

let commitHash = 'unknown';
try {
  commitHash = child.execSync('git rev-parse --short HEAD').toString().trim();
} catch (e) {
  console.warn('Git hash not available');
}

let roarSreVersion = 'unknown';
try {
  const pkgPath = require.resolve('@bdelab/roar-sre/package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  roarSreVersion = pkg.version;
} catch (e) {
  console.warn('Could not read version from @bdelab/roar-sre');
}

export default defineConfig({
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(commitHash),
    'import.meta.env.VITE_LEVANTE': JSON.stringify('TRUE'),
    'import.meta.env.VITE_ROAR_SRE_VERSION': JSON.stringify(roarSreVersion),
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    nodePolyfills({
      globals: {
        process: true,
      },
    }),
    UnheadVite(),
    ...(process.env.NODE_ENV === 'development' && process.env.CI !== 'true' ? [mkcert()] : []),
    ...(process.env.NODE_ENV !== 'development'
      ? [
          sentryVitePlugin({
            org: 'levante-framework',
            project: 'dashboard',
          }),
        ]
      : []),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    fs: {
      allow: ['..'],
    },
  },

  build: {
    cssCodeSplit: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ['lodash'],
          tanstack: ['@tanstack/vue-query'],
          chartJs: ['chart.js'],
          sentry: ['@sentry/browser', '@sentry/integrations', '@sentry/vue'],
          phoneme: ['@bdelab/roar-pa'],
          sre: ['@bdelab/roar-sre'],
          swr: ['@bdelab/roar-swr'],
          utils: ['@bdelab/roar-utils'],
        },
      },
    },
  },

  optimizeDeps: {
    holdUntilCrawlEnd: false,
    include: ['@levante-framework/firekit', 'primevue'],
    exclude: process.env.CI === 'true' ? ['@tanstack/vue-query-devtools'] : [],
    esbuildOptions: {
      mainFields: ['module', 'main'],
      resolveExtensions: ['.js', '.mjs', '.cjs'],
    },
  },
});
