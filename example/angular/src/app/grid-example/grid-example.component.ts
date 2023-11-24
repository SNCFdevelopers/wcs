import { Component, OnInit } from '@angular/core';
import { HyperFunc, WcsGridRowData } from "wcs-core/dist/types/components/grid/grid-interface";
import { VNode } from "wcs-core/dist/types/stencil-public-runtime";


@Component({
  selector: 'app-grid-example',
  template: `
    <h2>Grid</h2>
    <wcs-button size="s"
                class="reloadBtn"
                (click)="reloadLessData()">
      Reload less data
    </wcs-button>
    <wcs-button size="s"
                class="removeBtn"
                (click)="removeSelection()">
      Remove selection
    </wcs-button>
    <wcs-grid id="grid-1"
              [data]="users"
              selectionConfig="single"
              [selectedItems]="selectedItems">
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
      <wcs-grid-pagination [availablePageSizes]="[5, 10, 15, 20]" [pageSize]="pageSize"></wcs-grid-pagination>
    </wcs-grid>
  `,
  styles: [`
    .reloadBtn, .removeBtn {
      padding-bottom: var(--wcs-base-margin);
      margin-right: var(--wcs-base-margin);
    }
  `]
})
export class GridExampleComponent implements OnInit {
  readonly pageSize: number = 5;
  selectedItems = {};
  users;

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() =>
        this.generateData(5)
      , 3000);
  }

  generateData(nbPage: number) {
    this.users = [];
    for (let i = 0; i < this.pageSize * nbPage; i++) {
      this.users.push({
        name: Math.random().toString(36).slice(2),
        idAdmin: Math.random() < 0.5,
        id: Math.floor(Math.random() * 100)
      });
    }
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

  reloadLessData() {
    this.generateData(3);
  }

  removeSelection() {
    this.selectedItems = {};
  }

}
