/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from 'wcs-core';




export declare interface WcsActionBar extends Components.WcsActionBar {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['gutter']
})
@Component({
  selector: 'wcs-action-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['gutter']
})
export class WcsActionBar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsApp extends Components.WcsApp {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'wcs-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class WcsApp {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsBadge extends Components.WcsBadge {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['color', 'shape']
})
@Component({
  selector: 'wcs-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'shape']
})
export class WcsBadge {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsButton extends Components.WcsButton {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['disabled', 'href', 'mode', 'ripple', 'shape', 'type']
})
@Component({
  selector: 'wcs-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled', 'href', 'mode', 'ripple', 'shape', 'type']
})
export class WcsButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsCard extends Components.WcsCard {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['mode']
})
@Component({
  selector: 'wcs-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['mode']
})
export class WcsCard {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsCardBody extends Components.WcsCardBody {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'wcs-card-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class WcsCardBody {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { CheckboxChangeEventDetail as ICheckboxCheckboxChangeEventDetail } from 'wcs-core';
export declare interface WcsCheckbox extends Components.WcsCheckbox {
  /**
   * Emitted when the checked property has changed. 
   */
  wcsChange: EventEmitter<CustomEvent<ICheckboxCheckboxChangeEventDetail>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['checked', 'disabled', 'indeterminate', 'labelAlignment', 'name']
})
@Component({
  selector: 'wcs-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['checked', 'disabled', 'indeterminate', 'labelAlignment', 'name']
})
export class WcsCheckbox {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsChange']);
  }
}


export declare interface WcsComNav extends Components.WcsComNav {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['appName']
})
@Component({
  selector: 'wcs-com-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['appName']
})
export class WcsComNav {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { CategoryOpenedEventDetail as IComNavCategoryCategoryOpenedEventDetail } from 'wcs-core';
export declare interface WcsComNavCategory extends Components.WcsComNavCategory {
  /**
   *  
   */
  wcsCategoryOpened: EventEmitter<CustomEvent<IComNavCategoryCategoryOpenedEventDetail>>;
  /**
   *  
   */
  wcsCategoryItemClicked: EventEmitter<CustomEvent<MouseEvent>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['label'],
  methods: ['close', 'open']
})
@Component({
  selector: 'wcs-com-nav-category',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['label']
})
export class WcsComNavCategory {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsCategoryOpened', 'wcsCategoryItemClicked']);
  }
}

import type { MenuOpenedEventDetail as IComNavSubmenuMenuOpenedEventDetail } from 'wcs-core';
export declare interface WcsComNavSubmenu extends Components.WcsComNavSubmenu {
  /**
   *  
   */
  wcsSubmenuOpened: EventEmitter<CustomEvent<IComNavSubmenuMenuOpenedEventDetail>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['label', 'panelDescription', 'panelTitle'],
  methods: ['close', 'open']
})
@Component({
  selector: 'wcs-com-nav-submenu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['label', 'panelDescription', 'panelTitle']
})
export class WcsComNavSubmenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsSubmenuOpened']);
  }
}


export declare interface WcsDivider extends Components.WcsDivider {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'wcs-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class WcsDivider {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsDropdown extends Components.WcsDropdown {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['disabled', 'mode', 'noArrow', 'placement', 'shape']
})
@Component({
  selector: 'wcs-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled', 'mode', 'noArrow', 'placement', 'shape']
})
export class WcsDropdown {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsDropdownDivider extends Components.WcsDropdownDivider {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'wcs-dropdown-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class WcsDropdownDivider {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsDropdownHeader extends Components.WcsDropdownHeader {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'wcs-dropdown-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class WcsDropdownHeader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsDropdownItem extends Components.WcsDropdownItem {
  /**
   *  
   */
  wcsDropdownItemClick: EventEmitter<CustomEvent<void>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'wcs-dropdown-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class WcsDropdownItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsDropdownItemClick']);
  }
}

import type { EditableComponentUpdateEvent as IEditableFieldEditableComponentUpdateEvent } from 'wcs-core';
export declare interface WcsEditableField extends Components.WcsEditableField {
  /**
   * event called at each (valid) update of the field. 
   */
  wcsChange: EventEmitter<CustomEvent<IEditableFieldEditableComponentUpdateEvent>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['errorMsg', 'formatFn', 'label', 'readonly', 'type', 'validateFn', 'value']
})
@Component({
  selector: 'wcs-editable-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['errorMsg', 'formatFn', 'label', 'readonly', 'type', 'validateFn', 'value']
})
export class WcsEditableField {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsChange']);
  }
}


