import { Component, signal } from '@angular/core';
import { WcsAngularModule } from 'wcs-angular';

@Component({
    selector: 'app-tooltip-page',
    standalone: true,
    imports: [WcsAngularModule],
    template: `
    <h2>Tooltip</h2>
    <div class="column">
      <section>
        <h3>Basic tooltip (hover + focus trigger)</h3>
        <wcs-tooltip for="btn-basic">Texte Info basique</wcs-tooltip>
        <wcs-button id="btn-basic">Survolez-moi</wcs-button>
      </section>

      <section>
        <h3>Interactive tooltip (click to pin)</h3>
        <wcs-tooltip for="btn-interactive" interactive trigger="click" position="right">Contenu interactif <br/> <wcs-button size="s">Bouton interne</wcs-button></wcs-tooltip>
        <wcs-button id="btn-interactive">Cliquez-moi</wcs-button>
      </section>

      <section>
        <h3>Delayed tooltip (500ms show, 0 hide)</h3>
        <wcs-tooltip for="btn-delay" [delay]="[500,0]">Apparaît après 500ms</wcs-tooltip>
        <wcs-button id="btn-delay">Survolez avec délai</wcs-button>
      </section>

      <section>
        <h3>Programmatic show/hide</h3>
        <wcs-tooltip #progRef for="btn-prog" position="top">Géré par boutons</wcs-tooltip>
        <div class="row">
          <wcs-button id="btn-prog">Cible</wcs-button>
          <wcs-button (click)="show(progRef)">Show()</wcs-button>
          <wcs-button (click)="hide(progRef)">Hide()</wcs-button>
          <wcs-button (click)="toggle(progRef)">Toggle</wcs-button>
        </div>
      </section>
    </div>
  `
})
export class TooltipPageComponent {
    private shown = signal(false);
    show(ref: any) { ref?.show(); this.shown.set(true); }
    hide(ref: any) { ref?.hide(); this.shown.set(false); }
    toggle(ref: any) { this.shown() ? this.hide(ref) : this.show(ref); }
}
