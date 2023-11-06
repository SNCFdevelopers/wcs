import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WcsAlertService, WcsAngularModule } from 'wcs-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WcsAngularModule],
  template: `
    <h1>Angular Standalone Example</h1>
    <wcs-button (click)="onHelloButtonClick($event)">Hello From Angular Standalone App</wcs-button>
    <wcs-button (click)="onAlertButtonClick()">Display info alert</wcs-button>
  `,
  styles: [`
  `]
})
export class AppComponent {
  title = 'wcs-angular-standalone-example';

  constructor(private readonly wcsAlertService: WcsAlertService) { }

  onHelloButtonClick($event: MouseEvent) {
    window.alert("Hello from Angular Standalone App!");
  }

  onAlertButtonClick() {
    this.wcsAlertService.info("Title", "Subtitle");
  }
}