export declare interface WcsError extends Components.WcsError {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'wcs-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class WcsError {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsField extends Components.WcsField {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'wcs-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class WcsField {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsFieldContent extends Components.WcsFieldContent {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'wcs-field-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class WcsFieldContent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsFieldLabel extends Components.WcsFieldLabel {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'wcs-field-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class WcsFieldLabel {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsFooter extends Components.WcsFooter {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'wcs-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class WcsFooter {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsFormField extends Components.WcsFormField {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['icon', 'isError']
})
@Component({
  selector: 'wcs-form-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['icon', 'isError']
})
export class WcsFormField {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsGalactic extends Components.WcsGalactic {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['text']
})
@Component({
  selector: 'wcs-galactic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['text']
})
export class WcsGalactic {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsGalacticMenu extends Components.WcsGalacticMenu {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['text']
})
@Component({
  selector: 'wcs-galactic-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['text']
})
export class WcsGalacticMenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { WcsGridRowSelectedEventDetails as IGridWcsGridRowSelectedEventDetails } from 'wcs-core';
import type { WcsGridAllRowSelectedEventDetails as IGridWcsGridAllRowSelectedEventDetails } from 'wcs-core';
export declare interface WcsGrid extends Components.WcsGrid {
  /**
   * Event emitted when a row is selected or unselected 
   */
  wcsGridSelectionChange: EventEmitter<CustomEvent<IGridWcsGridRowSelectedEventDetails>>;
  /**
   * Event emitted when all rows are selected or unselected 
   */
  wcsGridAllSelectionChange: EventEmitter<CustomEvent<IGridWcsGridAllRowSelectedEventDetails>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['data', 'loading', 'rowIdPath', 'selectedItems', 'selectionConfig', 'serverMode', 'wcsGridPaginationId']
})
@Component({
  selector: 'wcs-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['data', 'loading', 'rowIdPath', 'selectedItems', 'selectionConfig', 'serverMode', 'wcsGridPaginationId']
})
export class WcsGrid {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsGridSelectionChange', 'wcsGridAllSelectionChange']);
  }
}

import type { WcsGridColumnSortChangeEventDetails as IGridColumnWcsGridColumnSortChangeEventDetails } from 'wcs-core';
export declare interface WcsGridColumn extends Components.WcsGridColumn {
  /**
   *  
   */
  wcsSortChange: EventEmitter<CustomEvent<IGridColumnWcsGridColumnSortChangeEventDetails>>;
  /**
   *  
   */
  wcsHiddenChange: EventEmitter<CustomEvent<boolean>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['customCells', 'formatter', 'hidden', 'name', 'path', 'sort', 'sortFn', 'sortOrder', 'width']
})
@Component({
  selector: 'wcs-grid-column',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['customCells', 'formatter', 'hidden', 'name', 'path', 'sort', 'sortFn', 'sortOrder', 'width']
})
export class WcsGridColumn {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsSortChange', 'wcsHiddenChange']);
  }
}


export declare interface WcsGridCustomCell extends Components.WcsGridCustomCell {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['columnId', 'rowId']
})
@Component({
  selector: 'wcs-grid-custom-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['columnId', 'rowId']
})
export class WcsGridCustomCell {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { WcsGridPaginationChangeEventDetails as IGridPaginationWcsGridPaginationChangeEventDetails } from 'wcs-core';
export declare interface WcsGridPagination extends Components.WcsGridPagination {
  /**
   *  
   */
  wcsGridPaginationChange: EventEmitter<CustomEvent<IGridPaginationWcsGridPaginationChangeEventDetails>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['availablePageSizes', 'currentPage', 'itemsCount', 'pageCount', 'pageSize']
})
@Component({
  selector: 'wcs-grid-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['availablePageSizes', 'currentPage', 'itemsCount', 'pageCount', 'pageSize']
})
export class WcsGridPagination {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsGridPaginationChange']);
  }
}


export declare interface WcsHeader extends Components.WcsHeader {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'wcs-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class WcsHeader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsHint extends Components.WcsHint {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['small']
})
@Component({
  selector: 'wcs-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['small']
})
export class WcsHint {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { HorizontalStepClickEvent as IHorizontalStepperHorizontalStepClickEvent } from 'wcs-core';
export declare interface WcsHorizontalStepper extends Components.WcsHorizontalStepper {
  /**
   * Emits when the user selects a new step. 
   */
  wcsHorizontalStepClick: EventEmitter<CustomEvent<IHorizontalStepperHorizontalStepClickEvent>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['checkOnComplete', 'currentStep', 'mode', 'steps'],
  methods: ['previous', 'next']
})
@Component({
  selector: 'wcs-horizontal-stepper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['checkOnComplete', 'currentStep', 'mode', 'steps']
})
export class WcsHorizontalStepper {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsHorizontalStepClick']);
  }
}


