import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { WcsFormlyFieldWrapperProps } from './formly-wcs-field-wrapper.component';
import { WcsTextareaInputMode, WcsTextareaWrap } from 'wcs-core';

export type WcsFormlyTextareaProps = WcsFormlyFieldWrapperProps & {
  autoGrow?: boolean,
  autocapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters',
  autofocus?: boolean,
  debounce?: number,
  enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send',
  hidePasswordButtonAriaLabel?: string,
  icon?: string,
  inputmode?: WcsTextareaInputMode,
  multiple?: boolean,
  pattern?: string,
  resize?: 'both' | 'none' | 'vertical' | 'horizontal',
  showPasswordButtonAriaLabel?: string,
  spellcheck?: boolean,
  state?: 'initial' | 'error',
  wrap?: WcsTextareaWrap,
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-formly-wcs-field-textarea',
  template: `
    <formly-wcs-field-wrapper [field]="field" [id]="id" [showError]="showError" [props]="props">
      <wcs-textarea
        [autoGrow]="props.autoGrow ? true : null"
        [autocapitalize]="props.autocapitalize"
        [autofocus]="props.autofocus"
        [cols]="props.cols"
        [debounce]="props.debounce"
        [attr.disabled]="props.disabled ? true : null"
        [enterkeyhint]="props.enterkeyhint"
        [formControl]="formControl"
        [formlyAttributes]="field"
        [hidePasswordButtonAriaLabel]="props.hidePasswordButtonAriaLabel"
        [icon]="props.icon"
        [inputmode]="props.inputmode"
        [id]="id"
        [max]="props.max"
        [maxlength]="props.maxLength"
        [min]="props.min"
        [minlength]="props.minLength"
        [multiple]="props.multiple"
        [attr.required]="props.required ? true : null"
        [ngStyle]="props.styles?.input"
        [placeholder]="props.placeholder"
        [readonly]="props.readonly ? true : null"
        [resize]="props.resize"
        [rows]="props.rows"
        [spellcheck]="props.spellcheck"
        [state]="props.state"
        [wrap]="props.wrap">
      </wcs-textarea>
    </formly-wcs-field-wrapper>
  `,
})
export class FormlyWcsFieldTextareaComponent extends FieldType<FieldTypeConfig<WcsFormlyTextareaProps>> {
  defaultOptions = {
    props: {
      rows: 4,
    },
  };
}
