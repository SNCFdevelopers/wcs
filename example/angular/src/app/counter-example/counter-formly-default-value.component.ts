import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-counter-formly-default-value',
  template: `
    <h2>Avec Formly : démonstration valeur par défaut</h2>
    <form [formGroup]="form">
      <formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>
    </form>
    <pre>{{model | json}}</pre>
  `,
  styles: [
  ]
})
export class CounterFormlyDefaultValueComponent {
  form: FormGroup = new FormGroup({});
  model = { };

  fields: FormlyFieldConfig[] = [
    {
      key: 'conter-default-value',
      type: 'counter',
      name: 'conter-default-value',
      props: {
        label: 'Valeur par défaut'
      }
    },
    {
      key: 'counter-validation',
      type: 'counter',
      name: 'counter-validation',
      validators: {
        notEqualsOne: {
          expression: (c: AbstractControl) => c.value !== 1,
          message: (_, field: FormlyFieldConfig) => `"${field.formControl.value}" n'est pas une valeur valide`
        }
      },
      props: {
        label: 'Validation (la valeur 1 est interdite)'
      }
    }
  ];


}
