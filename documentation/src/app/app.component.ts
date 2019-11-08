import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <wcs-header>
      <img slot="logo" src="assets/img/sncf-logo.png" alt="Logo SNCF" >
      <h1 slot="title">WCS Documentation</h1>
    </wcs-header>
    <wcs-nav>
      <wcs-nav-item text="Getting started">
        <i class="material-icons">flight_takeoff</i>
      </wcs-nav-item>
      <wcs-nav-item text="Components">
        <i class="material-icons">style</i>
      </wcs-nav-item>
    </wcs-nav>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-areas: "header header" "nav content";
      height: 100vh;
      overflow-y: hidden;
    }
    main {
      grid-area: content;
      background-color: var(--wcs-light);
      overflow-y: auto;
    }
    wcs-nav {
      grid-area: nav;
    }
    wcs-header {
      grid-area: header;
    }
  `]
})
export class AppComponent {
  title = 'documentation';
}
