import { Component, Input } from '@angular/core';
import { FormlyTemplateOptions } from '@ngx-formly/core';
import { FormlyFieldConfig } from '@ngx-formly/core/lib/components/formly.field.config';

/**
 * See formly-wcs-field-wrapper.component.ts for more information on the purpose of this component
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-wcs-boolean-field-wrapper',
  template: `
    <wcs-form-field [attr.is-error]="showError ? true : null">
      <ng-content></ng-content>
      <wcs-error *ngIf="showError" [ngStyle]="to.styles?.error">
        <formly-validation-message #error [field]="field"></formly-validation-message>
      </wcs-error>
      <wcs-hint *ngIf="to.description" [ngStyle]="to.styles?.hint">{{ to.description }}</wcs-hint>
    </wcs-form-field>
  `
})
export class FormlyWcsBooleanFieldWrapperComponent {
  @Input() showError: boolean;
  @Input() to: FormlyTemplateOptions;
  @Input() field: FormlyFieldConfig;
  @Input() id: string;
}
