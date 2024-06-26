import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WcsAngularModule } from 'wcs-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WcsAngularModule],
  template: `
    <h1>Angular Standalone Example</h1>
    <wcs-button (click)="onButtonClick($event)">Hello From Angular Standalone App</wcs-button>
  `,
  styles: [`
  `]
})
export class AppComponent {
  title = 'wcs-angular-standalone-example';

  onButtonClick($event: MouseEvent) {
    window.alert("Hello from Angular Standalone App!");
  }
}
