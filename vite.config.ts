import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set the base path for deployment to a subdirectory on a domain.
  // Replace '/pingo-trip/' with your actual repository name or subdirectory.
  base: '/pingo-trip/',
});
