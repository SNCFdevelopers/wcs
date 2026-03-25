import { provideZoneChangeDetection } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';
import { applyPolyfills, defineCustomElements } from 'wcs-core/loader';

applyPolyfills().then(() => {
  defineCustomElements(window);
});

platformBrowser()
  .bootstrapModule(AppModule, {
    applicationProviders: [provideZoneChangeDetection({ eventCoalescing: true })],
  })
  .catch((err) => console.error(err));
