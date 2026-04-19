import path from 'node:path'

import babel from '@rolldown/plugin-babel'
import viteTailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type ConfigEnv } from 'vite'
import viteSvgr from 'vite-plugin-svgr'
import { nitro } from 'nitro/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const environmentDirectoryPath = path.resolve(process.cwd(), './')
  const environmentVariables = loadEnv(mode, environmentDirectoryPath, '')
  process.env = { ...process.env, ...environmentVariables }
  const isDevelopmentBuild =
    mode === 'development' || environmentVariables.VITE_ENV === 'development'

  return {
    envDir: './',
    plugins: [
      viteTailwindcss(),
      viteSvgr({
        svgrOptions: {
          exportType: 'named',
          ref: true,
          svgo: true,
          titleProp: true,
        },
        include: '**/*.svg',
      }),
      tanstackStart({
        prerender: {
          enabled: true,
          crawlLinks: true,
          autoSubfolderIndex: true,
          // Pick up every static route in the route tree (including the
          // redirect-only routes below that nothing links to).
          autoStaticPathsDiscovery: true,
        },
        // Redirect-only routes (each `throw redirect(...)` in beforeLoad). The
        // link crawler can't find them because they aren't linked from the
        // visible nav/footer, so list them explicitly. The prerender will then
        // emit redirect HTML instead of nginx falling back to the home page.
        pages: [
          { path: '/about', prerender: { enabled: true } },
          { path: '/integrations', prerender: { enabled: true } },
          { path: '/use-cases', prerender: { enabled: true } },
          // Emits /404/index.html so nginx `error_page 404 /404/index.html;`
          // has a prerendered body to serve for unknown URLs.
          { path: '/404', prerender: { enabled: true } },
        ],
        sitemap: {
          enabled: true,
          host: 'https://ofluence.ai',
        },
      }),
      viteReact(),
      babel({
        presets: [
          ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
          reactCompilerPreset(),
        ],
      }),
      nitro(),
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
      'process.env.NODE_ENV': JSON.stringify(isDevelopmentBuild ? 'development' : 'production'),
    },
    build: {
      assetsDir: 'pulse',
      sourcemap: isDevelopmentBuild,
      minify: isDevelopmentBuild ? false : ('esbuild' as const),
      rollupOptions: {
        external: ['sharp'],
      },
      chunkSizeWarningLimit: 1000,
    },
    resolve: {
      tsconfigPaths: true,
    },
  }
})
