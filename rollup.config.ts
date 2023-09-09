import { defineConfig } from 'rollup';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

const plugins = [
  json({
    namedExports: false,
  }),
  typescript({ tsconfig: './tsconfig.build.json' }),
];

export default defineConfig([
  {
    input: './packages/index.ts',
    plugins,
    output: [
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.esm.js',
        format: 'es',
      },
    ],
  },
]);
