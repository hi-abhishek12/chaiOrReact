import { defineConfig } from 'vite'
import "tailwindcss";
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
  ]
 
})
