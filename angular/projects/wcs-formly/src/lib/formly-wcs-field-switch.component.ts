import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { WcsFormlyBooleanFieldWrapperProps } from './formly-wcs-boolean-field-wrapper.component';
import { SwitchLabelAlignment } from 'wcs-core';

export type WcsFormlySwitchProps = WcsFormlyBooleanFieldWrapperProps & {
  checked: boolean,
  hideLabel?: boolean,
  id: string,
  labelAlignment: SwitchLabelAlignment,
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-wcs-field-switch',
  template: `
    <formly-wcs-boolean-field-wrapper [field]="field" [showError]="showError" [props]="props">
      <wcs-switch
        [attr.disabled]="props.disabled ? true : null"
        [checked]="props.checked ? true : null"
        [formControl]="formControl"
        [formlyAttributes]="field"
        [id]="id"
        [labelAlignment]="props.labelAlignment"
        [ngStyle]="props.styles?.input">
        <span *ngIf="props.label && props.hideLabel !== true" [attr.for]="id">
          {{ props.label }}
        </span>
      </wcs-switch>
    </formly-wcs-boolean-field-wrapper>
  `,
  styles: []
})
export class FormlyWcsFieldSwitchComponent extends FieldType<FieldTypeConfig<WcsFormlySwitchProps>> {
}
