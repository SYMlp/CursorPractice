import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// Import Ant Design Vue Resolver and auto-import plugins
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    // Configure Components for Ant Design Vue auto-import
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'css', // or 'less' if you want to customize themes
        }),
      ],
      dts: 'src/components.d.ts', // Generate TS declaration file
    }),
    // Configure AutoImport for Vue APIs
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-imports.d.ts', // Generate TS declaration file
      eslintrc: {
        enabled: true, // Generate .eslintrc-auto-import.json
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
