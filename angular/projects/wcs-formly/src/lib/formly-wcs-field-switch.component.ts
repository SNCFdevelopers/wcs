import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { WcsFormlyBooleanFieldWrapperProps } from './formly-wcs-boolean-field-wrapper.component';

export type WcsFormlySwitchProps = WcsFormlyBooleanFieldWrapperProps & {
  id: string,
  hideLabel?: boolean
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-wcs-field-switch',
  template: `
    <formly-wcs-boolean-field-wrapper [field]="field" [showError]="showError" [props]="props">
      <wcs-switch
        [id]="id"
        [attr.disabled]="props.disabled ? true : null"
        [formControl]="formControl"
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
