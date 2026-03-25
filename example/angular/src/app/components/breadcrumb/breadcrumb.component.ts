import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { Subscription } from 'rxjs';

import { BreadcrumbService, BreadcrumbItemData } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  standalone: false,
  template: `
    <wcs-breadcrumb>
      @for (breadcrumb of breadcrumbs(); track $index; let last = $last) {
        <wcs-breadcrumb-item>
          @if (!last && breadcrumb.url) {
            <a [routerLink]="breadcrumb.url">
              {{ breadcrumb.label }}
            </a>
          }
          @if (last) {
            <ng-container>
              {{ breadcrumb.label }}
            </ng-container>
          }
        </wcs-breadcrumb-item>
      }
    </wcs-breadcrumb>
  `,
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  breadcrumbs = signal<BreadcrumbItemData[]>([]);
  private subscription: Subscription | null = null;

  constructor(private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    this.subscription = this.breadcrumbService.breadcrumbs$.subscribe(
      (breadcrumbs) => {
        this.breadcrumbs.set(breadcrumbs);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
