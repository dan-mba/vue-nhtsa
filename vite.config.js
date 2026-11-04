import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    vue(),
    ViteMinifyPlugin({}),
    tailwindcss()
  ],
  server: {
    port: 8080
  },
  base: './',
  resolve: {
    extensions: ['.js', '.vue', '.json'],
  }
});
