import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";
import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react(),
    tailwindcss()
  ],
    server:{
      port:5173,
      proxy:{
        "/ai-chat"  : "https://chatgptclone-obvd.onrender.com" //replace with env later,
      }
    },
    build:{
      minify:false
    }
})
