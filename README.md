# ⚡vite-plugin-cesiumjs

#### Quickly start [`Cesium`] in [`Vite`].
[`cesium`]: https://www.cesium.com/
[`Vite`]: https://vitejs.dev/
[![npm version](https://img.shields.io/npm/v/vite-plugin-cesiumjs.svg?style=flat-square)](https://www.npmjs.com/package/vite-plugin-cesiumjs)
[![Alt](https://img.shields.io/npm/dt/vite-plugin-cesiumjs?style=flat-square)](https://npmcharts.com/compare/vite-plugin-cesiumjs?minimal=true)
![Vite Version](https://img.shields.io/badge/Vite-^4.2.0&nbsp;||&nbsp;>=5.0.0-brightgreen.svg?style=flat-square)
![Alt](https://img.shields.io/github/license/mioxs/vite-plugin-cesiumjs?style=flat-square)



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





