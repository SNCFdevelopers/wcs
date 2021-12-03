import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-wcs-field-checkbox',
  template: `
    <wcs-form-field [attr.is-error]="showError ? true : null">
      <wcs-checkbox
        [id]="to.id"
        [attr.disabled]="to.disabled ? true : null"
        [formControl]="formControl">{{to.label}}</wcs-checkbox>
      <wcs-error *ngIf="showError">
        <formly-validation-message #error [field]="field"></formly-validation-message>
      </wcs-error>
      <wcs-hint *ngIf="to.description">{{ to.description }}</wcs-hint>
    </wcs-form-field>
  `,
  styles: []
})
export class FormlyWcsFieldCheckboxComponent extends FieldType {
}
