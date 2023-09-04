import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-radio-group-example',
  template: `
    <wcs-card style="margin-top: 8px">
      <wcs-card-body>
        current select value : {{currentValue ? currentValue : 'none'}}
        <wcs-radio-group [(ngModel)]="currentValue">
          <wcs-radio value="1" label="Option 1"></wcs-radio>
          <wcs-radio value="2" label="Option 2"></wcs-radio>
          <wcs-radio value="3" label="Option 3"></wcs-radio>
          <wcs-radio value="4" label="Option 4"></wcs-radio>
        </wcs-radio-group>
        <br/>
        <wcs-button class="wcs-primary" mode="stroked" (click)="onClick()">Choose option 4</wcs-button>
      </wcs-card-body>
    </wcs-card>
  `,
  styles: []
})
export class RadioGroupExampleComponent implements OnInit {
  currentValue: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  onClick() {
    this.currentValue = '4';
  }
}
