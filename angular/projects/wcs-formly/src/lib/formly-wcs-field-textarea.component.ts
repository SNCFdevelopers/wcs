import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { WcsFormlyFieldWrapperProps } from './formly-wcs-field-wrapper.component';

export type WcsFormlyTextareaProps = WcsFormlyFieldWrapperProps & {
  autocapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters',
  autofocus?: boolean,
  autoGrow?: boolean,
  spellcheck?: boolean,
  wrap?: 'hard' | 'soft' | 'off',
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-formly-wcs-field-textarea',
  template: `
    <formly-wcs-field-wrapper [field]="field" [id]="id" [showError]="showError" [props]="props">
      <wcs-textarea
        [id]="id"
        [formControl]="formControl"
        [cols]="props.cols"
        [rows]="props.rows"
        [formlyAttributes]="field"
        [placeholder]="props.placeholder"
        [attr.required]="props.required"
        [attr.disabled]="props.disabled ? true : null"
        [autocapitalize]="props.autocapitalize"
        [autofocus]="props.autofocus"
        [autoGrow]="props.autoGrow"
        [minlength]="props.minLength"
        [maxlength]="props.maxLength"
        [readonly]="props.readonly"
        [spellcheck]="props.spellcheck"
        [wrap]="props.wrap"
        [ngStyle]="props.styles?.input">
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
