import { Component } from '@angular/core';
import { WcsTabChangeEvent } from 'wcs-core';

const DEFAULT_TAB_KEY = 'counter';

@Component({
  selector: 'app-root',
  template: `
    <wcs-header>
      <img slot="logo" src="./assets/sncf-logo.png" alt="Logo SNCF" >
      <h1 slot="title">Votre superbe application</h1>
      <div slot="actions">
          <wcs-button class="wcs-light" mode="clear"><span>Connexion</span><wcs-mat-icon icon="person_outline"></wcs-mat-icon></wcs-button>
      </div>
      toto
    </wcs-header>
    <wcs-nav>
      <wcs-nav-item text="Example" routerLink="/test-route" role="link" data-href="/test-route">
        <wcs-mat-icon icon="train"></wcs-mat-icon>
      </wcs-nav-item>
    </wcs-nav>
    <main>
      <wcs-tabs headers-only [selectedKey]="selectedTab" gutter (tabChange)="tabChange($event)">
        <wcs-tab itemKey="input" header="Input"></wcs-tab>
        <wcs-tab itemKey="grid" header="Grid"></wcs-tab>
        <wcs-tab itemKey="grid-server-pagination" header="Grid pagination serveur"></wcs-tab>
        <wcs-tab itemKey="select" header="Select"></wcs-tab>
        <wcs-tab itemKey="radio" header="Radio"></wcs-tab>
        <wcs-tab itemKey="formly" header="Formly"></wcs-tab>
        <wcs-tab itemKey="formly-styling" header="Formly Styling"></wcs-tab>
        <wcs-tab itemKey="modal" header="Modal"></wcs-tab>
        <wcs-tab itemKey="counter" header="Counter"></wcs-tab>
      </wcs-tabs>
      <ng-container [ngSwitch]="selectedTab">
        <app-input-example *ngSwitchCase="'input'"></app-input-example>
        <app-grid-example *ngSwitchCase="'grid'"></app-grid-example>
        <app-grid-server-pagination-example *ngSwitchCase="'grid-server-pagination'"></app-grid-server-pagination-example>
        <app-select-example *ngSwitchCase="'select'"></app-select-example>
        <app-radio-group-example *ngSwitchCase="'radio'"></app-radio-group-example>
        <app-formly-example *ngSwitchCase="'formly'"></app-formly-example>
        <app-formly-styling-example *ngSwitchCase="'formly-styling'"></app-formly-styling-example>
        <app-modal-example *ngSwitchCase="'modal'"></app-modal-example>
        <app-counter-example *ngSwitchCase="'counter'"></app-counter-example>
      </ng-container>
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
