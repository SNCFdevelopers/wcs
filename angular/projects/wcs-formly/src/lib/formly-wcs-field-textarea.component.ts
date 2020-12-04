import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-formly-wcs-field-textarea',
  template: `
    <wcs-form-field [attr.is-error]="showError ? true : null">
      <wcs-label *ngIf="to.label && to.hideLabel !== true" [attr.for]="id">
        {{ to.label }}
      </wcs-label>
      <textarea
        [formControl]="formControl"
        [cols]="to.cols"
        [rows]="to.rows"
        [formlyAttributes]="field"
        [placeholder]="to.placeholder"
        [attr.required]="to.required">
      </textarea>
      <wcs-error *ngIf="showError">
        <formly-validation-message #error [field]="field"></formly-validation-message>
      </wcs-error>
      <wcs-hint *ngIf="to.description">{{ to.description }}</wcs-hint>
    </wcs-form-field>
  `,
})
export class FormlyWcsFieldTextareaComponent extends FieldType {
  defaultOptions = {
    templateOptions: {
      rows: 4,
    },
  };
}
