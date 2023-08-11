# vite-plugin-cesiumjs

### vite-plugin-cesiumjs
[![npm version](https://img.shields.io/npm/v/vite-plugin-cesiumjs.svg)](https://www.npmjs.com/package/vite-plugin-cesiumjs)
[![Alt](https://img.shields.io/npm/dm/vite-plugin-cesiumjs)](https://npmcharts.com/compare/vite-plugin-cesiumjs?minimal=true)
![Alt](https://img.shields.io/github/license/mioxs/vite-plugin-cesiumjs)

### install

```shell
npm i vite-plugin-cesiumjs -D
```

##### vite.config.ts

```ts
import { defineConfig } from 'vite';
import { cesiumBaseUrl ,cesiumStatic } from 'vite-plugin-cesiumjs';

export default defineConfig({
  plugins: [
    cesiumBaseUrl(),
    cesiumStatic(),
  ],
});

```
* out-dir: dist/cesium

##### custom dir

```ts
import { defineConfig } from 'vite';
import { cesiumBaseUrl ,cesiumStatic } from 'vite-plugin-cesiumjs';

export default defineConfig({
  plugins: [
    cesiumBaseUrl('/earth'),
    cesiumStatic({
      outDir: 'earth',
      unminified: true,
      log: true,
    }),
  ],
});

```
* out-dir: dist/earth





