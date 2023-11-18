import { defineConfig } from 'rollup';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';

const plugins = [
  json({
    namedExports: false,
  }),
  typescript({ tsconfig: './tsconfig.build.json' }),
];

const input = './packages/index.ts';

export default defineConfig([
  {
    input,
    plugins,
    output: [
      { file: 'dist/index.cjs.js', format: 'cjs' },
      { file: 'dist/index.esm.js', format: 'es' },
    ],
  },
  {
    input,
    plugins: [dts()],
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
  },
]);
