import type { Plugin } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export function cesiumStatic(options?: { outDir?: string; unminified?: boolean; log?: boolean }) {
  const { outDir, unminified, log } = options || {};
  const _outDir = outDir || 'cesium';
  const cesium = unminified ? 'CesiumUnminified' : 'Cesium';
  return viteStaticCopy({
    silent: log,
    targets: [
      {
        src: `node_modules/cesium/Build/${cesium}/Assets/*`,
        dest: `${_outDir}/Assets/`,
      },
      {
        src: `node_modules/cesium/Build/${cesium}/ThirdParty/*`,
        dest: `${_outDir}/ThirdParty/`,
      },
      {
        src: `node_modules/cesium/Build/${cesium}/Widgets/*`,
        dest: `${_outDir}/Widgets/`,
      },
      {
        src: `node_modules/cesium/Build/${cesium}/Workers/*`,
        dest: `${_outDir}/Workers/`,
      },
    ],
  });
}

export function cesiumBaseUrl(url = '/cesium'): Plugin {
  return {
    name: 'cesium-html-transform',
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
              children: ` window.CESIUM_BASE_URL = '${url}'; `,
              injectTo: 'head-prepend',
            },
          ];
        }
      },
    },
  };
}
