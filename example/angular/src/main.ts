import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';
import { applyPolyfills, defineCustomElements } from 'wcs-core/loader';

applyPolyfills().then(() => {
    defineCustomElements(window);
});

platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
