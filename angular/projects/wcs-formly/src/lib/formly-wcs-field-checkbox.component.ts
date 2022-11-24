import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { WcsFormlyBooleanFieldWrapperProps } from './formly-wcs-boolean-field-wrapper.component';

export type WcsFormlyCheckboxProps = WcsFormlyBooleanFieldWrapperProps;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-wcs-field-checkbox',
  template: `
    <formly-wcs-boolean-field-wrapper [field]="field" [showError]="showError" [props]="props">
      <wcs-checkbox
        [id]="id"
        [attr.disabled]="props.disabled ? true : null"
        [formControl]="formControl"
        [ngStyle]="props.styles?.input">{{props.label}}</wcs-checkbox>
    </formly-wcs-boolean-field-wrapper>
  `,
  styles: []
})
export class FormlyWcsFieldCheckboxComponent extends FieldType<FieldTypeConfig<WcsFormlyCheckboxProps>> {
}
