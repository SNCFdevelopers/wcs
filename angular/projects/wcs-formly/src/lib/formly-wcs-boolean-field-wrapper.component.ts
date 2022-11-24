import { Component, Input } from '@angular/core';
import { FormlyFieldConfig, FormlyFieldProps } from '@ngx-formly/core';
import { WcsFormlyStylesProps, WcsFormlyTooltipProps } from './types/formly-props-types';

export type WcsFormlyBooleanFieldWrapperProps = FormlyFieldProps & WcsFormlyTooltipProps & WcsFormlyStylesProps;

/**
 * See formly-wcs-field-wrapper.component.ts for more information on the purpose of this component
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-wcs-boolean-field-wrapper',
  template: `
    <wcs-form-field [attr.is-error]="showError ? true : null">
      <ng-content></ng-content>
      <wcs-error *ngIf="showError" [ngStyle]="props.styles?.error">
        <formly-validation-message #error [field]="field"></formly-validation-message>
      </wcs-error>
      <wcs-hint *ngIf="props.description" [ngStyle]="props.styles?.hint">{{ props.description }}</wcs-hint>
    </wcs-form-field>
  `
})
export class FormlyWcsBooleanFieldWrapperComponent {
  @Input() showError: boolean;
  @Input() props: WcsFormlyBooleanFieldWrapperProps;
  @Input() field: FormlyFieldConfig;
}
