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
import { FormlyWcsFieldCheckboxComponent } from './formly-wcs-field-checkbox.component';
import { FormlyWcsFieldSwitchComponent } from './formly-wcs-field-switch.component';
import { FormlyWcsFieldWrapperComponent } from './formly-wcs-field-wrapper.component';
import { FormlyWcsBooleanFieldWrapperComponent } from './formly-wcs-boolean-field-wrapper.component';
import { FormlyWcsFieldCounterComponent } from './formly-wcs-field-counter.component';
import { WcsFormlyOptionsPipe } from './pipes/wcs-formly-options.pipe';
import { FormlyWcsFieldNativeSelectComponent } from './formly-wcs-field-native-select.component';


@NgModule({
  declarations: [
    FormlyWcsFieldInputComponent,
    FormlyWcsFieldRadioComponent,
    FormlyWcsFieldSelectComponent,
    FormlyWcsFieldNativeSelectComponent,
    FormlyWcsFieldTextareaComponent,
    FormlyWcsFieldCheckboxComponent,
    FormlyWcsFieldSwitchComponent,
    FormlyWcsFieldWrapperComponent,
    FormlyWcsBooleanFieldWrapperComponent,
    FormlyWcsFieldCounterComponent,
    WcsFormlyOptionsPipe,
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
            props: {
              type: 'number',
            },
          },
        },
        {
          name: 'integer',
          extends: 'input',
          defaultOptions: {
            props: {
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
        {
          name: 'native-select',
          component: FormlyWcsFieldNativeSelectComponent
        },
        {
          name: 'checkbox',
          component: FormlyWcsFieldCheckboxComponent,
        },
        {
          name: 'switch',
          component: FormlyWcsFieldSwitchComponent,
        },
        {
          name: 'counter',
          component: FormlyWcsFieldCounterComponent,
        }
      ],
    }),
    WcsAngularModule
  ],
  exports: [
    FormlyWcsFieldInputComponent,
    FormlyWcsFieldRadioComponent,
    FormlyWcsFieldSelectComponent,
    FormlyWcsFieldNativeSelectComponent,
    FormlyWcsFieldTextareaComponent,
    FormlyWcsFieldCheckboxComponent,
    FormlyWcsFieldSwitchComponent,
    FormlyWcsFieldWrapperComponent,
    FormlyWcsBooleanFieldWrapperComponent,
    FormlyWcsFieldCounterComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WcsFormlyModule {
}
