import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { WcsFormlyFieldWrapperProps } from './formly-wcs-field-wrapper.component';
import { AutocompleteTypes, WcsInputSize } from 'wcs-core';

export type WcsFormlyInputProps = WcsFormlyFieldWrapperProps & {
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search',
  autocapitalize?: string,
  autocomplete?: AutocompleteTypes,
  autocorrect?: 'on' | 'off',
  autofocus?: boolean
  spellcheck?: boolean,
  prefixLabel?: string,
  suffixLabel?: string,
  hideRequiredMarker?: boolean,
  size?: WcsInputSize,
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-wcs-field-input',
  template: `
    <formly-wcs-field-wrapper [field]="field" [id]="id" [showError]="showError" [props]="props">
      <wcs-input [placeholder]="props.placeholder"
                 [id]="id"
                 [formControl]="formControl"
                 [formlyAttributes]="field"
                 [attr.disabled]="props.disabled ? true : null"
                 [type]="type"
                 [min]="props.min"
                 [max]="props.max"
                 [inputmode]="props.inputMode"
                 [pattern]="props.pattern"
                 [autocapitalize]="props.autocapitalize"
                 [autocomplete]="props.autocomplete"
                 [autocorrect]="props.autocorrect"
                 [autofocus]="props.autofocus"
                 [size]="props.size"
                 [minlength]="props.minLength"
                 [spellcheck]="props.spellcheck"
                 [maxlength]="props.maxLength"
                 [prefixLabel]="props.prefixLabel"
                 [suffixLabel]="props.suffixLabel"
                 [attr.required]="props.required && props.hideRequiredMarker !== true"
                 [ngStyle]="props.styles?.input"></wcs-input>
    </formly-wcs-field-wrapper>
  `,
  styles: []
})
export class FormlyWcsFieldInputComponent extends FieldType<FieldTypeConfig<WcsFormlyInputProps>> {
  get type(): string {
    return this.props.type || 'text';
  }
}
