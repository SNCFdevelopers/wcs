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
}

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
        [step]="props.step" >
      </wcs-counter>
    </formly-wcs-field-wrapper>
  `,
  styles: []
})
export class FormlyWcsFieldCounterComponent extends FieldType<FieldTypeConfig<WcsFormlyCounterProps>> {
  defaultOptions = {
    props: {
      value: 1,
      min: 0,
      max: 10,
      step: 1,
    }
  }
}
