import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { defineCustomElements, applyPolyfills } from 'wcs-temporary/loader';

if (environment.production) {
  enableProdMode();
}

applyPolyfills().then(async () => {
  try {
    await defineCustomElements(window);
    await platformBrowserDynamic().bootstrapModule(AppModule);
  } catch (error) {
    console.error(error);
  }
});
