import { Component, Input } from '@angular/core';
import { FormlyTemplateOptions } from '@ngx-formly/core';
import { FormlyFieldConfig } from '@ngx-formly/core/lib/components/formly.field.config';

/**
 * We don't use directly the field-wrapper features of formly because it creates an intermediate element in the DOM for
 * each field like so :
 * ```html
 * <wcs-field>
 *   ...
 *   <wcs-formly-field-input>
 *     <wcs-input />
 *   < /wcs-formly-field-input>
 *   ...
 * <wcs-field>
 * ```
 * It breaks the error handling.
 *
 * So, we create a homemade component which takes in parameter the necessary data for the templating from the formly
 * field and we wrap the field with a slot.
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-wcs-field-wrapper',
  template: `
    <wcs-form-field [attr.is-error]="showError ? true : null">
      <wcs-label *ngIf="to.label && to.hideLabel !== true" [attr.for]="id" [ngStyle]="to.styles?.label">
        {{ to.label }}
        <wcs-mat-icon [id]="id + '-icon'" *ngIf="to.tooltip" icon="help" size="s"></wcs-mat-icon>
      </wcs-label>
      <wcs-tooltip *ngIf="to.tooltip" [for]="id + '-icon'" position="right">{{to.tooltip}}</wcs-tooltip>
      <ng-content></ng-content>
      <wcs-error *ngIf="showError" [ngStyle]="to.styles?.error">
        <formly-validation-message #error [field]="field"></formly-validation-message>
      </wcs-error>
      <wcs-hint *ngIf="to.description" [ngStyle]="to.styles?.hint">{{ to.description }}</wcs-hint>
    </wcs-form-field>
  `
})
export class FormlyWcsFieldWrapperComponent {
  @Input() showError: boolean;
  @Input() to: FormlyTemplateOptions;
  @Input() field: FormlyFieldConfig;
  @Input() id: string;
}
