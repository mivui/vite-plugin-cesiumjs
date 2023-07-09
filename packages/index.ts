import type { Plugin } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export function staticCopyCesium(options: { outDir: string; unminified?: boolean }) {
  const { outDir, unminified } = options;
  const cesium = unminified ? 'CesiumUnminified' : 'Cesium';
  return viteStaticCopy({
    targets: [
      {
        src: `node_modules/cesium/Build/${cesium}/Assets/*`,
        dest: `${outDir}/Assets/`,
      },
      {
        src: `node_modules/cesium/Build/${cesium}/ThirdParty/*`,
        dest: `${outDir}/ThirdParty/`,
      },
      {
        src: `node_modules/cesium/Build/${cesium}/Widgets/*`,
        dest: `${outDir}/Widgets/`,
      },
      {
        src: `node_modules/cesium/Build/${cesium}/Workers/*`,
        dest: `${outDir}/Workers/`,
      },
    ],
  });
}

export function cesiumBaseUrl(path: string): Plugin {
  return {
    name: 'cesium-html-transform',
    transformIndexHtml(html, { server }) {
      if (server) {
        const { base, command } = server.config;
        let url = base;
        if (command === 'build') {
          url = base + path;
        } else {
          url = `${base}node_modules/cesium/Build/CesiumUnminified/`;
        }
        return html.replace(
          /<script>\/\/CESIUM_BASE_URL(.*?)<\/script>/,
          `<script> window.CESIUM_BASE_URL = '${url}';</script>`,
        );
      }
    },
  };
}
