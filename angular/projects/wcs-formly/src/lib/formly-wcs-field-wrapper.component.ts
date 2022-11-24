import { Component, Input } from '@angular/core';
import { FormlyFieldConfig, FormlyFieldProps } from '@ngx-formly/core';
import { MaterialIconSize } from 'wcs-core';
import { WcsFormlyStylesProps, WcsFormlyTooltipProps } from './types/formly-props-types';

export type WcsFormlyFieldWrapperProps = FormlyFieldProps & WcsFormlyTooltipProps & WcsFormlyStylesProps & {
  hideLabel?: boolean
};

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
 * field and we wrap the field with a slot .
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-wcs-field-wrapper',
  template: `
    <wcs-form-field [attr.is-error]="showError ? true : null">
      <wcs-label *ngIf="props.label && props.hideLabel !== true" [attr.for]="id" [ngStyle]="props.styles?.label">
        {{ props.label }}
        <wcs-mat-icon [id]="id + '-icon'" *ngIf="props.tooltip?.content || props.tooltip?.dynamicContent" [icon]="props.tooltip?.icon || DEFAULT_TOOLTIP_ICON"
                      [size]="props.tooltip?.size || DEFAULT_TOOLTIP_ICON_SIZE"
                      [style.color]="props.tooltip?.color"></wcs-mat-icon>
      </wcs-label>
      <wcs-tooltip *ngIf="props.tooltip?.content || props.tooltip?.dynamicContent" [for]="id + '-icon'"
                   [content]="props.tooltip?.dynamicContent"
                   [interactive]="props.tooltip?.interactive"
                   position="right">{{props.tooltip?.content}}</wcs-tooltip>
      <ng-content></ng-content>
      <wcs-error *ngIf="showError" [ngStyle]="props.styles?.error">
        <formly-validation-message #error [field]="field"></formly-validation-message>
      </wcs-error>
      <wcs-hint *ngIf="props.description" [ngStyle]="props.styles?.hint">{{ props.description }}</wcs-hint>
    </wcs-form-field>
  `
})
export class FormlyWcsFieldWrapperComponent {
  @Input() showError: boolean;
  @Input() props: WcsFormlyFieldWrapperProps;
  @Input() field: FormlyFieldConfig;
  @Input() id: string;

  readonly DEFAULT_TOOLTIP_ICON: string = 'help' ;
  readonly DEFAULT_TOOLTIP_ICON_SIZE: MaterialIconSize = 'm';
}
