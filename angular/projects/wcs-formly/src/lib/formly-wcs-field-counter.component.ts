import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { WcsFormlyFieldWrapperProps } from './formly-wcs-field-wrapper.component';
import { WcsCounterSize } from 'wcs-core';

export type WcsFormlyCounterProps = WcsFormlyFieldWrapperProps & {
  value?: number,
  min?: number,
  max?: number,
  step?: number,
  size?: WcsCounterSize
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-wcs-field-counter',
  template: `
    <formly-wcs-field-wrapper [field]="field" [id]="id" [showError]="showError" [props]="props">
      <wcs-counter
        [id]="id"
        [formControl]="formControl"
        [size]="props.size"
        [value]="props.value"
        [min]="props.min"
        [max]="props.max"
        [step]="props.step"
        [attr.disabled]="props.disabled ? true : null">
      </wcs-counter>
    </formly-wcs-field-wrapper>
  `,
  styles: []
})
export class FormlyWcsFieldCounterComponent extends FieldType<FieldTypeConfig<WcsFormlyCounterProps>> {
}
