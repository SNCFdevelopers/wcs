import { Component, OnInit } from '@angular/core';
import { HyperFunc, WcsGridRowData } from '../../../../dist/types/components/grid/grid-interface';
import { VNode } from '../../../../dist/types/stencil-public-runtime';


@Component({
  selector: 'app-grid-example',
  template: `
    <h2>Grid</h2>
    <wcs-grid id="grid-1" [data]="users">
      <wcs-grid-column path="name"
                       name="Nom"
                       sort
                       (wcsSortChange)="onSortChange($event)"></wcs-grid-column>
      <wcs-grid-column path="isAdmin"
                       name="Administrateur"
                       [formatter]="surbrillanceFormatter"></wcs-grid-column>
      <wcs-grid-column path="id"
                       name="Actions"
                       [formatter]="actionFormatter"
                       [width]="1"></wcs-grid-column>
      <wcs-grid-pagination [availablePageSizes]="[5, 10, 15, 20]" [pageSize]="5"></wcs-grid-pagination>
    </wcs-grid>
  `,
  styles: []
})
export class GridExampleComponent implements OnInit {
  users;

  constructor() {
  }

  ngOnInit(): void {
    this.users = [];
    setTimeout(() => this.users = [
        {
          name: 'test1',
          idAdmin: false,
          id: '1'
        },
        {
          name: 'test2',
          idAdmin: true,
          id: '2'
        },
        {
          name: 'test3',
          idAdmin: false,
          id: '3'
        },
        {
          name: 'test4',
          idAdmin: true,
          id: '4'
        },
        {
          name: 'test5',
          idAdmin: false,
          id: '5'
        },
        {
          name: 'test6',
          idAdmin: false,
          id: '6'
        },
        {
          name: 'test7',
          idAdmin: true,
          id: '7'
        },
        {
          name: 'test8',
          idAdmin: true,
          id: '8'
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

  // TODO don't use any type when issue will be closed : https://github.com/ionic-team/stencil-ds-output-targets/issues/219
  onSortChange($event: any) {
    console.log($event);
  }

}
