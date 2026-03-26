import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      FormlyModule.forRoot({
        validationMessages: [
          { name: 'required', message: 'Ce champ est obligatoire' },
        ],
      })
    ),
  ]
};
