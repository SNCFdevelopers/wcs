import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { WcsFormlyFieldWrapperProps } from './formly-wcs-field-wrapper.component';

export type WcsFormlyRadioProps = WcsFormlyFieldWrapperProps & {
  hideRequiredMarker?: boolean
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-formly-wcs-field-radio',
  template: `
    <formly-wcs-field-wrapper [field]="field" [id]="id" [showError]="showError" [props]="props">
      <wcs-radio-group
        [id]="id"
        [attr.mode]="props?.attributes?.mode"
        [attr.required]="props.required && props.hideRequiredMarker !== true"
        [formControl]="formControl"
        [formlyAttributes]="field"
        [ngStyle]="props.styles?.input">
        <wcs-radio
          *ngFor="let option of props.options | wcsFormlyOptions | async; let i = index"
          [id]="option.id ?? id + '-option-' + i"
          [attr.disabled]="props.disabled || option.disabled ? true : null"
          [value]="option.value"
          [label]="option.label"
          [ngClass]="option.class"></wcs-radio>
      </wcs-radio-group>
    </formly-wcs-field-wrapper>
  `,
  styles: []
})
export class FormlyWcsFieldRadioComponent extends FieldType<FieldTypeConfig<WcsFormlyRadioProps>> {

}
