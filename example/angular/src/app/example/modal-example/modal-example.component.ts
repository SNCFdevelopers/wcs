import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-modal-example',
  standalone: false,
  template: `
    <h2>Modal examples</h2>
    <wcs-button (click)="showModalWithoutActions.set(true)">Open modal without actions</wcs-button>
    <wcs-modal size="m" id="test-modal" [hideActions]="false" [showCloseButton]="true"
               (wcsDialogClosed)="showModalWithoutActions.set(false)" [show]="showModalWithoutActions()">
      <div slot="header">Title</div>
      Content of the modal without actions
    </wcs-modal>

    <wcs-button (click)="showModalWithActions.set(true)">Open modal with actions</wcs-button>
    <wcs-modal size="m" id="test-modal" [showCloseButton]="true" (wcsDialogClosed)="showModalWithActions.set(false)"
               [show]="showModalWithActions()">
      <div slot="header">titre</div>
      Content of the modal with actions
      <div slot="actions">
        <wcs-button (click)="showModalWithActions.set(false)" class="wcs-dark" mode="stroked">Cancel</wcs-button>
        <wcs-button (click)="onClick()" [loading]="loading()">Confirm</wcs-button>
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
  showModalWithoutActions = signal(false);
  showModalWithActions = signal(false);
  loading = signal(false);

  constructor() {
  }

  onClick() {
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
      this.showModalWithActions.set(false);
    }, 5000);
  }
}
