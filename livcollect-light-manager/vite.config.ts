import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  // Set the third parameter to '' to load all environment variables into `process.env`
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    // Pass the environment variables to your client-side code
    define: {
      'process.env': process.env,
      'import.meta.env': {
        ...process.env,
        ...env, // Load the environment variables
      },
    },
  }
})
