import type { Target } from 'vite-plugin-static-copy';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export function cesiumStatic(options: {
  outDir?: string;
  unminified?: boolean;
}) {
  const { outDir, unminified } = options;
  const getOutDir = outDir ?? 'cesium';
  const cesium = unminified ? 'CesiumUnminified' : 'Cesium';
  const targets: Target[] = [
    {
      src: `node_modules/cesium/Build/${cesium}/Assets/**/*`,
      dest: `${getOutDir}/Assets/`,
      rename: { stripBase: 5 },
    },
    {
      src: `node_modules/cesium/Build/${cesium}/ThirdParty/**/*`,
      dest: `${getOutDir}/ThirdParty/`,
      rename: { stripBase: 5 },
    },
    {
      src: `node_modules/cesium/Build/${cesium}/Widgets/**/*`,
      dest: `${getOutDir}/Widgets/`,
      rename: { stripBase: 5 },
    },
    {
      src: `node_modules/cesium/Build/${cesium}/Workers/**/*`,
      dest: `${getOutDir}/Workers/`,
      rename: { stripBase: 5 },
    },
  ];

  const plugins = viteStaticCopy({
    silent: true,
    targets,
  });
  return plugins;
}
