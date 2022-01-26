import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-wcs-field-checkbox',
  template: `
    <formly-wcs-boolean-field-wrapper [field]="field" [id]="id" [showError]="showError" [to]="to">
      <wcs-checkbox
        [id]="to.id"
        [attr.disabled]="to.disabled ? true : null"
        [formControl]="formControl">{{to.label}}</wcs-checkbox>
    </formly-wcs-boolean-field-wrapper>
  `,
  styles: []
})
export class FormlyWcsFieldCheckboxComponent extends FieldType {
}
