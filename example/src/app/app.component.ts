import { Component } from '@angular/core';
import { WcsTabChangeEvent } from '../../../src/components/tabs/tabs-interface';

const DEFAULT_TAB_KEY = 'formly';

@Component({
  selector: 'app-root',
  template: `
    <wcs-header>
      <img slot="logo" src="./assets/sncf-logo.png" alt="Logo SNCF" >
      <h1 slot="title">Votre superbe application</h1>
      <div slot="actions">
          <wcs-button class="wcs-light" mode="clear"><span>Connexion</span><i class="material-icons">person_outline</i></wcs-button>
      </div>
    </wcs-header>
    <wcs-nav>
      <wcs-nav-item text="Example">
        <i class="material-icons">train</i>
      </wcs-nav-item>
    </wcs-nav>
    <main>
      <wcs-tabs headers-only [selectedKey]="selectedTab" gutter (tabChange)="tabChange($event)">
        <wcs-tab itemKey="input" header="Input"></wcs-tab>
        <wcs-tab itemKey="grid" header="Grid"></wcs-tab>
        <wcs-tab itemKey="select" header="Select"></wcs-tab>
        <wcs-tab itemKey="radio" header="Radio"></wcs-tab>
        <wcs-tab itemKey="formly" header="Formly"></wcs-tab>
      </wcs-tabs>
      <ng-container [ngSwitch]="selectedTab">
        <app-input-example *ngSwitchCase="'input'"></app-input-example>
        <app-grid-example *ngSwitchCase="'grid'"></app-grid-example>
        <app-select-example *ngSwitchCase="'select'"></app-select-example>
        <app-radio-group-example *ngSwitchCase="'radio'"></app-radio-group-example>
        <app-formly-example *ngSwitchCase="'formly'"></app-formly-example>
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

  tabChange($event: CustomEvent<WcsTabChangeEvent>) {
    this.selectedTab = $event.detail.selectedKey;
  }
}
