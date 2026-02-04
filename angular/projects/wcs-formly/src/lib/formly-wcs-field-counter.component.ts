import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { WcsFormlyFieldWrapperProps } from './formly-wcs-field-wrapper.component';
import { WcsCounterSize } from 'wcs-core';

export type WcsFormlyCounterProps = WcsFormlyFieldWrapperProps & {
  label: string,
  max?: number,
  min?: number,
  size?: WcsCounterSize,
  step?: number,
};

@Component({

  // tslint:disable-next-line:component-selector
  selector: 'formly-wcs-field-counter',
  template: `
    <formly-wcs-field-wrapper [field]="field" [id]="id" [showError]="showError" [props]="props">
      <wcs-counter
        [attr.disabled]="props.disabled ? true : null"
        [formControl]="formControl"
        [formlyAttributes]="field"
        [id]="id"
        [label]="props.label"
        [max]="props.max"
        [min]="props.min"
        [size]="props.size ?? 'm'"
        [step]="props.step">
      </wcs-counter>
    </formly-wcs-field-wrapper>
  `,
  styles: []
})
export class FormlyWcsFieldCounterComponent extends FieldType<FieldTypeConfig<WcsFormlyCounterProps>> {
}
