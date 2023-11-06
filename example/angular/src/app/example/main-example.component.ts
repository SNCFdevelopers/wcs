import { Component } from '@angular/core';
import { WcsAlertService } from 'wcs-angular';
import { WcsTabChangeEvent } from 'wcs-core';

const DEFAULT_TAB_KEY = 'select';

@Component({
  selector: 'app-main-example',
  template: `
      <wcs-button (click)="this.showInfoAlertDuring5s()">Show info alert during 5s</wcs-button>
      <wcs-button (click)="this.showErrorAlertUntilTheUserDismiss()">Show error alert until the user dismiss</wcs-button>
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
  `,
  styles: [``]
})
export class MainExampleComponent {
  title = 'example';
  selectedTab: string = DEFAULT_TAB_KEY;

  constructor(private readonly wcsAlertService: WcsAlertService) {
    this.wcsAlertService.setConfig({
      showProgressBar: false,
      timeout: 5000,
      position: 'top-right',
    });
  }


  // TODO don't use any type when issue will be closed : https://github.com/ionic-team/stencil-ds-output-targets/issues/219
  tabChange($event: any) {
    this.selectedTab = ($event as CustomEvent<WcsTabChangeEvent>).detail.selectedKey;
  }

  showInfoAlertDuring5s() {
    this.wcsAlertService.info('Title', 'Subtitle', { timeout: 5000, showProgressBar: true });
  }

  showErrorAlertUntilTheUserDismiss() {
    this.wcsAlertService.error('Title', 'Subtitle', { timeout: 0 });
  }
}
