import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: false,
  template: `
    <app-breadcrumb></app-breadcrumb>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AboutComponent {}
