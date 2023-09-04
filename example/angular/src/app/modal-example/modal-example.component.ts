import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-example',
  template: `
    <h2>Modal examples</h2>
    <wcs-button (click)="showModalWithoutActions = true">Open modal without actions</wcs-button>
    <wcs-modal size="m" id="test-modal" [hideActions]="false" [showCloseButton]="true"
               (wcsDialogClosed)="showModalWithoutActions = false" [show]="showModalWithoutActions">
      <div slot="header">Title</div>
      Content of the modal without actions
    </wcs-modal>

    <wcs-button (click)="showModalWithActions = true">Open modal with actions</wcs-button>
    <wcs-modal size="m" id="test-modal" [showCloseButton]="true" (wcsDialogClosed)="showModalWithActions = false"
               [show]="showModalWithActions">
      <div slot="header">titre</div>
      Content of the modal with actions
      <div slot="actions">
        <wcs-button (click)="showModalWithActions = false" class="wcs-dark" mode="stroked">Cancel</wcs-button>
        <wcs-button (click)="onClick()" [loading]="loading">Confirm</wcs-button>
      </div>
    </wcs-modal>
  `,
  styles: [`
    wcs-button {
      margin-right: 16px;
    }
  `]
})
export class ModalExampleComponent {
  showModalWithoutActions = false;
  showModalWithActions = false;
  loading = false;

  constructor() {
  }

  onClick() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.showModalWithActions = false;
    }, 5000);
  }
}
