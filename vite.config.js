import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // GitHub Pages base path:
  // - This portable default works well for most GitHub Pages project sites.
  // - If you prefer an absolute base, change this to "/REPOSITORY_NAME/".
  // - If deploying to a root user site such as https://username.github.io, use "/".
  base: './'
});
