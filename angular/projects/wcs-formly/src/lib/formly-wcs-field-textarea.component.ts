import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-formly-wcs-field-textarea',
  template: `
    <formly-wcs-field-wrapper [field]="field" [id]="id" [showError]="showError" [to]="to">
      <wcs-textarea
        [formControl]="formControl"
        [cols]="to.cols"
        [rows]="to.rows"
        [formlyAttributes]="field"
        [placeholder]="to.placeholder"
        [attr.required]="to.required">
      </wcs-textarea>
    </formly-wcs-field-wrapper>
  `,
})
export class FormlyWcsFieldTextareaComponent extends FieldType {
  defaultOptions = {
    templateOptions: {
      rows: 4,
    },
  };
}
