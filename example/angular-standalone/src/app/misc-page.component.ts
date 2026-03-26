import { Component } from '@angular/core';
import { WcsAngularModule } from 'wcs-angular';

@Component({
    selector: 'app-misc-page',
    standalone: true,
    imports: [WcsAngularModule],
    template: `
    <h2>Misc components</h2>
    <section>
      <h3>Badge</h3>
      <div class="row">
          <wcs-badge>42</wcs-badge>
          <wcs-badge class="wcs-primary">New</wcs-badge>
      </div>
    </section>
    <section>
      <h3>Spinner</h3>
      <wcs-spinner></wcs-spinner>
    </section>
    <section>
      <h3>Accordion</h3>
      <wcs-accordion>
        <wcs-accordion-panel>
          <wcs-accordion-header>Panel 1</wcs-accordion-header>
          <wcs-accordion-content>Content 1</wcs-accordion-content>
        </wcs-accordion-panel>
        <wcs-accordion-panel>
          <wcs-accordion-header>Panel 2</wcs-accordion-header>
          <wcs-accordion-content>Content 2</wcs-accordion-content>
        </wcs-accordion-panel>
      </wcs-accordion>
    </section>
  `
})
export class MiscPageComponent { }
