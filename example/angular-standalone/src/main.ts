import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { RootComponent } from './app/root.component';
import { defineCustomElements } from 'wcs-core/loader';

defineCustomElements(window);

bootstrapApplication(RootComponent, appConfig)
  .catch((err) => console.error(err));