export declare interface WcsIcon extends Components.WcsIcon {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['icon', 'size']
})
@Component({
  selector: 'wcs-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['icon', 'size']
})
export class WcsIcon {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { InputChangeEventDetail as IInputInputChangeEventDetail } from 'wcs-core';
export declare interface WcsInput extends Components.WcsInput {
  /**
   * Emitted when a keyboard input occurred. 
   */
  wcsInput: EventEmitter<CustomEvent<KeyboardEvent>>;
  /**
   * Emitted when the value has changed. 
   */
  wcsChange: EventEmitter<CustomEvent<IInputInputChangeEventDetail>>;
  /**
   * Emitted when the input loses focus. 
   */
  wcsBlur: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Emitted when the input has focus. 
   */
  wcsFocus: EventEmitter<CustomEvent<FocusEvent>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['accept', 'autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'clearInput', 'clearOnEdit', 'debounce', 'disabled', 'enterkeyhint', 'icon', 'inputmode', 'max', 'maxlength', 'min', 'minlength', 'multiple', 'name', 'pattern', 'placeholder', 'prefixLabel', 'readonly', 'required', 'size', 'spellcheck', 'state', 'step', 'suffixLabel', 'type', 'value'],
  methods: ['setFocus', 'getInputElement']
})
@Component({
  selector: 'wcs-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['accept', 'autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'clearInput', 'clearOnEdit', 'debounce', 'disabled', 'enterkeyhint', 'icon', 'inputmode', 'max', 'maxlength', 'min', 'minlength', 'multiple', 'name', 'pattern', 'placeholder', 'prefixLabel', 'readonly', 'required', 'size', 'spellcheck', 'state', 'step', 'suffixLabel', 'type', 'value']
})
export class WcsInput {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsInput', 'wcsChange', 'wcsBlur', 'wcsFocus']);
  }
}


export declare interface WcsLabel extends Components.WcsLabel {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['required']
})
@Component({
  selector: 'wcs-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['required']
})
export class WcsLabel {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsListItem extends Components.WcsListItem {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['activated']
})
@Component({
  selector: 'wcs-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['activated']
})
export class WcsListItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsListItemProperties extends Components.WcsListItemProperties {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'wcs-list-item-properties',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class WcsListItemProperties {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsListItemProperty extends Components.WcsListItemProperty {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'wcs-list-item-property',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class WcsListItemProperty {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsMatIcon extends Components.WcsMatIcon {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['family', 'icon', 'size']
})
@Component({
  selector: 'wcs-mat-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['family', 'icon', 'size']
})
export class WcsMatIcon {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsModal extends Components.WcsModal {
  /**
   * Triggered when the user leaves the dialog with the closing button. 
   */
  wcsDialogClosed: EventEmitter<CustomEvent<void>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['backdrop', 'show', 'showCloseButton']
})
@Component({
  selector: 'wcs-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['backdrop', 'show', 'showCloseButton']
})
export class WcsModal {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsDialogClosed']);
  }
}


export declare interface WcsNav extends Components.WcsNav {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'wcs-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class WcsNav {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsNavItem extends Components.WcsNavItem {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['href', 'text']
})
@Component({
  selector: 'wcs-nav-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['href', 'text']
})
export class WcsNavItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsProgressBar extends Components.WcsProgressBar {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['showLabel', 'small', 'value']
})
@Component({
  selector: 'wcs-progress-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['showLabel', 'small', 'value']
})
export class WcsProgressBar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsProgressRadial extends Components.WcsProgressRadial {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['showLabel', 'size', 'value']
})
@Component({
  selector: 'wcs-progress-radial',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['showLabel', 'size', 'value']
})
export class WcsProgressRadial {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { RadioChosedEvent as IRadioRadioChosedEvent } from 'wcs-core';
export declare interface WcsRadio extends Components.WcsRadio {
  /**
   *  
   */
  wcsRadioClick: EventEmitter<CustomEvent<IRadioRadioChosedEvent>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['checked', 'disabled', 'label', 'mode', 'value']
})
@Component({
  selector: 'wcs-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['checked', 'disabled', 'label', 'mode', 'value']
})
export class WcsRadio {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsRadioClick']);
  }
}

import type { RadioGroupChangeEventDetail as IRadioGroupRadioGroupChangeEventDetail } from 'wcs-core';
export declare interface WcsRadioGroup extends Components.WcsRadioGroup {
  /**
   * Emitted when the value has changed. 
   */
  wcsChange: EventEmitter<CustomEvent<IRadioGroupRadioGroupChangeEventDetail>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['mode', 'name', 'value']
})
@Component({
  selector: 'wcs-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['mode', 'name', 'value']
})
export class WcsRadioGroup {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsChange']);
  }
}

