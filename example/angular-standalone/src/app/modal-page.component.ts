import { Component } from '@angular/core';
import { WcsAngularModule } from 'wcs-angular';

@Component({
    selector: 'app-modal-page',
    standalone: true,
    imports: [WcsAngularModule],
    template: `
    <h2>Modal</h2>
    <div class="row">
      <wcs-button (click)="open('mainModal')" id="open-main">Ouvrir modal</wcs-button>
      <wcs-button (click)="open('noBackdropModal')" id="open-nb">Sans backdrop</wcs-button>
      <wcs-button (click)="open('largeModal')" id="open-large">Taille XL</wcs-button>
    </div>

  <wcs-modal id="mainModal" modal-trigger-controls-id="open-main" show-close-button>
      <div slot="header">Modal classique</div>
      <p>Contenu du modal avec auto-focus sur premier élément focusable.</p>
      <div slot="actions">
        <wcs-button (click)="close('mainModal')" mode="stroked">Fermer</wcs-button>
        <wcs-button (click)="confirm('mainModal')">Confirmer</wcs-button>
      </div>
    </wcs-modal>

    <wcs-modal id="noBackdropModal" without-backdrop modal-trigger-controls-id="open-nb" show-close-button>
      <div slot="header">Sans Backdrop</div>
      <p>Ce modal n'a pas de backdrop.</p>
      <div slot="actions">
        <wcs-button (click)="close('noBackdropModal')">OK</wcs-button>
      </div>
    </wcs-modal>

    <wcs-modal id="largeModal" size="xl" modal-trigger-controls-id="open-large" show-close-button disable-auto-focus>
      <div slot="header">Grand modal</div>
      <p>Auto focus désactivé, vous pouvez gérer le focus manuellement.</p>
      <div slot="actions">
        <wcs-button (click)="close('largeModal')" mode="stroked">Fermer</wcs-button>
      </div>
    </wcs-modal>
  `
})
export class ModalPageComponent {
    private getModal(id: string): HTMLWcsModalElement | null {
        return document.getElementById(id) as HTMLWcsModalElement | null;
    }
    open(id: string) { const m = this.getModal(id); if (m) m.show = true; }
    close(id: string) { const m = this.getModal(id); if (m) m.show = false; }
    confirm(id: string) { console.log('Confirmed'); this.close(id); }
}
