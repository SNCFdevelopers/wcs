import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormlyWcsFieldInputComponent } from './formly-wcs-field-input.component';
import { FormlyWcsFieldRadioComponent } from './formly-wcs-field-radio.component';
import { FormlyWcsFieldSelectComponent } from './formly-wcs-field-select.component';
import { FormlyWcsFieldTextareaComponent } from './formly-wcs-field-textarea.component';
import { WcsAngularModule } from 'wcs-angular';
import { FormlySelectModule } from '@ngx-formly/core/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';


@NgModule({
  declarations: [
    FormlyWcsFieldInputComponent,
    FormlyWcsFieldRadioComponent,
    FormlyWcsFieldSelectComponent,
    FormlyWcsFieldTextareaComponent
  ],
  imports: [
    FormlySelectModule,
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'input',
          component: FormlyWcsFieldInputComponent,
        },
        {name: 'string', extends: 'input'},
        {
          name: 'number',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            },
          },
        },
        {
          name: 'integer',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            },
          },
        },
        {
          name: 'textarea',
          component: FormlyWcsFieldTextareaComponent,
        },
        {
          name: 'radio',
          component: FormlyWcsFieldRadioComponent,
        },
        {
          name: 'select',
          component: FormlyWcsFieldSelectComponent,
        },
      ],
    }),
    WcsAngularModule
  ],
  exports: [
    FormlyWcsFieldInputComponent,
    FormlyWcsFieldRadioComponent,
    FormlyWcsFieldSelectComponent,
    FormlyWcsFieldTextareaComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WcsFormlyModule {
}
