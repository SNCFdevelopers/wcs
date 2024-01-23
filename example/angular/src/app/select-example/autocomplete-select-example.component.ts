import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { WcsFormlySelectProps } from "wcs-formly";

@Component({
  selector: 'app-autocomplete-select-example',
  template: `
    <h2>Exemple d'utilisation du select autocomplete</h2>
    <wcs-card>
      <wcs-card-body>
        <h3>Autocomplete</h3>
        <wcs-select id="select-autocomplete"
                    placeholder="Choose a train"
                    autocomplete>
          <wcs-select-option value="TGV">TGV</wcs-select-option>
          <wcs-select-option value="TER">TER</wcs-select-option>
          <wcs-select-option value="Intercités">Intercités</wcs-select-option>
        </wcs-select>

        <h3>Autocomplete multiple + chips</h3>
        <wcs-select id="select-autocomplete-multiple-chips"
                    placeholder="Choose a train"
                    autocomplete multiple chips>
          <wcs-select-option value="TGV">TGV</wcs-select-option>
          <wcs-select-option value="TER">TER</wcs-select-option>
          <wcs-select-option value="Intercités">Intercités</wcs-select-option>
        </wcs-select>

        <h3>Binding</h3>
        <p>Selected values : {{bindingAutocomplete}}</p>
        <wcs-select id="select-autocomplete-binding"
                    (wcsChange)="handleChange($event)"
                    (wcsFilterChange)="handleFilterChange($event)"
                    placeholder="Choose a train"
                    autocomplete
                    [(ngModel)]="bindingAutocomplete">
          <wcs-select-option value="TGV">TGV</wcs-select-option>
          <wcs-select-option value="TER">TER</wcs-select-option>
          <wcs-select-option value="Intercités">Intercités</wcs-select-option>
        </wcs-select>
          <br/>
          <wcs-button id="reset-form" (click)="bindingAutocomplete = undefined">Reset form</wcs-button>

        <h3>Valeur par défaut</h3>
        <div class="select-container">
          <wcs-select id="select-autocomplete-2"
                      placeholder="Choose a train"
                      [value]="'TER'"
                      autocomplete>
            <wcs-select-option value="TGV">TGV</wcs-select-option>
            <wcs-select-option value="TER">TER</wcs-select-option>
            <wcs-select-option value="Intercités">Intercités</wcs-select-option>
          </wcs-select>
          <wcs-select id="select-autocomplete-multiple-chips-2"
                      placeholder="Choose a train"
                      [value]="['TER', 'TGV']"
                      autocomplete multiple>
            <wcs-select-option value="TGV">TGV</wcs-select-option>
            <wcs-select-option value="TER">TER</wcs-select-option>
            <wcs-select-option value="Intercités">Intercités</wcs-select-option>
          </wcs-select>
        </div>

        <h3>Formly</h3>
        <form [formGroup]="form">
            <formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>
            <wcs-button style="margin-top: var(--wcs-margin)" (click)="resetFormlyForm()">Reset form</wcs-button>
        </form>
      </wcs-card-body>
    </wcs-card>
  `,
  styles: [`
    .select-container {
      display: flex;
      gap: var(--wcs-margin);

      wcs-select {
        width: 100%
      }
    }
  `]
})
export class AutocompleteSelectExampleComponent implements OnInit {

  bindingAutocomplete: any = 'Intercités';
  form = new FormGroup({});
  fields: FormlyFieldConfig<WcsFormlySelectProps>[] = [
    {
      fieldGroup: [
        {
          id: 'fieldAutocompleteSelect',
          key: 'fieldAutocompleteSelect',
          type: 'select',
          props: {
            name: 'Le select natif',
            id: 'select-formly',
            placeholder: 'Choisissez un super-héros 🦸‍♂️',
            autocomplete: true,
            options: [
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

  handleChange($event: any) {
    console.log('handleChange: ', $event);
  }
  handleFilterChange($event: any) {
    console.log('handleFilterChange', $event);
  }

  resetFormlyForm() {
    this.form.reset();
    console.log(this.form);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
