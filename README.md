# ⚡vite-plugin-cesiumjs

### Quickly start `Cesium` in `Vite`.
[![npm version](https://img.shields.io/npm/v/vite-plugin-cesiumjs.svg)](https://www.npmjs.com/package/vite-plugin-cesiumjs)
[![Alt](https://img.shields.io/npm/dt/vite-plugin-cesiumjs)](https://npmcharts.com/compare/vite-plugin-cesiumjs?minimal=true)
![Alt](https://img.shields.io/github/license/mioxs/vite-plugin-cesiumjs)

### install

```shell
npm i vite-plugin-cesiumjs -D
```

##### vite.config.ts

```ts
import { defineConfig } from 'vite';
import Cesiumjs from 'vite-plugin-cesiumjs';

export default defineConfig({
  plugins: [
    Cesiumjs()
  ],
});

```
* output dir: dist/cesium

##### custom dir

```ts
import { defineConfig } from 'vite';
import Cesiumjs from 'vite-plugin-cesiumjs';

export default defineConfig({
  plugins: [
    Cesiumjs({
      url: '/earth',
      outDir: 'earth',
    }),
  ],
});

```
* output dir: dist/earth





