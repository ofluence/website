import path from 'node:path'

import babel from '@rolldown/plugin-babel'
import viteTailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type ConfigEnv } from 'vite'
import viteSvgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.

  const environmentDirectoryPath = path.resolve(process.cwd(), './')
  // Load env strictly for the provided mode (e.g., 'development', 'skaffold', 'production')
  const environmentVariables = loadEnv(mode, environmentDirectoryPath, '')
  process.env = { ...process.env, ...environmentVariables }
  const isDevelopmentBuild =
    mode === 'development' || environmentVariables.VITE_ENV === 'development'

  return {
    envDir: './',
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        routesDirectory: './src/pages',
      }),
      viteReact(),
      babel({
        presets: [
          ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
          reactCompilerPreset(),
        ],
      }),
      viteSvgr({
        svgrOptions: {
          // SVGR options here
          exportType: 'named', // This ensures ReactComponent export
          ref: true,
          svgo: true,
          titleProp: true,
        },
        include: '**/*.svg',
      }),
      viteTailwindcss(),
    ],
    server: {
      port: Number.parseInt(process.env.VITE_PORT || '5173'),
      proxy: {
        '/api': {
          target: process.env.VITE_API_BASE_URL,
          changeOrigin: true,
        },
      },
    },
    base: process.env.VITE_ASSET_BASE_URL || '/',
    define: {
      // Make React and libraries see a development build when VITE_ENV=development
      'process.env.NODE_ENV': JSON.stringify(isDevelopmentBuild ? 'development' : 'production'),
      // Also surface a consistent mode to client code if needed
      // 'import.meta.env.MODE': JSON.stringify(isDevBuild ? 'development' : mode),
    },
    build: {
      outDir: `./dist`,
      sourcemap: isDevelopmentBuild,
      minify: isDevelopmentBuild ? false : ('esbuild' as const),
      // assetDir is to serve the assets from the dashboard as prefix
      assetsDir: 'pulse',
      rollupOptions: {
        external: ['sharp'],
      },
      // Chunk size warning limit to 1000kb for main chunks
      chunkSizeWarningLimit: 1000,
    },
    resolve: {
      tsconfigPaths: true,
    },
  }
})
