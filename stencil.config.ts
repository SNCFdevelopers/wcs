import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import path from 'path';
import glob from 'glob';

export const config: Config = {
  namespace: 'wcs',
  nodeResolve: {
    browser: true
  },
  globalStyle: 'src/style/wcs.global.scss',
  plugins: [
    sass({
      includePaths: glob.sync(
        path.join(__dirname, '**/node_modules/@material')
      ).map((dir) => path.dirname(dir))
    } as any)
  ],
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ],
  enableCache: false
};
