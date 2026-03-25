import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-native-select-example',
  standalone: false,
  template: `
    <h2>Exemple d'utilisation du select natif</h2>
    <wcs-card>
      <wcs-card-body>
        <h3>Valeur par défaut</h3>
        <wcs-native-select>
          <select name="trains-type" id="trains-select-natif" [value]="'TER'">
            <option disabled hidden selected>Choisissez un train 🚅</option>
            <option value="TGV">TGV</option>
            <option value="TER">TER</option>
            <option value="Intercités">Intercités</option>
          </select>
        </wcs-native-select>

        <h3>Set value</h3>
        <wcs-native-select>
          <select name="trains-type" id="trains-select-natif">
            <option disabled hidden selected>Choisissez un train 🚅</option>
            <option value="TGV">TGV</option>
            <option value="TER">TER</option>
            <option value="Intercités">Intercités</option>
          </select>
        </wcs-native-select>

        <h3>Binding</h3>
        <p>Selected values : {{bindingNativeSelect}}</p>
        <wcs-native-select>
          <select name="trains-type-binding" [(ngModel)]="bindingNativeSelect" id="trains-select-binding-natif">
            <option value="TGV">TGV</option>
            <option value="TER">TER</option>
            <option value="Intercités">Intercités</option>
          </select>
        </wcs-native-select>

        <h3>Formly</h3>
        <form [formGroup]="form">
          <formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>
          <wcs-button style="margin-top: var(--wcs-semantic-spacing-large)" (click)="resetFormlyForm()">Reset form</wcs-button>
        </form>
      </wcs-card-body>
    </wcs-card>
  `,
  styles: [
  ]
})
export class NativeSelectExampleComponent implements OnInit {
  bindingNativeSelect: any = 'Intercités';
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
            id: 'select-formly',
            options: [
              { label: 'Choisissez un super-héros 🦸‍♂️', disabled: true, selected: true, hidden: true },
              { label: 'Iron Man', value: 'iron_man' },
              { label: 'Captain America', value: 'captain_america' },
              { label: 'Black Widow', value: 'black_widow' },
              { label: 'Hulk', value: 'hulk' },
              { label: 'Captain Marvel', value: 'captain_marvel', disabled: true },
            ]
          }
        }
      ]
    }
  ];
  model = {
    fieldNativeSelect: undefined
  };

  constructor() { }

  ngOnInit(): void {
  }


  resetFormlyForm() {
    this.form.reset();
    console.log(this.form);
  }
}
