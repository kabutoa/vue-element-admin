import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv, mergeConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Inspect from 'vite-plugin-inspect'
// import legacy from '@vitejs/plugin-legacy'
import { visualizer } from 'rollup-plugin-visualizer'
import compression from 'vite-plugin-compression2'

import { name } from './package.json'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') as unknown as ImportMetaEnv

  const isProd = mode === 'production'

  const baseConfig: UserConfig = {
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      AutoImport({
        imports: [
          'vue',
          {
            'vue-router': ['useRouter', 'useRoute'],
          },
          'pinia',
          '@vueuse/core',
          'vue-i18n',
        ],
        dts: 'src/typings/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
        },
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        dts: 'src/typings/components.d.ts',
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    preview: {
      port: 8888,
      host: '0.0.0.0',
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `
            @use "@/assets/css/mixin.scss" as mixins;
          `,
        },
      },
    },
  }
  if (!isProd) {
    return mergeConfig(baseConfig, {
      base: env.VITE_BASE_URL,
      server: {
        port: env.VITE_PORT,
        open: true,
        host: '0.0.0.0',
        proxy: {
          [env.VITE_API_PREFIX]: {
            target: env.VITE_MOCK_URL,
            changeOrigin: true,
          },
        },
      },
    })
  }

  return mergeConfig(baseConfig, {
    base: env.VITE_OPEN_CDN ? `${env.VITE_CDN_URL}/${name}` : env.VITE_BASE_URL,

    plugins: [
      Inspect(),
      compression(),
      visualizer({
        open: true,
      }),
    ],
    build: {
      target: 'esnext',
      reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告

      sourcemap: false,
      cssCodeSplit: true,

      // 构建优化
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境去除 console
          drop_debugger: true, // 生产环境去除 debugger
        },
      },
      rollupOptions: {
        output: {
          // 手动分包
          manualChunks: {
            'vue-vendor': ['vue', 'pinia', 'vue-router'],
          },
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: ({ name }: { name?: string }) => {
            if (name && /\.css$/.test(name)) {
              return 'css/[name]-[hash][extname]'
            }
            return 'assets/[name]-[hash][extname]'
          },
        },
      },
    },
  } as UserConfig)
})
