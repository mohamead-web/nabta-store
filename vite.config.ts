
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192x192.png', 'icons/icon-512x512.png'],
      manifest: {
        name: 'متجر نبتة | Nabta Store',
        short_name: 'نبتة | Nabta',
        description: 'متجر لبيع النباتات والزهور عبر الإنترنت مع خدمة الدفع عند الاستلام',
        theme_color: '#0F5731',
        background_color: '#0B3C24',
        display: 'standalone',
        scope: '/',
        // FIX: Corrected a typo in the property key. It was `start_url'` instead of `start_url`.
        start_url: '/',
        dir: 'rtl',
        lang: 'ar',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
