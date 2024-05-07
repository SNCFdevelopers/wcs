import { Component } from '@angular/core';
import { WcsTabChangeEvent } from 'wcs-core';

const DEFAULT_TAB_KEY = 'select';

@Component({
  selector: 'app-root',
  template: `
    <wcs-header>
      <img slot="logo" src="./assets/sncf-logo.png" alt="Logo SNCF" >
      <h1 slot="title">Votre superbe application</h1>
      <div slot="actions">
          <wcs-button class="wcs-light" mode="clear"><span>Connexion</span><wcs-mat-icon icon="person_outline"></wcs-mat-icon></wcs-button>
      </div>
    </wcs-header>
    <wcs-nav>
      <wcs-nav-item>
        <a routerLink="/example" routerLinkActive="active">
          <wcs-mat-icon icon="train"></wcs-mat-icon>
          <span>Example</span>
        </a>
      </wcs-nav-item>
      <wcs-nav-item>
        <a routerLink="/about" routerLinkActive="active">
          <wcs-mat-icon icon="info"></wcs-mat-icon>
          <span>Info</span>
        </a>
      </wcs-nav-item>
    </wcs-nav>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host {
      display: grid;
      grid-template-areas: "header header" "nav content";
      grid-template-columns: auto 1fr;
      height: 100vh;
      overflow-y: hidden;
    }
    main {
      grid-area: content;
      padding: 16px;
      overflow-y: auto;
      height: calc(100vh - 64px - 16px - 16px);
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
  title = 'example';
  selectedTab: string = DEFAULT_TAB_KEY;

  // TODO don't use any type when issue will be closed : https://github.com/ionic-team/stencil-ds-output-targets/issues/219
  tabChange($event: any) {
    this.selectedTab = ($event as CustomEvent<WcsTabChangeEvent>).detail.selectedKey;
  }
}
