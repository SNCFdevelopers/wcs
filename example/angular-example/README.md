# Angular WCS demo project.

This is a demo project integrating wcs.  

Things to do for the project to work:
- [ ] npm install @scnf/wcs
- [ ] copy assets folder like so:
  - fonts
    - avenir-black.woff
    - avenir-book.woff
    - avenir-ligther.woff
    - avenir-medium.woff
  - sncf-logo.png
- [ ] Edit files like below  

> All `wcs` imports are replaced by `../../../dist` in this project because we use the local build rather than downloading from npm.

```ts
/// src/main.ts
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Add this line:
import { defineCustomElements } from 'wcs/loader';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
// Add this line:
defineCustomElements(window);
```
```ts
/// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  // Add this line:
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
```scss
/// src/styles.scss
/* You can add global styles to this file, and also import other style files */
// Add this line:
@import 'wcs/wcs.css';
```
