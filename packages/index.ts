import type { Plugin } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export function cesiumStatic(options: { outDir?: string; unminified?: boolean; log?: boolean }) {
  const { outDir, unminified, log } = options;
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

export function cesiumBaseUrl(path?: string): Plugin {
  return {
    name: 'cesium-html-transform',
    transformIndexHtml(html, { server }) {
      if (server) {
        const { base, command } = server.config;
        let url = base;
        if (command === 'build') {
          url = base + path || 'cesium';
          return html.replace(
            '  <script>//CESIUM_BASE_URL</script>',
            `<script> window.CESIUM_BASE_URL = '${url}';</script>`,
          );
        }
        url = `${base}node_modules/cesium/Build/CesiumUnminified/`;
        return html.replace(
          '<script>//CESIUM_BASE_URL</script>',
          `<script> window.CESIUM_BASE_URL = '${url}';</script>`,
        );
      }
    },
  };
}
