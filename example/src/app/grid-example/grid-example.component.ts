import { Component, OnInit } from '@angular/core';
import {h, html} from 'gridjs';


@Component({
  selector: 'app-grid-example',
  template: `
    <wcs-grid id="grid-1" [data]="fonctionsSsiReference">
      <wcs-grid-column field-id="label"
                       name="Label"
                       sort></wcs-grid-column>
      <wcs-grid-column field-id="surbrillance"
                       name="Surbrillance"
                       [formatter]="surbrillanceFormatter"></wcs-grid-column>
      <wcs-grid-column field-id="id"
                       name="Actions"
                       [formatter]="actionFormatter"
                       [width]="1"></wcs-grid-column>
    </wcs-grid>
  `,
  styles: []
})
export class GridExampleComponent implements OnInit {
  fonctionsSsiReference = [
    {
      label: 'test1',
      surbrillance: false,
      id: '1'
    },
    {
      label: 'test2',
      surbrillance: true,
      id: '2'
    },
    {
      label: 'test3',
      surbrillance: false,
      id: '3'
    },
    {
      label: 'test4',
      surbrillance: true,
      id: '4'
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  surbrillanceFormatter = (cell) => html( cell ? `Oui` : `Non`);

  actionFormatter = (cell) => {
    return h('wcs-button', {
      shape: 'square',
      mode: 'clear',
      className: 'wcs-primary',
      onClick: () => console.log('clic')
    }, h('wcs-mat-icon', {
      icon: 'create'
    }));
  }

}
