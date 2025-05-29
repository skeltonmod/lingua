import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
// @ts-expect-error malformed import
import crossOriginIsolation from 'vite-plugin-cross-origin-isolation';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [sveltekit(), crossOriginIsolation(), mkcert()],
  server: {
    https: true,
    proxy: {},
  },
});