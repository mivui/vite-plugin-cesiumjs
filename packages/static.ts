import type { Target } from 'vite-plugin-static-copy';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export function cesiumStatic(options: { outDir?: string; unminified?: boolean }) {
  const { outDir, unminified } = options;
  const _outDir = outDir || 'cesium';
  const cesium = unminified ? 'CesiumUnminified' : 'Cesium';
  const targets: Target[] = [
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
  ];

  const plugins = viteStaticCopy({
    silent: true,
    targets,
  });
  return plugins;
}
