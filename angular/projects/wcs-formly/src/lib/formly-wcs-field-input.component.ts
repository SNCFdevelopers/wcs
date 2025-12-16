import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { WcsFormlyFieldWrapperProps } from './formly-wcs-field-wrapper.component';
import {
  AutocompleteTypes,
  WcsInputSize,
  WcsInputEnterKeyHint,
  WcsInputInputMode,
  WcsInputState
} from 'wcs-core';

export type WcsFormlyInputProps = WcsFormlyFieldWrapperProps & {
  accept?: string,
  autocapitalize?: string,
  autocomplete?: AutocompleteTypes,
  autocorrect?: 'on' | 'off',
  autofocus?: boolean
  debounce?: number,
  enterkeyhint?: WcsInputEnterKeyHint;
  hidePasswordButtonAriaLabel?: string,
  hideRequiredMarker?: boolean,
  icon?: string,
  inputMode?: WcsInputInputMode,
  name?: string,
  prefixLabel?: string,
  showPasswordButtonAriaLabel?: string,
  size?: WcsInputSize,
  spellcheck?: boolean,
  state?: WcsInputState,
  suffixLabel?: string,
  minDate?: string | undefined,
  maxDate?: string | undefined,
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-wcs-field-input',
  template: `
    <formly-wcs-field-wrapper [field]="field" [id]="id" [showError]="showError" [props]="props">
      <wcs-input [accept]="props.accept"
                 [autocapitalize]="props.autocapitalize"
                 [autocomplete]="props.autocomplete"
                 [autocorrect]="props.autocorrect"
                 [autofocus]="props.autofocus ? true : null"
                 [debounce]="props.debounce"
                 [attr.disabled]="props.disabled ? true : null"
                 [enterkeyhint]="props.enterkeyhint"
                 [formControl]="formControl"
                 [formlyAttributes]="field"
                 [hidePasswordButtonAriaLabel]="props.hidePasswordButtonAriaLabel"
                 [icon]="props.icon"
                 [id]="id"
                 [inputmode]="props.inputMode"
                 [max]="props.maxDate ? props.maxDate : props.max"
                 [maxlength]="props.maxLength"
                 [min]="props.minDate ? props.minDate : props.min"
                 [minlength]="props.minLength"
                 [ngStyle]="props.styles?.input"
                 [pattern]="props.pattern"
                 [prefixLabel]="props.prefixLabel"
                 [attr.readonly]="props.readonly ? true : null"
                 [attr.required]="(props.required && props.hideRequiredMarker !== true) ? true : null"
                 [showPasswordButtonAriaLabel]="props.showPasswordButtonAriaLabel"
                 [size]="props.size ?? 'm'"
                 [spellcheck]="props.spellcheck ? true : null"
                 [state]="props.state"
                 [step]="props.step"
                 [suffixLabel]="props.suffixLabel"
                 [type]="type"
                 [placeholder]="props.placeholder"></wcs-input>
    </formly-wcs-field-wrapper>
  `,
  styles: []
})
export class FormlyWcsFieldInputComponent extends FieldType<FieldTypeConfig<WcsFormlyInputProps>> {
  get type(): string {
    return this.props.type || 'text';
  }
}
