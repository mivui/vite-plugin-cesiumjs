import type { Plugin } from 'vite';

export function cesiumBaseUrl(url?: string): Plugin {
  return {
    name: 'cesium-base-url',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(_html, { server }) {
        if (server) {
          const { base, command } = server.config;
          if (command === 'serve') {
            const devUrl = `${base}node_modules/cesium/Build/CesiumUnminified`;
            return [
              {
                tag: 'script',
                children: ` window.CESIUM_BASE_URL = '${devUrl}'; `,
                injectTo: 'head-prepend',
              },
            ];
          }
        } else {
          return [
            {
              tag: 'script',
              children: ` window.CESIUM_BASE_URL = '${url || '/cesium'}'; `,
              injectTo: 'head-prepend',
            },
          ];
        }
      },
    },
  };
}
