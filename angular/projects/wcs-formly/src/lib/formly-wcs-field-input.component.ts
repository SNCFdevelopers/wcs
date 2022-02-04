import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-wcs-field-input',
  template: `
    <formly-wcs-field-wrapper [field]="field" [id]="id" [showError]="showError" [to]="to">
    <wcs-input [placeholder]="to.placeholder" [type]="type" [formControl]="formControl" [formlyAttributes]="field"
               [attr.disabled]="to.disabled"
               [prefixLabel]="to.prefixLabel"
               [suffixLabel]="to.suffixLabel"
               [attr.required]="to.required && to.hideRequiredMarker !== true"
               [ngStyle]="to.styles?.input"></wcs-input>
    </formly-wcs-field-wrapper>
  `,
  styles: []
})
export class FormlyWcsFieldInputComponent extends FieldType {
  // tslint:disable-next-line:typedef
  get type() {
    return this.to.type || 'text';
  }
}
