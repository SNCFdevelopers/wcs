import { Component, OnInit } from '@angular/core';
import { HyperFunc, WcsGridRowData } from '../../../../dist/types/components/grid/grid-interface';
import { VNode } from '../../../../dist/types/stencil-public-runtime';


@Component({
  selector: 'app-grid-example',
  template: `
    <h2>Grid</h2>
    <wcs-grid id="grid-1" [data]="fonctionsSsiReference">
      <wcs-grid-column path="label"
                       name="Label"
                       sort></wcs-grid-column>
      <wcs-grid-column path="surbrillance"
                       name="Surbrillance"
                       [formatter]="surbrillanceFormatter"></wcs-grid-column>
      <wcs-grid-column path="id"
                       name="Actions"
                       [formatter]="actionFormatter"
                       [width]="1"></wcs-grid-column>
    </wcs-grid>
  `,
  styles: []
})
export class GridExampleComponent implements OnInit {
  fonctionsSsiReference;

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => this.fonctionsSsiReference = [
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
    ]
      , 3000);
  }

  surbrillanceFormatter = (createElement: HyperFunc<VNode>, column: HTMLWcsGridColumnElement, rowData: WcsGridRowData) => {
    return createElement('span', {}, rowData.data.surbrillance ? `Oui` : `Non`);
  }

  actionFormatter = (createElement: HyperFunc<VNode>, column: HTMLWcsGridColumnElement, rowData: WcsGridRowData) => {
    return createElement('wcs-button', {
      shape: 'square',
      mode: 'clear',
      className: 'wcs-primary',
      onClick: () => console.log('clic')
    }, createElement('wcs-mat-icon', {
      icon: 'create'
    }));
  }

}