import type { SelectChangeEventDetail as ISelectSelectChangeEventDetail } from 'wcs-core';
export declare interface WcsSelect extends Components.WcsSelect {
  /**
   * Emitted when the value has changed. 
   */
  wcsChange: EventEmitter<CustomEvent<ISelectSelectChangeEventDetail>>;
  /**
   * Emitted when the select has focus. 
   */
  wcsFocus: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the select loses focus. 
   */
  wcsBlur: EventEmitter<CustomEvent<void>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['chips', 'compareWith', 'disabled', 'multiple', 'name', 'placeholder', 'value'],
  methods: ['open', 'close']
})
@Component({
  selector: 'wcs-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['chips', 'compareWith', 'disabled', 'multiple', 'name', 'placeholder', 'value']
})
export class WcsSelect {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsChange', 'wcsFocus', 'wcsBlur']);
  }
}

import type { SelectOptionChosedEvent as ISelectOptionSelectOptionChosedEvent } from 'wcs-core';
export declare interface WcsSelectOption extends Components.WcsSelectOption {
  /**
   *  
   */
  wcsSelectOptionClick: EventEmitter<CustomEvent<ISelectOptionSelectOptionChosedEvent>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['chipBackgroundColor', 'chipColor', 'disabled', 'selected', 'value']
})
@Component({
  selector: 'wcs-select-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['chipBackgroundColor', 'chipColor', 'disabled', 'selected', 'value']
})
export class WcsSelectOption {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsSelectOptionClick']);
  }
}


export declare interface WcsSpinner extends Components.WcsSpinner {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['mode']
})
@Component({
  selector: 'wcs-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['mode']
})
export class WcsSpinner {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { SwitchChangeEventDetail as ISwitchSwitchChangeEventDetail } from 'wcs-core';
export declare interface WcsSwitch extends Components.WcsSwitch {
  /**
   * Emitted when the checked property has changed. 
   */
  wcsChange: EventEmitter<CustomEvent<ISwitchSwitchChangeEventDetail>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['checked', 'disabled', 'labelAlignment', 'name']
})
@Component({
  selector: 'wcs-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['checked', 'disabled', 'labelAlignment', 'name']
})
export class WcsSwitch {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsChange']);
  }
}


export declare interface WcsTab extends Components.WcsTab {
  /**
   * Do not use, meant for internal use only. @inner undefined,@ignore undefined
   */
  tabLoaded: EventEmitter<CustomEvent<void>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['header', 'itemKey']
})
@Component({
  selector: 'wcs-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['header', 'itemKey']
})
export class WcsTab {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tabLoaded']);
  }
}

import type { WcsTabChangeEvent as ITabsWcsTabChangeEvent } from 'wcs-core';
export declare interface WcsTabs extends Components.WcsTabs {
  /**
   * 
Emitted when the selected tab change. 
   */
  tabChange: EventEmitter<CustomEvent<ITabsWcsTabChangeEvent>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['align', 'gutter', 'headersOnly', 'selectedIndex', 'selectedKey']
})
@Component({
  selector: 'wcs-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['align', 'gutter', 'headersOnly', 'selectedIndex', 'selectedKey']
})
export class WcsTabs {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tabChange']);
  }
}

import type { TextareaChangeEventDetail as ITextareaTextareaChangeEventDetail } from 'wcs-core';
export declare interface WcsTextarea extends Components.WcsTextarea {
  /**
   * Emitted when the input value has changed. 
   */
  wcsChange: EventEmitter<CustomEvent<ITextareaTextareaChangeEventDetail>>;
  /**
   * Emitted when a keyboard input occurred. 
   */
  wcsInput: EventEmitter<CustomEvent<KeyboardEvent>>;
  /**
   * Emitted when the input loses focus. 
   */
  wcsBlur: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Emitted when the input has focus. 
   */
  wcsFocus: EventEmitter<CustomEvent<FocusEvent>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['autoGrow', 'autocapitalize', 'autofocus', 'clearOnEdit', 'cols', 'debounce', 'disabled', 'enterkeyhint', 'icon', 'inputmode', 'maxlength', 'minlength', 'name', 'placeholder', 'readonly', 'required', 'rows', 'spellcheck', 'state', 'value', 'wrap'],
  methods: ['fitContent', 'setFocus', 'getInputElement']
})
@Component({
  selector: 'wcs-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['autoGrow', 'autocapitalize', 'autofocus', 'clearOnEdit', 'cols', 'debounce', 'disabled', 'enterkeyhint', 'icon', 'inputmode', 'maxlength', 'minlength', 'name', 'placeholder', 'readonly', 'required', 'rows', 'spellcheck', 'state', 'value', 'wrap']
})
export class WcsTextarea {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsChange', 'wcsInput', 'wcsBlur', 'wcsFocus']);
  }
}


export declare interface WcsTooltip extends Components.WcsTooltip {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['for', 'position']
})
@Component({
  selector: 'wcs-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['for', 'position']
})
export class WcsTooltip {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
