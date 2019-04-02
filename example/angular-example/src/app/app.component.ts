import { Component } from '@angular/core';

import { SelectChangeEventDetail } from '../../../../dist/types/interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-example';
  value = 50;
  changeValues() {
    this.value = Math.floor(Math.random() * 100);
  }
  onSelectChange(event: CustomEvent<SelectChangeEventDetail>) {
    console.log(event.detail.value);
  }
}
