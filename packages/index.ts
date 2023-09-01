import type { Plugin } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { resolve } from 'path';

function polyfillNodejs(): Plugin {
  const resourceJs = [
    resolve(__dirname, 'node_modules/@cesium/engine/Source/Core/Resource.js'),
    resolve(__dirname, 'node_modules/cesium/Source/Core/Resource.js'),
  ];
  return {
    name: 'cesium-resolve-nodejs',
    config: () => ({
      resolve: {
        alias: [
          {
            find: 'http',
            replacement: 'http',
            customResolver(_source, importer) {
              if (importer && resourceJs.includes(resolve(importer))) {
                return false;
              }
              return null;
            },
          },
          {
            find: 'https',
            replacement: 'https',
            customResolver(_source, importer) {
              if (importer && resourceJs.includes(resolve(importer))) {
                return false;
              }
              return null;
            },
          },
          {
            find: 'url',
            replacement: 'url',
            customResolver(_source, importer) {
              if (importer && resourceJs.includes(resolve(importer))) {
                return false;
              }
              return null;
            },
          },
          {
            find: 'zlib',
            replacement: 'zlib',
            customResolver(_source, importer) {
              if (importer && resourceJs.includes(resolve(importer))) {
                return false;
              }
              return null;
            },
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
