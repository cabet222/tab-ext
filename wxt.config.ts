import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  srcDir: 'src',
  manifest: {
    name: "Tab Manager",
    version: "1.0.0",
    permissions: ["tabs", "storage"],
  },
});
