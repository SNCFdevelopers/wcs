import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-wcs-field-switch',
  template: `
    <formly-wcs-boolean-field-wrapper [field]="field" [id]="id" [showError]="showError" [to]="to">
      <wcs-switch
        [id]="to.id"
        [attr.disabled]="to.disabled ? true : null"
        [formControl]="formControl">
        <span *ngIf="to.label && to.hideLabel !== true" [attr.for]="id">
          {{ to.label }}
        </span>
      </wcs-switch>
    </formly-wcs-boolean-field-wrapper>
  `,
  styles: []
})
export class FormlyWcsFieldSwitchComponent extends FieldType {
}
