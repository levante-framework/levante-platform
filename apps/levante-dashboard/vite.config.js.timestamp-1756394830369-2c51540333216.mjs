// vite.config.js
import { sentryVitePlugin } from "file:///Users/flavio.conte/Documents/teste/levante-platform/node_modules/@sentry/vite-plugin/dist/esm/index.mjs";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "file:///Users/flavio.conte/Documents/teste/levante-platform/node_modules/vite/dist/node/index.js";
import Vue from "file:///Users/flavio.conte/Documents/teste/levante-platform/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import mkcert from "file:///Users/flavio.conte/Documents/teste/levante-platform/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
import { nodePolyfills } from "file:///Users/flavio.conte/Documents/teste/levante-platform/node_modules/vite-plugin-node-polyfills/dist/index.js";
import UnheadVite from "file:///Users/flavio.conte/Documents/teste/levante-platform/node_modules/@unhead/addons/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///Users/flavio.conte/Documents/teste/levante-platform/apps/levante-dashboard/vite.config.js";
var commitHash = "unknown";
try {
  commitHash = execSync("git rev-parse --short HEAD").toString().trim();
} catch (e) {
  console.warn("Git hash not available");
}
var vite_config_default = defineConfig({
  define: {
    "import.meta.env.VITE_APP_VERSION": JSON.stringify(commitHash),
    "import.meta.env.VITE_LEVANTE": JSON.stringify("TRUE")
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/]
    }),
    nodePolyfills({
      globals: {
        process: true
      }
    }),
    UnheadVite(),
    ...process.env.NODE_ENV === "development" && process.env.CI !== "true" ? [mkcert()] : [],
    ...process.env.NODE_ENV !== "development" ? [
      sentryVitePlugin({
        org: "levante-framework",
        project: "dashboard"
      })
    ] : []
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    fs: {
      allow: [".."]
    }
  },
  build: {
    cssCodeSplit: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ["lodash"],
          tanstack: ["@tanstack/vue-query"],
          chartJs: ["chart.js"],
          sentry: ["@sentry/browser", "@sentry/integrations", "@sentry/vue"],
          phoneme: ["@bdelab/roar-pa"],
          sre: ["@bdelab/roar-sre"],
          swr: ["@bdelab/roar-swr"],
          utils: ["@bdelab/roar-utils"]
        }
      }
    }
  },
  optimizeDeps: {
    holdUntilCrawlEnd: false,
    include: [
      "@levante-framework/firekit",
      "primevue"
    ],
    exclude: process.env.CI === "true" ? ["@tanstack/vue-query-devtools"] : [],
    esbuildOptions: {
      mainFields: ["module", "main"],
      resolveExtensions: [".js", ".mjs", ".cjs"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZmxhdmlvLmNvbnRlL0RvY3VtZW50cy90ZXN0ZS9sZXZhbnRlLXBsYXRmb3JtL2FwcHMvbGV2YW50ZS1kYXNoYm9hcmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9mbGF2aW8uY29udGUvRG9jdW1lbnRzL3Rlc3RlL2xldmFudGUtcGxhdGZvcm0vYXBwcy9sZXZhbnRlLWRhc2hib2FyZC92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZmxhdmlvLmNvbnRlL0RvY3VtZW50cy90ZXN0ZS9sZXZhbnRlLXBsYXRmb3JtL2FwcHMvbGV2YW50ZS1kYXNoYm9hcmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBzZW50cnlWaXRlUGx1Z2luIH0gZnJvbSAnQHNlbnRyeS92aXRlLXBsdWdpbic7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICd1cmwnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgVnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgbWtjZXJ0IGZyb20gJ3ZpdGUtcGx1Z2luLW1rY2VydCc7XG5pbXBvcnQgeyBub2RlUG9seWZpbGxzIH0gZnJvbSAndml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMnO1xuaW1wb3J0IFVuaGVhZFZpdGUgZnJvbSAnQHVuaGVhZC9hZGRvbnMvdml0ZSc7XG5pbXBvcnQgKiBhcyBjaGlsZCBmcm9tICdjaGlsZF9wcm9jZXNzJztcblxubGV0IGNvbW1pdEhhc2ggPSAndW5rbm93bic7XG50cnkge1xuICBjb21taXRIYXNoID0gZXhlY1N5bmMoJ2dpdCByZXYtcGFyc2UgLS1zaG9ydCBIRUFEJykudG9TdHJpbmcoKS50cmltKCk7XG59IGNhdGNoIChlKSB7XG4gIGNvbnNvbGUud2FybignR2l0IGhhc2ggbm90IGF2YWlsYWJsZScpO1xufVxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgZGVmaW5lOiB7XG4gICAgJ2ltcG9ydC5tZXRhLmVudi5WSVRFX0FQUF9WRVJTSU9OJzogSlNPTi5zdHJpbmdpZnkoY29tbWl0SGFzaCksXG4gICAgJ2ltcG9ydC5tZXRhLmVudi5WSVRFX0xFVkFOVEUnOiBKU09OLnN0cmluZ2lmeSgnVFJVRScpLFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgVnVlKHtcbiAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC5tZCQvXSxcbiAgICB9KSxcbiAgICBub2RlUG9seWZpbGxzKHtcbiAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgcHJvY2VzczogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgVW5oZWFkVml0ZSgpLFxuICAgIC4uLihwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyAmJiBwcm9jZXNzLmVudi5DSSAhPT0gJ3RydWUnID8gW21rY2VydCgpXSA6IFtdKSxcbiAgICAuLi4ocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdkZXZlbG9wbWVudCdcbiAgICAgID8gW1xuICAgICAgICAgIHNlbnRyeVZpdGVQbHVnaW4oe1xuICAgICAgICAgICAgb3JnOiAnbGV2YW50ZS1mcmFtZXdvcmsnLFxuICAgICAgICAgICAgcHJvamVjdDogJ2Rhc2hib2FyZCcsXG4gICAgICAgICAgfSksXG4gICAgICAgIF1cbiAgICAgIDogW10pLFxuICBdLFxuXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcblxuICBzZXJ2ZXI6IHtcbiAgICBmczoge1xuICAgICAgYWxsb3c6IFsnLi4nXSxcbiAgICB9LFxuICB9LFxuXG4gIGJ1aWxkOiB7XG4gICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgbG9kYXNoOiBbJ2xvZGFzaCddLFxuICAgICAgICAgIHRhbnN0YWNrOiBbJ0B0YW5zdGFjay92dWUtcXVlcnknXSxcbiAgICAgICAgICBjaGFydEpzOiBbJ2NoYXJ0LmpzJ10sXG4gICAgICAgICAgc2VudHJ5OiBbJ0BzZW50cnkvYnJvd3NlcicsICdAc2VudHJ5L2ludGVncmF0aW9ucycsICdAc2VudHJ5L3Z1ZSddLFxuICAgICAgICAgIHBob25lbWU6IFsnQGJkZWxhYi9yb2FyLXBhJ10sXG4gICAgICAgICAgc3JlOiBbJ0BiZGVsYWIvcm9hci1zcmUnXSxcbiAgICAgICAgICBzd3I6IFsnQGJkZWxhYi9yb2FyLXN3ciddLFxuICAgICAgICAgIHV0aWxzOiBbJ0BiZGVsYWIvcm9hci11dGlscyddLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBob2xkVW50aWxDcmF3bEVuZDogZmFsc2UsXG4gICAgaW5jbHVkZTogW1xuICAgICAgJ0BsZXZhbnRlLWZyYW1ld29yay9maXJla2l0JyxcbiAgICAgICdwcmltZXZ1ZSdcbiAgICBdLFxuICAgIGV4Y2x1ZGU6IHByb2Nlc3MuZW52LkNJID09PSAndHJ1ZScgPyBbJ0B0YW5zdGFjay92dWUtcXVlcnktZGV2dG9vbHMnXSA6IFtdLFxuICAgIGVzYnVpbGRPcHRpb25zOiB7XG4gICAgICBtYWluRmllbGRzOiBbJ21vZHVsZScsICdtYWluJ10sXG4gICAgICByZXNvbHZlRXh0ZW5zaW9uczogWycuanMnLCAn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
