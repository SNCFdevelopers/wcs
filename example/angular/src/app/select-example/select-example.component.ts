import {Component, OnInit} from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { Subject } from "rxjs";

type Option = { value: string, label: string, disabled: boolean };

@Component({
  selector: 'app-select-example',
  template: `
    <h2>Exemple d'utilisation du select</h2>
    <wcs-card>
      <wcs-card-body>
        <h3>Valeur par défaut</h3>
        <wcs-select placeholder="Le select" [value]="value" name="sel-30" multiple>
          <wcs-select-option [value]="1">One</wcs-select-option>
          <wcs-select-option [value]="2">Two</wcs-select-option>
          <wcs-select-option [value]="3">Three</wcs-select-option>
        </wcs-select>
        <h3>Binding</h3>
        <p>Selected values : {{bindingCustomSelect}}</p>
        <wcs-select placeholder="Le select" [(ngModel)]="bindingCustomSelect" name="sel-893" multiple>
          <wcs-select-option value="1">One</wcs-select-option>
          <wcs-select-option value="2">Two</wcs-select-option>
          <wcs-select-option value="3">Three</wcs-select-option>
        </wcs-select>
        <h3>Set value</h3>
        <wcs-select placeholder="Le select" [(ngModel)]="random" name="sel-763">
          <wcs-select-option [value]="1">One</wcs-select-option>
          <wcs-select-option [value]="2">Two</wcs-select-option>
          <wcs-select-option [value]="3">Three</wcs-select-option>
        </wcs-select>
        <br/>
        <wcs-button class="primary" mode="stroked" (click)="onRandomButtonClick()">Set random value</wcs-button>
        <wcs-button class="primary" mode="stroked" (click)="onResetButtonClick()">Reset</wcs-button>
      </wcs-card-body>
    </wcs-card>
    <app-native-select-example></app-native-select-example>
    <app-autocomplete-select-example></app-autocomplete-select-example>
  `,
  styles: []
})
export class SelectExampleComponent implements OnInit {
  private optionsFormly: Option[] = [
    {
      value: '1',
      label: 'Première valeur',
      disabled: false
    }, {
      value: '2',
      label: 'Deuxième valeur',
      disabled: true
    }, {
      value: '3',
      label: 'Troisième valeur',
      disabled: false
    }
  ];
  private asynchronousOptionsSubject = new Subject<Option[]>();



  value = [1, 2];
  bindingCustomSelect: any;
  bindingNativeSelect: any = 'Intercités';
  random = this.randomIntFromInterval(1, 3);

  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    {
      fieldGroup: [
        {
          id: 'fieldNativeSelect',
          key: 'fieldNativeSelect',
          type: 'native-select',
          props: {
            name: 'Le select natif',
            id: 'select-formly'
          }
        }
      ]
    }
  ];
  model = {
    fieldNativeSelect: ''
  };

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => this.asynchronousOptionsSubject.next(this.optionsFormly), 1000);
  }

  randomIntFromInterval(min, max): number { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  onRandomButtonClick() {
    this.random = this.randomIntFromInterval(1, 3);
  }

  onResetButtonClick() {
    this.bindingCustomSelect = null;
    this.bindingNativeSelect = null;
    this.random = null;
  }
}
