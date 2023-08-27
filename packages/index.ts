import type { Plugin } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

function polyfillNodejs(): Plugin {
  return {
    name: 'cesium-polyfill-nodejs',
    config: () => ({
      resolve: {
        alias: [
          {
            find: 'http',
            replacement: require.resolve('stream-http'),
          },
          {
            find: 'https',
            replacement: require.resolve('https-browserify'),
          },
          {
            find: 'url',
            replacement: require.resolve('url'),
          },
          {
            find: 'zlib',
            replacement: require.resolve('browserify-zlib'),
          },
          //http,https,url,zlib dependencies resolve
          {
            find: 'buffer',
            replacement: require.resolve('buffer'),
          },
          {
            find: 'stream',
            replacement: require.resolve('stream-browserify'),
          },
          {
            find: 'events',
            replacement: require.resolve('events'),
          },
          {
            find: 'assert',
            replacement: require.resolve('assert'),
          },
        ],
      },
    }),
    enforce: 'pre',
    apply: 'build',
  };
}

function cesiumStatic(options: { outDir?: string; unminified?: boolean }) {
  const { outDir, unminified } = options;
  const _outDir = outDir || 'cesium';
  const cesium = unminified ? 'CesiumUnminified' : 'Cesium';
  const plugins = viteStaticCopy({
    silent: true,
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
  return plugins;
}

function cesiumBaseUrl(url?: string): Plugin {
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
              children: ` window.CESIUM_BASE_URL = '${url || '/cesium'}'; `,
              injectTo: 'head-prepend',
            },
          ];
        }
      },
    },
  };
}

export default function cesiumConfig(options?: {
  url?: string;
  outDir?: string;
  unminified?: boolean;
}) {
  const { url, outDir, unminified } = Object.assign({}, options);
  return [
    polyfillNodejs(),
    cesiumBaseUrl(url),
    cesiumStatic({
      outDir,
      unminified,
    }),
  ];
}
