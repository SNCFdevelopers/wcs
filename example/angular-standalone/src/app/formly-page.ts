import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { WcsAngularModule } from 'wcs-angular';
import { WcsFormlyModule } from 'wcs-formly';


@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    WcsAngularModule,
    WcsFormlyModule,
    FormlyModule
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
       <formly-form class="formly" [form]="form" [fields]="fields" [model]="model"></formly-form>
       <wcs-button type="submit">
         Submit
       </wcs-button>
     </form>
  `,
  styles: [],
})
export class FormlyPageComponent {
  form: FormGroup = new FormGroup({});
  model = {
    fieldEmail: '',
    fieldPassword: '',
    fieldGenericText: '',
    fieldNumber: null,
    fieldTextarea: '',
    fieldRadio: null,
    fieldSelect: null,
    fieldNativeSelect: null,
    fieldCheckbox: false,
    fieldSwitch: false,
    fieldCounter: 0
  };

  fields: FormlyFieldConfig[] = [
    {
      id: 'fieldEmail',
      key: 'fieldEmail',
      type: 'input',
      props: {
        required: true,
        label: 'Email',
        placeholder: 'john.doe@mail.com',
      },
    },
    {
      id: 'fieldPassword',
      key: 'fieldPassword',
      type: 'input',
      props: {
        type: 'password',
        required: true,
        label: 'Password',
        placeholder: 'Enter your password',
      },
    },
    {
      id: 'fieldGenericText',
      key: 'fieldGenericText',
      type: 'string', // 'string' extends 'input'
      props: {
        label: 'Generic String Field',
        placeholder: 'This uses type: string',
      },
    },
    {
      id: 'fieldNumber',
      key: 'fieldNumber',
      type: 'number', // 'number' extends 'input' with type='number'
      props: {
        label: 'Number Field',
        placeholder: 'Enter a number',
        min: 0,
        max: 100
      },
    },
    {
      id: 'fieldTextarea',
      key: 'fieldTextarea',
      type: 'textarea',
      props: {
        label: 'Textarea',
        placeholder: 'Enter long text here...',
        rows: 4
      },
    },
    {
      id: 'fieldRadio',
      key: 'fieldRadio',
      type: 'radio',
      props: {
        label: 'Radio Group',
        options: [
          { label: 'Option 1', value: 1 },
          { label: 'Option 2', value: 2 },
          { label: 'Option 3', value: 3 },
        ],
      },
    },
    {
      id: 'fieldSelect',
      key: 'fieldSelect',
      type: 'select',
      props: {
        label: 'Select (WCS)',
        placeholder: 'Choose an option',
        options: [
          { label: 'Select Option A', value: 'a' },
          { label: 'Select Option B', value: 'b' },
          { label: 'Select Option C', value: 'c' },
        ],
      },
    },
    {
      id: 'fieldNativeSelect',
      key: 'fieldNativeSelect',
      type: 'native-select',
      props: {
        label: 'Native Select',
        options: [
          { label: 'Native Option X', value: 'x' },
          { label: 'Native Option Y', value: 'y' },
          { label: 'Native Option Z', value: 'z' },
        ],
      },
    },
    {
      id: 'fieldCheckbox',
      key: 'fieldCheckbox',
      type: 'checkbox',
      props: {
        label: 'Checkbox',
      },
    },
    {
      id: 'fieldSwitch',
      key: 'fieldSwitch',
      type: 'switch',
      props: {
        label: 'Switch',
      },
    },
    {
      id: 'fieldCounter',
      key: 'fieldCounter',
      type: 'counter',
      props: {
        label: 'Counter',
        min: 0,
        max: 10,
        step: 1
      },
    }
  ];

  onSubmit(): void {
    console.log('Model:', this.model);
  }
}
