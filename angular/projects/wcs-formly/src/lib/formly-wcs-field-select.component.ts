import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-formly-wcs-field-select',
  template: `
    <wcs-form-field [attr.is-error]="showError ? true : null">
      <wcs-label *ngIf="to.label && to.hideLabel !== true" [attr.for]="id">
        {{ to.label }}
      </wcs-label>
      <wcs-select
        [id]="to.id"
        [attr.required]="to.required && to.hideRequiredMarker !== true"
        [attr.placeholder]="to.placeholder"
        [formControl]="formControl"
        [attr.multiple]="to.multiple"
        [attr.disabled]="to.readonly">
        <wcs-select-option
          *ngFor="let option of to.options | formlySelectOptions: field | async; let i = index"
          [value]="option.value">{{option.label}}</wcs-select-option>
      </wcs-select>
      <wcs-error *ngIf="showError">
        <formly-validation-message #error [field]="field"></formly-validation-message>
      </wcs-error>
      <wcs-hint *ngIf="to.description">{{ to.description }}</wcs-hint>
    </wcs-form-field>
  `,
  styles: []
})
export class FormlyWcsFieldSelectComponent extends FieldType {
}
