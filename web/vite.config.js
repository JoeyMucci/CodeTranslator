import dns from 'dns'

import { defineConfig } from 'vite'
// import { defineConfig, loadEnv } from 'vite'

import redwood from '@redwoodjs/vite'

// So that Vite will load on localhost instead of `127.0.0.1`.
// See: https://vitejs.dev/config/server-options.html#server-host.
dns.setDefaultResultOrder('verbatim')

const viteConfig = {
  plugins: [redwood()],
}

export default defineConfig(viteConfig)

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, __dirname, '')
//   return {
//     define: {
//       'process.env.OPENAI_API_KEY': JSON.stringify(env.OPENAI_API_KEY),
//     },
//     plugins: [redwood()],
//   }
// })
