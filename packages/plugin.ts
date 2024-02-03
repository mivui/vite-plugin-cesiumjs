import { cesiumBaseUrl } from './baseurl';
// import { polyfillNodejs } from './polyfill';
import { cesiumStatic } from './static';

export function cesiumPlugin(options?: { url?: string; outDir?: string; unminified?: boolean }) {
  const { url, outDir, unminified } = Object.assign({}, options);
  return [
    // polyfillNodejs(),
    cesiumBaseUrl(url),
    cesiumStatic({
      outDir,
      unminified,
    }),
  ];
}
