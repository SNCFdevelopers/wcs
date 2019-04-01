import { Component } from '@angular/core';

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
  onSelectChange(event: any) {
    console.log(event);
  }
}
