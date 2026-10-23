import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      // spike/3d-look only: also build the 3D test page.
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        spike3d: resolve(import.meta.dirname, 'spike-3d.html'),
      },
    },
  },
})
