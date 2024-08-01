import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <app-breadcrumb></app-breadcrumb>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AboutComponent {}
