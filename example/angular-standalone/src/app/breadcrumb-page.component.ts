import { Component, ViewChild, ElementRef } from '@angular/core';
import { WcsAngularModule } from 'wcs-angular';

@Component({
    selector: 'app-breadcrumb-page',
    standalone: true,
    imports: [WcsAngularModule],
    template: `
    <h2>Breadcrumb</h2>
    <p>Basic collapsed breadcrumb (max-items=5, 1 before collapse, 2 after collapse).</p>
    <wcs-breadcrumb #breadcrumbRef max-items="5" items-before-collapse="1" items-after-collapse="2" aria-label="Fil d'Ariane">
      <wcs-breadcrumb-item><a href="#">Accueil</a></wcs-breadcrumb-item>
      <wcs-breadcrumb-item><a href="#">Section</a></wcs-breadcrumb-item>
      <wcs-breadcrumb-item><a href="#">Sous-section</a></wcs-breadcrumb-item>
      <wcs-breadcrumb-item><a href="#">Détail</a></wcs-breadcrumb-item>
      <wcs-breadcrumb-item aria-current="page">Page courante</wcs-breadcrumb-item>
    </wcs-breadcrumb>

    <div class="row">
      <wcs-button (click)="updateAriaLabel()">Changer aria-label dynamiquement</wcs-button>
      <wcs-button (click)="toggleMaxItems()">Basculer max-items (5 / undefined)</wcs-button>
    </div>
  `
})
export class BreadcrumbPageComponent {
    @ViewChild('breadcrumbRef', { read: ElementRef }) breadcrumbRef?: ElementRef<HTMLWcsBreadcrumbElement>;
    private toggled = false;

    updateAriaLabel() {
        const el = this.breadcrumbRef?.nativeElement;
        el?.setAriaAttribute('aria-label', 'Nouveau label dynamique');
    }

    toggleMaxItems() {
        const el = this.breadcrumbRef?.nativeElement;
        if (!el) return;
        if (this.toggled) {
            el.removeAttribute('max-items');
        } else {
            el.setAttribute('max-items', '5');
        }
        this.toggled = !this.toggled;
    }
}
