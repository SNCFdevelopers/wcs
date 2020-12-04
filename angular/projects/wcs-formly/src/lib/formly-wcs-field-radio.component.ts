import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-formly-wcs-field-radio',
  template: `
    <wcs-form-field [attr.is-error]="showError ? true : null">
      <wcs-label *ngIf="to.label && to.hideLabel !== true" [attr.for]="id">
        {{ to.label }}
      </wcs-label>
      <wcs-radio-group
        [attr.mode]="to?.attributes?.mode"
        [attr.required]="to.required && to.hideRequiredMarker !== true"
        [formControl]="formControl"
        [formlyAttributes]="field">
        <wcs-radio
          *ngFor="let option of to.options | formlySelectOptions: field | async; let i = index"
          [id]="option.value"
          [value]="option.value"
          [label]="option.label"></wcs-radio>
      </wcs-radio-group>
      <wcs-error *ngIf="showError">
        <formly-validation-message #error [field]="field"></formly-validation-message>
      </wcs-error>
      <wcs-hint *ngIf="to.description">{{ to.description }}</wcs-hint>
    </wcs-form-field>
  `,
  styles: []
})
export class FormlyWcsFieldRadioComponent extends FieldType {

}
