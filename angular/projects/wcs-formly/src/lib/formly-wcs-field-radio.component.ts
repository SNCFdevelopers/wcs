import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-formly-wcs-field-radio',
  template: `
    <formly-wcs-field-wrapper [field]="field" [id]="id" [showError]="showError" [to]="to">
      <wcs-radio-group
        [attr.mode]="to?.attributes?.mode"
        [attr.required]="to.required && to.hideRequiredMarker !== true"
        [formControl]="formControl"
        [formlyAttributes]="field">
        <wcs-radio
          *ngFor="let option of to.options | formlySelectOptions: field | async; let i = index"
          [id]="option.value"
          [attr.disabled]="to.disabled || option.disabled ? true : null"
          [value]="option.value"
          [label]="option.label"></wcs-radio>
      </wcs-radio-group>
    </formly-wcs-field-wrapper>
  `,
  styles: []
})
export class FormlyWcsFieldRadioComponent extends FieldType {

}
