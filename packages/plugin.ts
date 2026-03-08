import { cesiumBaseUrl } from './baseurl';
import { cesiumStatic } from './static';

export function cesiumPlugin(options?: {
  url?: string;
  outDir?: string;
  unminified?: boolean;
}) {
  const { url, outDir, unminified } = { ...options };
  const plugins = [
    cesiumBaseUrl(url),
    cesiumStatic({
      outDir,
      unminified,
    }),
  ];
  return plugins;
}
