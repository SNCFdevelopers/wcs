import { Component, OnInit } from '@angular/core';
import { HyperFunc, WcsGridRowData } from "wcs-core/dist/types/components/grid/grid-interface";
import { VNode } from "wcs-core/dist/types/stencil-public-runtime";
import { FormControl } from "@angular/forms";


@Component({
  selector: 'app-grid-example',
  template: `
    <h2>Grid</h2>
    <p>
      <b>Valeur dans le Control Value Accessor de la Grid: </b> {{gridFormControl.value | json}}
    </p>
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
              [formControl]="gridFormControl"
              [data]="users"
              selectionConfig="multiple"
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
      padding-bottom: var(--wcs-semantic-spacing-base);
      margin-right: var(--wcs-semantic-spacing-base);
    }
  `]
})
export class GridExampleComponent implements OnInit {
  readonly pageSize: number = 5;
  selectedItems = {};
  users: { name: string, idAdmin: boolean, id: number }[] = [];

  gridFormControl: FormControl<{ name: string, idAdmin: boolean, id: number } | {
    name: string,
    idAdmin: boolean,
    id: number
  }[]> = new FormControl<{ name: string, idAdmin: boolean, id: number } | {
    name: string,
    idAdmin: boolean,
    id: number
  }[]>(null, {
    nonNullable: false
  });

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() =>
        this.generateData(5)
      , 3000);
    console.log(this.gridFormControl.valueChanges.subscribe(value => console.log(value)));
    setTimeout(() => this.gridFormControl.setValue(this.users[0]), 5000);
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
