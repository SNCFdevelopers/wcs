import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet />
  `,
  standalone: false,
  styles: []
})
export class App {
}
