import { defineConfig } from 'rollup';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

export default defineConfig({
  input: ['./packages/index.ts'],
  plugins: [
    json({
      namedExports: false,
    }),
    typescript({ tsconfig: './tsconfig.build.json' }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
      __buildDate__: () => JSON.stringify(new Date()),
      __buildVersion: 15,
    }),
  ],
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
});
