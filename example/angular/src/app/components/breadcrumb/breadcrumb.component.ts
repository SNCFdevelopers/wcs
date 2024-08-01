import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { BreadcrumbService, BreadcrumbItemData } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  template: `
    <wcs-breadcrumb>
      <wcs-breadcrumb-item
        *ngFor="let breadcrumb of breadcrumbs; let last = last"
      >
        <a *ngIf="!last && breadcrumb.url" [routerLink]="breadcrumb.url">
          {{ breadcrumb.label }}
        </a>
        <ng-container *ngIf="last">
          {{ breadcrumb.label }}
        </ng-container>
      </wcs-breadcrumb-item>
    </wcs-breadcrumb>
  `,
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  breadcrumbs: BreadcrumbItemData[] = [];
  private subscription: Subscription | null = null;

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.subscription = this.breadcrumbService.breadcrumbs$.subscribe(
      (breadcrumbs) => {
        this.breadcrumbs = breadcrumbs;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
