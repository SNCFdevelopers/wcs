import { Component, signal } from '@angular/core';
import { WcsAlertService } from 'wcs-angular';
import { WcsTabChangeEvent } from 'wcs-core';

const DEFAULT_TAB_KEY = 'select';

@Component({
  selector: 'app-main-example',
  standalone: false,
  template: `
      <wcs-button (click)="this.showInfoAlertDuring5s()">Show info alert during 5s</wcs-button>
      <wcs-button (click)="this.showErrorAlertUntilTheUserDismiss()">Show error alert until the user dismiss</wcs-button>
      <wcs-tabs headers-only [selectedKey]="selectedTab()" gutter (tabChange)="tabChange($event)">
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
      @switch (selectedTab()) {
        @case ('input') {
          <app-input-example></app-input-example>
        }
        @case ('grid') {
          <app-grid-example></app-grid-example>
        }
        @case ('grid-server-pagination') {
          <app-grid-server-pagination-example></app-grid-server-pagination-example>
        }
        @case ('select') {
          <app-select-example></app-select-example>
        }
        @case ('radio') {
          <app-radio-group-example></app-radio-group-example>
        }
        @case ('formly') {
          <app-formly-example></app-formly-example>
        }
        @case ('formly-styling') {
          <app-formly-styling-example></app-formly-styling-example>
        }
        @case ('modal') {
          <app-modal-example></app-modal-example>
        }
        @case ('counter') {
          <app-counter-example></app-counter-example>
        }
      }
  `,
  styles: [``]
})
export class MainExampleComponent {
  title = 'example';
  selectedTab = signal(DEFAULT_TAB_KEY);

  constructor(private readonly wcsAlertService: WcsAlertService) {
    this.wcsAlertService.setConfig({
      showProgressBar: false,
      timeout: 5000,
      position: 'top-right',
    });
  }


  // TODO don't use any type when issue will be closed : https://github.com/ionic-team/stencil-ds-output-targets/issues/219
  tabChange($event: any) {
    this.selectedTab.set(($event as CustomEvent<WcsTabChangeEvent>).detail.selectedKey);
  }

  showInfoAlertDuring5s() {
    this.wcsAlertService.info('Title', 'Subtitle', { timeout: 5000, showProgressBar: true });
  }

  showErrorAlertUntilTheUserDismiss() {
    this.wcsAlertService.error('Title', 'Subtitle', { timeout: 0 });
  }
}
