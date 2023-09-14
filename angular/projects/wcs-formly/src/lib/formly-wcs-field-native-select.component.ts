import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { WcsFormlyFieldWrapperProps } from './formly-wcs-field-wrapper.component';
import { WcsSelectSize } from 'wcs-core';

export type WcsFormlySelectNativeProps = WcsFormlyFieldWrapperProps & {
  size?: WcsSelectSize,
  name?: string,
  id?: string
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-formly-wcs-field-native-select',
  template: `
      <formly-wcs-field-wrapper [field]="field" [id]="id" [showError]="showError" [props]="props">
          <wcs-native-select
                  [ngStyle]="props.styles?.input">
              <select [name]="props.name" [id]="id" [formControl]="formControl">
                  <option *ngFor="let option of props.options | wcsFormlyOptions | async"
                          [value]="option.value"
                          [ngClass]="option.class"
                          [disabled]="option.disabled ? true : null"
                  >{{option.label}}</option>
              </select>
          </wcs-native-select>
      </formly-wcs-field-wrapper>
  `,
  styles: []
})
export class FormlyWcsFieldNativeSelectComponent extends FieldType<FieldTypeConfig<WcsFormlySelectNativeProps>> {
}
