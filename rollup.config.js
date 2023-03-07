import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/index.ts',
  output: [
    {
      file: 'dist/node-paddle-sdk.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/node-paddle-sdk.es.js',
      format: 'es',
    },
  ],
  plugins: [typescript()],
  external: ['got', 'crypto'],
};
