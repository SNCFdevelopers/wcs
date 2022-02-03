import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-formly-wcs-field-select',
  template: `
    <formly-wcs-field-wrapper [field]="field" [id]="id" [showError]="showError" [to]="to">
      <wcs-select
        [id]="to.id"
        [attr.required]="(to.required && to.hideRequiredMarker !== true) ? true : null"
        [attr.placeholder]="to.placeholder"
        [formControl]="formControl"
        [attr.multiple]="to.multiple"
        [attr.disabled]="to.disabled ? true : null">
        <wcs-select-option
          *ngFor="let option of to.options | wcsFormlyOptions | async; let i = index"
          [attr.disabled]="option.disabled ? true : null"
          [value]="option.value"
          [ngClass]="option.class">{{option.label}}</wcs-select-option>
      </wcs-select>
    </formly-wcs-field-wrapper>
  `,
  styles: []
})
export class FormlyWcsFieldSelectComponent extends FieldType {
}
