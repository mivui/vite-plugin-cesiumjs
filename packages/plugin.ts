import { cesiumBaseUrl } from './baseurl';
import { polyfillNodejs } from './polyfill';
import { cesiumStatic } from './static';

export function cesiumPlugin(options?: {
  url?: string;
  outDir?: string;
  polyfill?: boolean;
  unminified?: boolean;
}) {
  const { url, outDir, polyfill, unminified } = { ...options };
  const plugins = [
    cesiumBaseUrl(url),
    cesiumStatic({
      outDir,
      unminified,
    }),
  ];
  if (polyfill) plugins.push(polyfillNodejs());
  return plugins;
}
