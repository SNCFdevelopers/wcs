import { Component, OnInit, signal } from '@angular/core';
import { WcsGridPaginationChangeEventDetails } from 'wcs-core';


@Component({
  selector: 'app-grid-server-pagination-example',
  standalone: false,
  template: `
    <h2>Grid</h2>
    <wcs-grid id="grid-1" [data]="users()" serverMode>
      <wcs-grid-column path="lastname"
                       name="Nom"></wcs-grid-column>
      <wcs-grid-column path="firstname"
                       name="Prénom"></wcs-grid-column>
      <wcs-grid-pagination [availablePageSizes]="[5, 10, 15, 20]"
                           [pageSize]="pageSize()"
                           [pageCount]="pageCount()"
                           [currentPage]="currentPage()"
                           [itemsCount]="totalElements()"
                           (wcsGridPaginationChange)="onPaginationChange($event)">
      </wcs-grid-pagination>
    </wcs-grid>
  `,
  styles: []
})
export class GridServerPaginationExampleComponent implements OnInit {
  private static readonly NB_MAX_ITEMS = 50;
  users = signal<any[]>([]);

  pageSize = signal(5);
  currentPage = signal(0);
  pageCount = signal(10);
  totalElements = signal(GridServerPaginationExampleComponent.NB_MAX_ITEMS);

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.generateData();
    }, 3000);
  }

  generateData() {
    const newUsers = [];
    for (let i = 0; i < this.pageSize(); i++) {
      newUsers.push({
        lastname: Math.random().toString(36).slice(2),
        firstname: Math.random().toString(36).slice(2),
        id: Math.floor(Math.random() * 100)
      });
    }
    this.users.set(newUsers);
  }

  onPaginationChange($event: any) {
    const event: CustomEvent<WcsGridPaginationChangeEventDetails> = ($event as CustomEvent<WcsGridPaginationChangeEventDetails>);
    this.currentPage.set(event.detail.pagination.currentPage);
    this.pageSize.set(event.detail.pagination.pageSize);
    this.pageCount.set(GridServerPaginationExampleComponent.NB_MAX_ITEMS / this.pageSize());
    this.generateData();
  }

}
