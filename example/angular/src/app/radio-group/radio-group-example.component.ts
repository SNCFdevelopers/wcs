import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-radio-group-example',
  template: `
    <wcs-card style="margin-top: 8px">
      <wcs-card-body>
        <h3>ngModel</h3>
        Current select value : {{currentValue ? currentValue : 'none'}}
        <wcs-radio-group [(ngModel)]="currentValue">
          <wcs-radio value="1" label="Option 1"></wcs-radio>
          <wcs-radio value="2" label="Option 2"></wcs-radio>
          <wcs-radio value="3" label="Option 3"></wcs-radio>
          <wcs-radio value="4" label="Option 4"></wcs-radio>
        </wcs-radio-group>
        <br/>
        <wcs-button class="wcs-primary" mode="stroked" (click)="currentValue = '4'">Choose option 4</wcs-button>
      </wcs-card-body>
    </wcs-card>
    <wcs-card style="margin-top: 8px">
      <wcs-card-body>
        <h3>formControl</h3>
        Current select value : {{radioGroup.value || 'none'}}
        <wcs-radio-group [formControl]="radioGroup">
          <wcs-radio value="1" label="Option 1"></wcs-radio>
          <wcs-radio value="2" label="Option 2"></wcs-radio>
          <wcs-radio value="3" label="Option 3"></wcs-radio>
          <wcs-radio value="4" label="Option 4"></wcs-radio>
        </wcs-radio-group>
        <br/>
        <wcs-button class="wcs-primary" mode="stroked" (click)="radioGroup.setValue('4')">Choose option 4</wcs-button>
        <div>radio-group touched ? {{ radioGroup.touched }}</div>
      </wcs-card-body>
    </wcs-card>
  `,
  styles: []
})
export class RadioGroupExampleComponent implements OnInit {
  currentValue: string;
  public radioGroup = new FormControl('', []);


  constructor() {
  }

  ngOnInit(): void {

  }
}
