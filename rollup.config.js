import urlResolve from 'rollup-plugin-url-resolve';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import { prepend } from 'rollup-plugin-insert';
import replace from '@rollup/plugin-replace';

// import globals from 'rollup-plugin-node-globals';
export default {
  input: 'index.js',
  output: {
    file: 'index.mjs',
    format: 'es',
  },
  plugins: [
    prepend(
`const __dirname = import.meta.url.substr(8, import.meta.url.lastIndexOf('/'));
const setImmediate = queueMicrotask;
const global = globalThis;
`),
    // prepend("const global = globalThis;\n"),
    // prepend(""),
    urlResolve(),
    // globals(),
    resolve(),
    commonjs(),
    builtins({preferBuiltins:false}),
    replace({
      "process.":"Deno."
    })
  ]
};