import { Component } from '@angular/core';

import { SelectChangeEventDetail } from '../../../dist/types/interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  id = 2;

  options: { value: string, name: string }[] = [];

  addOptions() {
    this.options.push({ name: this.id.toString(), value: this.id.toString() });
    this.id++;
  }
}
