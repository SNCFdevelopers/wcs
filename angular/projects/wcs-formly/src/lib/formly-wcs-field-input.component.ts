import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-wcs-field-input',
  template: `
    <wcs-form-field [attr.is-error]="showError ? true : null">
      <wcs-label *ngIf="to.label && to.hideLabel !== true" [attr.for]="id">
        {{ to.label }}
      </wcs-label>
      <wcs-input [placeholder]="to.placeholder" [type]="type" [formControl]="formControl" [formlyAttributes]="field"
                 [attr.disabled]="to.disabled"
                 [attr.required]="to.required && to.hideRequiredMarker !== true"></wcs-input>
      <wcs-error *ngIf="showError">
        <formly-validation-message #error [field]="field"></formly-validation-message>
      </wcs-error>
      <wcs-hint *ngIf="to.description">{{ to.description }}</wcs-hint>
    </wcs-form-field>
  `,
  styles: []
})
export class FormlyWcsFieldInputComponent extends FieldType {
  // tslint:disable-next-line:typedef
  get type() {
    return this.to.type || 'text';
  }
}
