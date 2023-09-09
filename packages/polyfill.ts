import type { Plugin } from 'vite';
import path from 'path';

export function polyfillNodejs(): Plugin {
  function isResourceJs(importer: string) {
    const resourceJs = [
      path.join(process.cwd(), 'node_modules/@cesium/engine/Source/Core/Resource.js'),
      path.join(process.cwd(), 'node_modules/cesium/Source/Core/Resource.js'),
    ];
    const importPath = path.resolve(importer);
    return resourceJs.includes(importPath);
  }
  return {
    name: 'cesium-polyfill-nodejs',
    config: () => ({
      resolve: {
        alias: [
          {
            find: 'http',
            replacement: 'http',
            customResolver(_source, importer) {
              if (importer && isResourceJs(importer)) {
                return false;
              }
              return null;
            },
          },
          {
            find: 'https',
            replacement: 'https',
            customResolver(_source, importer) {
              if (importer && isResourceJs(importer)) {
                return false;
              }
              return null;
            },
          },
          {
            find: 'url',
            replacement: 'url',
            customResolver(_source, importer) {
              if (importer && isResourceJs(importer)) {
                return false;
              }
              return null;
            },
          },
          {
            find: 'zlib',
            replacement: 'zlib',
            customResolver(_source, importer) {
              if (importer && isResourceJs(importer)) {
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
