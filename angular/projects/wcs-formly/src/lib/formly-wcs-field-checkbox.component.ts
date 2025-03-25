import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { WcsFormlyBooleanFieldWrapperProps } from './formly-wcs-boolean-field-wrapper.component';
import { CheckboxLabelAlignment } from 'wcs-core';

export type WcsFormlyCheckboxProps = WcsFormlyBooleanFieldWrapperProps & {
  checked: boolean;
  indeterminate: boolean;
  labelAlignment: CheckboxLabelAlignment;
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-wcs-field-checkbox',
  template: `
    <formly-wcs-boolean-field-wrapper [field]="field" [showError]="showError" [props]="props">
      <wcs-checkbox
        [attr.disabled]="props.disabled ? true : null"
        [checked]="props.checked ? true : null"
        [formControl]="formControl"
        [id]="id"
        [indeterminate]="props.indeterminate ? true : null"
        [labelAlignment]="props.labelAlignment"
        [ngStyle]="props.styles?.input">{{props.label}}</wcs-checkbox>
    </formly-wcs-boolean-field-wrapper>
  `,
  styles: []
})
export class FormlyWcsFieldCheckboxComponent extends FieldType<FieldTypeConfig<WcsFormlyCheckboxProps>> {
}
