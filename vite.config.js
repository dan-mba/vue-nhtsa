import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {createHtmlPlugin} from 'vite-plugin-html';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin(),
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
