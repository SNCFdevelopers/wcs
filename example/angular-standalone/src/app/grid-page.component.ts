import { Component, signal, WritableSignal } from '@angular/core';
import { WcsAngularModule } from 'wcs-angular';
import { HyperFunc, WcsGridRowData } from 'wcs-core/dist/types/components/grid/grid-interface';
import { VNode } from 'wcs-core/dist/types/stencil-public-runtime';

interface User { id: number; name: string; isAdmin: boolean; }

@Component({
  selector: 'app-grid-page',
  standalone: true,
  imports: [WcsAngularModule],
  template: `
    <h2>Grid avancée</h2>
    <div class="row">
      <wcs-button (click)="shuffle()">Shuffle data</wcs-button>
      <wcs-button (click)="addRow()">Add row</wcs-button>
    </div>
    <wcs-grid [data]="users()" selectionConfig="multiple" (wcsGridSelectionChange)="onSelectionChange($event)">
      <wcs-grid-column path="name" name="Nom" sort (wcsSortChange)="onSortChange($event)"></wcs-grid-column>
      <wcs-grid-column path="isAdmin" name="Admin" [formatter]="adminFormatter"></wcs-grid-column>
      <wcs-grid-column path="id" name="Actions" [formatter]="actionFormatter" width="1"></wcs-grid-column>
      <wcs-grid-pagination [pageSize]="5" [availablePageSizes]="[5,10,15]" (wcsGridPaginationChange)="onPageChange($event)"></wcs-grid-pagination>
    </wcs-grid>
  `
})
export class GridPageComponent {
  users: WritableSignal<User[]> = signal([]);
  constructor() { this.generate(); }

  generate() {
    this.users.set(Array.from({ length: 25 }).map((_v, i) => ({
      id: i + 1,
      name: Math.random().toString(36).slice(2, 8),
      isAdmin: Math.random() < 0.3
    })));
  }
  shuffle() { this.users.update(arr => [...arr].sort(() => Math.random() - 0.5)); }
  addRow() { this.users.update(arr => [...arr, { id: Date.now(), name: 'new-' + Date.now().toString().slice(-4), isAdmin: false }]); }
  adminFormatter = (h: HyperFunc<VNode>, col: any, row: WcsGridRowData) => h('span', {}, row.data.isAdmin ? 'Oui' : 'Non');
  actionFormatter = (h: HyperFunc<VNode>, col: any, row: WcsGridRowData) => h('wcs-button', { size: 's', mode: 'clear', onClick: () => console.log('Edit', row.data.id) }, '✎');
  onSelectionChange(ev: any) { console.log('Selection change', ev); }
  onSortChange(ev: any) { console.log('Sort', ev); }
  onPageChange(ev: any) { console.log('Page', ev); }
}
