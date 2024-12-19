import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-input-examples',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit(model)">
      <formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>
      <wcs-button type="submit">Submit</wcs-button>
    </form>
  `,
  styles: [`
  wcs-button[type=submit] {
    margin-top: var(--wcs-semantic-spacing-base);
  }
  `]
})
export class FormlyInputExamplesComponent {

  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      props: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      }
    },
    {
      fieldGroupClassName: 'grid-auto-column column-gap-x-2',
      fieldGroup: [
        {
          id: 'large',
          key: 'large',
          type: 'input',
          props: {
            label: 'Input Large',
            placeholder: 'Input L',
            size: 'l',
            required: true
          }
        },
        {
          id: 'medium',
          key: 'medium',
          type: 'input',
          props: {
            label: 'Input Medium',
            placeholder: 'Input M',
            size: 'm',
            required: true
          }
        },
        {
          id: 'small',
          key: 'small',
          type: 'input',
          props: {
            label: 'Input Small',
            placeholder: 'Input S',
            size: 's',
            required: true
          }
        }
      ]
    }
  ];

  onSubmit(model) {
    console.log(model);
  }

}
