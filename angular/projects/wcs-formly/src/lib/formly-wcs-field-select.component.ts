import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { WcsFormlyFieldWrapperProps } from './formly-wcs-field-wrapper.component';
import { WcsSelectSize, WcsSelectFilterFn } from 'wcs-core';

export type WcsFormlySelectProps = WcsFormlyFieldWrapperProps & {
  hideRequiredMarker?: boolean,
  multiple?: boolean,
  autocomplete?: boolean,
  filterFn?: WcsSelectFilterFn,
  size?: WcsSelectSize,
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-formly-wcs-field-select',
  template: `
    <formly-wcs-field-wrapper [field]="field" [id]="id" [showError]="showError" [props]="props">
      <wcs-select
        [id]="id"
        [attr.required]="(props.required && props.hideRequiredMarker !== true) ? true : null"
        [attr.placeholder]="props.placeholder"
        [size]="props.size"
        [formControl]="formControl"
        [filterFn]="props.filterFn"
        [attr.autocomplete]="props.autocomplete ? true : null"
        [attr.multiple]="props.multiple"
        [attr.disabled]="props.disabled ? true : null"
        [ngStyle]="props.styles?.input">
        <wcs-select-option
          *ngFor="let option of props.options | wcsFormlyOptions | async; let i = index"
          [attr.disabled]="option.disabled ? true : null"
          [value]="option.value"
          [ngClass]="option.class">{{option.label}}</wcs-select-option>
      </wcs-select>
    </formly-wcs-field-wrapper>
  `,
  styles: []
})
export class FormlyWcsFieldSelectComponent extends FieldType<FieldTypeConfig<WcsFormlySelectProps>> {
}
