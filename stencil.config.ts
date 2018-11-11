import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'wcs',
  globalStyle: 'src/bootstrap-sncf.min.css',
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ]
};
