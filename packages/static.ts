import type { Target } from 'vite-plugin-static-copy';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export function cesiumStatic(options: {
  outDir?: string;
  unminified?: boolean;
}) {
  const { outDir, unminified } = options;
  const useOutDir = outDir ?? 'cesium';
  const cesium = unminified ? 'CesiumUnminified' : 'Cesium';
  const targets: Target[] = [
    {
      src: `node_modules/cesium/Build/${cesium}/Assets/*`,
      dest: `${useOutDir}/Assets/`,
    },
    {
      src: `node_modules/cesium/Build/${cesium}/ThirdParty/*`,
      dest: `${useOutDir}/ThirdParty/`,
    },
    {
      src: `node_modules/cesium/Build/${cesium}/Widgets/*`,
      dest: `${useOutDir}/Widgets/`,
    },
    {
      src: `node_modules/cesium/Build/${cesium}/Workers/*`,
      dest: `${useOutDir}/Workers/`,
    },
  ];

  const plugins = viteStaticCopy({
    silent: true,
    targets,
  });
  return plugins;
}
