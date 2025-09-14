var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// vite.config.js
import { sentryVitePlugin } from "file:///Users/flavio.conte/Documents/platform/levante-platform/node_modules/@sentry/vite-plugin/dist/esm/index.mjs";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "file:///Users/flavio.conte/Documents/platform/levante-platform/node_modules/vite/dist/node/index.js";
import Vue from "file:///Users/flavio.conte/Documents/platform/levante-platform/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import mkcert from "file:///Users/flavio.conte/Documents/platform/levante-platform/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
import { nodePolyfills } from "file:///Users/flavio.conte/Documents/platform/levante-platform/node_modules/vite-plugin-node-polyfills/dist/index.js";
import UnheadVite from "file:///Users/flavio.conte/Documents/platform/levante-platform/node_modules/@unhead/addons/dist/vite.mjs";
import * as child from "child_process";
import { readFileSync } from "fs";
var __vite_injected_original_import_meta_url = "file:///Users/flavio.conte/Documents/platform/levante-platform/apps/levante-dashboard/vite.config.js";
var commitHash = "unknown";
try {
  commitHash = child.execSync("git rev-parse --short HEAD").toString().trim();
} catch (e) {
  console.warn("Git hash not available");
}
var roarSreVersion = "unknown";
try {
  const pkgPath = __require.resolve("@bdelab/roar-sre/package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  roarSreVersion = pkg.version;
} catch (e) {
  console.warn("Could not read version from @bdelab/roar-sre");
}
var vite_config_default = defineConfig({
  define: {
    "import.meta.env.VITE_APP_VERSION": JSON.stringify(commitHash),
    "import.meta.env.VITE_LEVANTE": JSON.stringify("TRUE"),
    "import.meta.env.VITE_ROAR_SRE_VERSION": JSON.stringify(roarSreVersion)
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
    include: ["@levante-framework/firekit", "primevue"],
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZmxhdmlvLmNvbnRlL0RvY3VtZW50cy9wbGF0Zm9ybS9sZXZhbnRlLXBsYXRmb3JtL2FwcHMvbGV2YW50ZS1kYXNoYm9hcmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9mbGF2aW8uY29udGUvRG9jdW1lbnRzL3BsYXRmb3JtL2xldmFudGUtcGxhdGZvcm0vYXBwcy9sZXZhbnRlLWRhc2hib2FyZC92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZmxhdmlvLmNvbnRlL0RvY3VtZW50cy9wbGF0Zm9ybS9sZXZhbnRlLXBsYXRmb3JtL2FwcHMvbGV2YW50ZS1kYXNoYm9hcmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBzZW50cnlWaXRlUGx1Z2luIH0gZnJvbSAnQHNlbnRyeS92aXRlLXBsdWdpbic7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICd1cmwnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgVnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgbWtjZXJ0IGZyb20gJ3ZpdGUtcGx1Z2luLW1rY2VydCc7XG5pbXBvcnQgeyBub2RlUG9seWZpbGxzIH0gZnJvbSAndml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMnO1xuaW1wb3J0IFVuaGVhZFZpdGUgZnJvbSAnQHVuaGVhZC9hZGRvbnMvdml0ZSc7XG5pbXBvcnQgKiBhcyBjaGlsZCBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ2ZzJztcblxubGV0IGNvbW1pdEhhc2ggPSAndW5rbm93bic7XG50cnkge1xuICBjb21taXRIYXNoID0gY2hpbGQuZXhlY1N5bmMoJ2dpdCByZXYtcGFyc2UgLS1zaG9ydCBIRUFEJykudG9TdHJpbmcoKS50cmltKCk7XG59IGNhdGNoIChlKSB7XG4gIGNvbnNvbGUud2FybignR2l0IGhhc2ggbm90IGF2YWlsYWJsZScpO1xufVxuXG5sZXQgcm9hclNyZVZlcnNpb24gPSAndW5rbm93bic7XG50cnkge1xuICBjb25zdCBwa2dQYXRoID0gcmVxdWlyZS5yZXNvbHZlKCdAYmRlbGFiL3JvYXItc3JlL3BhY2thZ2UuanNvbicpO1xuICBjb25zdCBwa2cgPSBKU09OLnBhcnNlKHJlYWRGaWxlU3luYyhwa2dQYXRoLCAndXRmOCcpKTtcbiAgcm9hclNyZVZlcnNpb24gPSBwa2cudmVyc2lvbjtcbn0gY2F0Y2ggKGUpIHtcbiAgY29uc29sZS53YXJuKCdDb3VsZCBub3QgcmVhZCB2ZXJzaW9uIGZyb20gQGJkZWxhYi9yb2FyLXNyZScpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBkZWZpbmU6IHtcbiAgICAnaW1wb3J0Lm1ldGEuZW52LlZJVEVfQVBQX1ZFUlNJT04nOiBKU09OLnN0cmluZ2lmeShjb21taXRIYXNoKSxcbiAgICAnaW1wb3J0Lm1ldGEuZW52LlZJVEVfTEVWQU5URSc6IEpTT04uc3RyaW5naWZ5KCdUUlVFJyksXG4gICAgJ2ltcG9ydC5tZXRhLmVudi5WSVRFX1JPQVJfU1JFX1ZFUlNJT04nOiBKU09OLnN0cmluZ2lmeShyb2FyU3JlVmVyc2lvbiksXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBWdWUoe1xuICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLm1kJC9dLFxuICAgIH0pLFxuICAgIG5vZGVQb2x5ZmlsbHMoe1xuICAgICAgZ2xvYmFsczoge1xuICAgICAgICBwcm9jZXNzOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBVbmhlYWRWaXRlKCksXG4gICAgLi4uKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnICYmIHByb2Nlc3MuZW52LkNJICE9PSAndHJ1ZScgPyBbbWtjZXJ0KCldIDogW10pLFxuICAgIC4uLihwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ2RldmVsb3BtZW50J1xuICAgICAgPyBbXG4gICAgICAgICAgc2VudHJ5Vml0ZVBsdWdpbih7XG4gICAgICAgICAgICBvcmc6ICdsZXZhbnRlLWZyYW1ld29yaycsXG4gICAgICAgICAgICBwcm9qZWN0OiAnZGFzaGJvYXJkJyxcbiAgICAgICAgICB9KSxcbiAgICAgICAgXVxuICAgICAgOiBbXSksXG4gIF0sXG5cbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICB9LFxuICB9LFxuXG4gIHNlcnZlcjoge1xuICAgIGZzOiB7XG4gICAgICBhbGxvdzogWycuLiddLFxuICAgIH0sXG4gIH0sXG5cbiAgYnVpbGQ6IHtcbiAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXG4gICAgc291cmNlbWFwOiB0cnVlLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICBsb2Rhc2g6IFsnbG9kYXNoJ10sXG4gICAgICAgICAgdGFuc3RhY2s6IFsnQHRhbnN0YWNrL3Z1ZS1xdWVyeSddLFxuICAgICAgICAgIGNoYXJ0SnM6IFsnY2hhcnQuanMnXSxcbiAgICAgICAgICBzZW50cnk6IFsnQHNlbnRyeS9icm93c2VyJywgJ0BzZW50cnkvaW50ZWdyYXRpb25zJywgJ0BzZW50cnkvdnVlJ10sXG4gICAgICAgICAgcGhvbmVtZTogWydAYmRlbGFiL3JvYXItcGEnXSxcbiAgICAgICAgICBzcmU6IFsnQGJkZWxhYi9yb2FyLXNyZSddLFxuICAgICAgICAgIHN3cjogWydAYmRlbGFiL3JvYXItc3dyJ10sXG4gICAgICAgICAgdXRpbHM6IFsnQGJkZWxhYi9yb2FyLXV0aWxzJ10sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgaG9sZFVudGlsQ3Jhd2xFbmQ6IGZhbHNlLFxuICAgIGluY2x1ZGU6IFsnQGxldmFudGUtZnJhbWV3b3JrL2ZpcmVraXQnLCAncHJpbWV2dWUnXSxcbiAgICBleGNsdWRlOiBwcm9jZXNzLmVudi5DSSA9PT0gJ3RydWUnID8gWydAdGFuc3RhY2svdnVlLXF1ZXJ5LWRldnRvb2xzJ10gOiBbXSxcbiAgICBlc2J1aWxkT3B0aW9uczoge1xuICAgICAgbWFpbkZpZWxkczogWydtb2R1bGUnLCAnbWFpbiddLFxuICAgICAgcmVzb2x2ZUV4dGVuc2lvbnM6IFsnLmpzJywgJy5tanMnLCAnLmNqcyddLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7O0FBQTRaLFNBQVMsd0JBQXdCO0FBQzdiLFNBQVMsZUFBZSxXQUFXO0FBQ25DLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsU0FBUyxxQkFBcUI7QUFDOUIsT0FBTyxnQkFBZ0I7QUFDdkIsWUFBWSxXQUFXO0FBQ3ZCLFNBQVMsb0JBQW9CO0FBUnVPLElBQU0sMkNBQTJDO0FBVXJULElBQUksYUFBYTtBQUNqQixJQUFJO0FBQ0YsZUFBbUIsZUFBUyw0QkFBNEIsRUFBRSxTQUFTLEVBQUUsS0FBSztBQUM1RSxTQUFTLEdBQUc7QUFDVixVQUFRLEtBQUssd0JBQXdCO0FBQ3ZDO0FBRUEsSUFBSSxpQkFBaUI7QUFDckIsSUFBSTtBQUNGLFFBQU0sVUFBVSxVQUFRLFFBQVEsK0JBQStCO0FBQy9ELFFBQU0sTUFBTSxLQUFLLE1BQU0sYUFBYSxTQUFTLE1BQU0sQ0FBQztBQUNwRCxtQkFBaUIsSUFBSTtBQUN2QixTQUFTLEdBQUc7QUFDVixVQUFRLEtBQUssOENBQThDO0FBQzdEO0FBRUEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ04sb0NBQW9DLEtBQUssVUFBVSxVQUFVO0FBQUEsSUFDN0QsZ0NBQWdDLEtBQUssVUFBVSxNQUFNO0FBQUEsSUFDckQseUNBQXlDLEtBQUssVUFBVSxjQUFjO0FBQUEsRUFDeEU7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLFNBQVMsQ0FBQyxVQUFVLE9BQU87QUFBQSxJQUM3QixDQUFDO0FBQUEsSUFDRCxjQUFjO0FBQUEsTUFDWixTQUFTO0FBQUEsUUFDUCxTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLElBQ1gsR0FBSSxRQUFRLElBQUksYUFBYSxpQkFBaUIsUUFBUSxJQUFJLE9BQU8sU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFBQSxJQUN4RixHQUFJLFFBQVEsSUFBSSxhQUFhLGdCQUN6QjtBQUFBLE1BQ0UsaUJBQWlCO0FBQUEsUUFDZixLQUFLO0FBQUEsUUFDTCxTQUFTO0FBQUEsTUFDWCxDQUFDO0FBQUEsSUFDSCxJQUNBLENBQUM7QUFBQSxFQUNQO0FBQUEsRUFFQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBRUEsUUFBUTtBQUFBLElBQ04sSUFBSTtBQUFBLE1BQ0YsT0FBTyxDQUFDLElBQUk7QUFBQSxJQUNkO0FBQUEsRUFDRjtBQUFBLEVBRUEsT0FBTztBQUFBLElBQ0wsY0FBYztBQUFBLElBQ2QsV0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osUUFBUSxDQUFDLFFBQVE7QUFBQSxVQUNqQixVQUFVLENBQUMscUJBQXFCO0FBQUEsVUFDaEMsU0FBUyxDQUFDLFVBQVU7QUFBQSxVQUNwQixRQUFRLENBQUMsbUJBQW1CLHdCQUF3QixhQUFhO0FBQUEsVUFDakUsU0FBUyxDQUFDLGlCQUFpQjtBQUFBLFVBQzNCLEtBQUssQ0FBQyxrQkFBa0I7QUFBQSxVQUN4QixLQUFLLENBQUMsa0JBQWtCO0FBQUEsVUFDeEIsT0FBTyxDQUFDLG9CQUFvQjtBQUFBLFFBQzlCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQSxjQUFjO0FBQUEsSUFDWixtQkFBbUI7QUFBQSxJQUNuQixTQUFTLENBQUMsOEJBQThCLFVBQVU7QUFBQSxJQUNsRCxTQUFTLFFBQVEsSUFBSSxPQUFPLFNBQVMsQ0FBQyw4QkFBOEIsSUFBSSxDQUFDO0FBQUEsSUFDekUsZ0JBQWdCO0FBQUEsTUFDZCxZQUFZLENBQUMsVUFBVSxNQUFNO0FBQUEsTUFDN0IsbUJBQW1CLENBQUMsT0FBTyxRQUFRLE1BQU07QUFBQSxJQUMzQztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
