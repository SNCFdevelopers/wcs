/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from 'wcs-core';


export declare interface WcsActionBar extends Components.WcsActionBar {}
@ProxyCmp({
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

import { CheckboxChangeEventDetail as ICheckboxCheckboxChangeEventDetail } from 'wcs-core/dist/types/components/checkbox/checkbox-interface';
export declare interface WcsCheckbox extends Components.WcsCheckbox {}
@ProxyCmp({
  inputs: ['checked', 'indeterminate', 'labelAlignment', 'name']
})
@Component({
  selector: 'wcs-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['checked', 'indeterminate', 'labelAlignment', 'name'],
  outputs: ['wcsChange']
})
export class WcsCheckbox {
  /** Emitted when the checked property has changed. */
  wcsChange!: EventEmitter<CustomEvent<ICheckboxCheckboxChangeEventDetail>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsChange']);
  }
}


export declare interface WcsComNav extends Components.WcsComNav {}
@ProxyCmp({
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

import { CategoryOpenedEventDetail as IComNavCategoryCategoryOpenedEventDetail } from 'wcs-core/dist/types/components/com-nav/com-nav-interface';
export declare interface WcsComNavCategory extends Components.WcsComNavCategory {}
@ProxyCmp({
  inputs: ['label'],
  methods: ['close', 'open']
})
@Component({
  selector: 'wcs-com-nav-category',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['label'],
  outputs: ['wcsCategoryOpened', 'wcsCategoryItemClicked']
})
export class WcsComNavCategory {
  /**  */
  wcsCategoryOpened!: EventEmitter<CustomEvent<IComNavCategoryCategoryOpenedEventDetail>>;
  /**  */
  wcsCategoryItemClicked!: EventEmitter<CustomEvent<MouseEvent>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsCategoryOpened', 'wcsCategoryItemClicked']);
  }
}

import { MenuOpenedEventDetail as IComNavSubmenuMenuOpenedEventDetail } from 'wcs-core/dist/types/components/com-nav/com-nav-interface';
export declare interface WcsComNavSubmenu extends Components.WcsComNavSubmenu {}
@ProxyCmp({
  inputs: ['label', 'panelDescription', 'panelTitle'],
  methods: ['close', 'open']
})
@Component({
  selector: 'wcs-com-nav-submenu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['label', 'panelDescription', 'panelTitle'],
  outputs: ['wcsSubmenuOpened']
})
export class WcsComNavSubmenu {
  /**  */
  wcsSubmenuOpened!: EventEmitter<CustomEvent<IComNavSubmenuMenuOpenedEventDetail>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsSubmenuOpened']);
  }
}


export declare interface WcsDivider extends Components.WcsDivider {}

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


export declare interface WcsDropdownItem extends Components.WcsDropdownItem {}

@Component({
  selector: 'wcs-dropdown-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  outputs: ['wcsDropdownItemClick']
})
export class WcsDropdownItem {
  /**  */
  wcsDropdownItemClick!: EventEmitter<CustomEvent<void>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsDropdownItemClick']);
  }
}

import { EditableComponentUpdateEvent as IEditableFieldEditableComponentUpdateEvent } from 'wcs-core/dist/types/components/editable-field/editable-field-interface';
export declare interface WcsEditableField extends Components.WcsEditableField {}
@ProxyCmp({
  inputs: ['errorMsg', 'formatFn', 'label', 'readonly', 'type', 'validateFn', 'value']
})
@Component({
  selector: 'wcs-editable-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['errorMsg', 'formatFn', 'label', 'readonly', 'type', 'validateFn', 'value'],
  outputs: ['wcsChange']
})
export class WcsEditableField {
  /** event called at each (valid) update of the field. */
  wcsChange!: EventEmitter<CustomEvent<IEditableFieldEditableComponentUpdateEvent>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsChange']);
  }
}


export declare interface WcsError extends Components.WcsError {}

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

import { WcsGridRowSelectedEventDetails as IGridWcsGridRowSelectedEventDetails } from 'wcs-core/dist/types/components/grid/grid-interface';
import { WcsGridAllRowSelectedEventDetails as IGridWcsGridAllRowSelectedEventDetails } from 'wcs-core/dist/types/components/grid/grid-interface';
export declare interface WcsGrid extends Components.WcsGrid {}
@ProxyCmp({
  inputs: ['data', 'loading', 'rowIdPath', 'selectedItems', 'selectionConfig', 'serverMode', 'wcsGridPaginationId']
})
@Component({
  selector: 'wcs-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['data', 'loading', 'rowIdPath', 'selectedItems', 'selectionConfig', 'serverMode', 'wcsGridPaginationId'],
  outputs: ['wcsGridSelectionChange', 'wcsGridAllSelectionChange']
})
export class WcsGrid {
  /** Event emitted when a row is selected or unselected */
  wcsGridSelectionChange!: EventEmitter<CustomEvent<IGridWcsGridRowSelectedEventDetails>>;
  /** Event emitted when all rows are selected or unselected */
  wcsGridAllSelectionChange!: EventEmitter<CustomEvent<IGridWcsGridAllRowSelectedEventDetails>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsGridSelectionChange', 'wcsGridAllSelectionChange']);
  }
}

import { WcsGridColumnSortChangeEventDetails as IGridColumnWcsGridColumnSortChangeEventDetails } from 'wcs-core/dist/types/components/grid/grid-interface';
export declare interface WcsGridColumn extends Components.WcsGridColumn {}
@ProxyCmp({
  inputs: ['customCells', 'formatter', 'hidden', 'name', 'path', 'sort', 'sortFn', 'sortOrder', 'width']
})
@Component({
  selector: 'wcs-grid-column',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['customCells', 'formatter', 'hidden', 'name', 'path', 'sort', 'sortFn', 'sortOrder', 'width'],
  outputs: ['wcsSortChange', 'wcsHiddenChange']
})
export class WcsGridColumn {
  /**  */
  wcsSortChange!: EventEmitter<CustomEvent<IGridColumnWcsGridColumnSortChangeEventDetails>>;
  /**  */
  wcsHiddenChange!: EventEmitter<CustomEvent<boolean>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsSortChange', 'wcsHiddenChange']);
  }
}


export declare interface WcsGridCustomCell extends Components.WcsGridCustomCell {}
@ProxyCmp({
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

import { WcsGridPaginationChangeEventDetails as IGridPaginationWcsGridPaginationChangeEventDetails } from 'wcs-core/dist/types/components/grid/grid-interface';
export declare interface WcsGridPagination extends Components.WcsGridPagination {}
@ProxyCmp({
  inputs: ['availablePageSizes', 'currentPage', 'itemsCount', 'pageCount', 'pageSize']
})
@Component({
  selector: 'wcs-grid-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['availablePageSizes', 'currentPage', 'itemsCount', 'pageCount', 'pageSize'],
  outputs: ['wcsGridPaginationChange']
})
export class WcsGridPagination {
  /**  */
  wcsGridPaginationChange!: EventEmitter<CustomEvent<IGridPaginationWcsGridPaginationChangeEventDetails>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsGridPaginationChange']);
  }
}


export declare interface WcsHeader extends Components.WcsHeader {}

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

import { HorizontalStepClickEvent as IHorizontalStepperHorizontalStepClickEvent } from 'wcs-core/dist/types/components/horizontal-stepper/horizontal-stepper-interface';
export declare interface WcsHorizontalStepper extends Components.WcsHorizontalStepper {}
@ProxyCmp({
  inputs: ['checkOnComplete', 'currentStep', 'mode', 'steps'],
  methods: ['previous', 'next']
})
@Component({
  selector: 'wcs-horizontal-stepper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['checkOnComplete', 'currentStep', 'mode', 'steps'],
  outputs: ['wcsHorizontalStepClick']
})
export class WcsHorizontalStepper {
  /** Emits when the user selects a new step. */
  wcsHorizontalStepClick!: EventEmitter<CustomEvent<IHorizontalStepperHorizontalStepClickEvent>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsHorizontalStepClick']);
  }
}


export declare interface WcsIcon extends Components.WcsIcon {}
@ProxyCmp({
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

import { InputChangeEventDetail as IInputInputChangeEventDetail } from 'wcs-core/dist/types/components/input/input-interface';
export declare interface WcsInput extends Components.WcsInput {}
@ProxyCmp({
  inputs: ['accept', 'autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'clearInput', 'clearOnEdit', 'debounce', 'disabled', 'enterkeyhint', 'icon', 'inputmode', 'max', 'maxlength', 'min', 'minlength', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'size', 'spellcheck', 'state', 'step', 'type', 'value'],
  methods: ['setFocus', 'getInputElement']
})
@Component({
  selector: 'wcs-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['accept', 'autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'clearInput', 'clearOnEdit', 'debounce', 'disabled', 'enterkeyhint', 'icon', 'inputmode', 'max', 'maxlength', 'min', 'minlength', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'size', 'spellcheck', 'state', 'step', 'type', 'value'],
  outputs: ['wcsInput', 'wcsChange', 'wcsBlur', 'wcsFocus']
})
export class WcsInput {
  /** Emitted when a keyboard input occurred. */
  wcsInput!: EventEmitter<CustomEvent<KeyboardEvent>>;
  /** Emitted when the value has changed. */
  wcsChange!: EventEmitter<CustomEvent<IInputInputChangeEventDetail>>;
  /** Emitted when the input loses focus. */
  wcsBlur!: EventEmitter<CustomEvent<FocusEvent>>;
  /** Emitted when the input has focus. */
  wcsFocus!: EventEmitter<CustomEvent<FocusEvent>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsInput', 'wcsChange', 'wcsBlur', 'wcsFocus']);
  }
}


export declare interface WcsLabel extends Components.WcsLabel {}
@ProxyCmp({
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


export declare interface WcsModal extends Components.WcsModal {}
@ProxyCmp({
  inputs: ['backdrop', 'show', 'showCloseButton']
})
@Component({
  selector: 'wcs-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['backdrop', 'show', 'showCloseButton'],
  outputs: ['wcsDialogClosed']
})
export class WcsModal {
  /** Triggered when the user leaves the dialog with the closing button. */
  wcsDialogClosed!: EventEmitter<CustomEvent<void>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsDialogClosed']);
  }
}


export declare interface WcsNav extends Components.WcsNav {}

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

import { RadioChosedEvent as IRadioRadioChosedEvent } from 'wcs-core/dist/types/components/radio/radio-interface';
export declare interface WcsRadio extends Components.WcsRadio {}
@ProxyCmp({
  inputs: ['checked', 'disabled', 'label', 'mode', 'value']
})
@Component({
  selector: 'wcs-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['checked', 'disabled', 'label', 'mode', 'value'],
  outputs: ['wcsRadioClick']
})
export class WcsRadio {
  /**  */
  wcsRadioClick!: EventEmitter<CustomEvent<IRadioRadioChosedEvent>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsRadioClick']);
  }
}

import { RadioGroupChangeEventDetail as IRadioGroupRadioGroupChangeEventDetail } from 'wcs-core/dist/types/components/radio-group/radio-group-interface';
export declare interface WcsRadioGroup extends Components.WcsRadioGroup {}
@ProxyCmp({
  inputs: ['mode', 'name', 'value']
})
@Component({
  selector: 'wcs-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['mode', 'name', 'value'],
  outputs: ['wcsChange']
})
export class WcsRadioGroup {
  /** Emitted when the value has changed. */
  wcsChange!: EventEmitter<CustomEvent<IRadioGroupRadioGroupChangeEventDetail>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsChange']);
  }
}

import { SelectChangeEventDetail as ISelectSelectChangeEventDetail } from 'wcs-core/dist/types/components/select/select-interface';
export declare interface WcsSelect extends Components.WcsSelect {}
@ProxyCmp({
  inputs: ['chips', 'compareWith', 'disabled', 'multiple', 'name', 'placeholder', 'value'],
  methods: ['open', 'close']
})
@Component({
  selector: 'wcs-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['chips', 'compareWith', 'disabled', 'multiple', 'name', 'placeholder', 'value'],
  outputs: ['wcsChange', 'wcsFocus', 'wcsBlur']
})
export class WcsSelect {
  /** Emitted when the value has changed. */
  wcsChange!: EventEmitter<CustomEvent<ISelectSelectChangeEventDetail>>;
  /** Emitted when the select has focus. */
  wcsFocus!: EventEmitter<CustomEvent<void>>;
  /** Emitted when the select loses focus. */
  wcsBlur!: EventEmitter<CustomEvent<void>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsChange', 'wcsFocus', 'wcsBlur']);
  }
}

import { SelectOptionChosedEvent as ISelectOptionSelectOptionChosedEvent } from 'wcs-core/dist/types/components/select-option/select-option-interface';
export declare interface WcsSelectOption extends Components.WcsSelectOption {}
@ProxyCmp({
  inputs: ['chipBackgroundColor', 'chipColor', 'disabled', 'selected', 'value']
})
@Component({
  selector: 'wcs-select-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['chipBackgroundColor', 'chipColor', 'disabled', 'selected', 'value'],
  outputs: ['wcsSelectOptionClick']
})
export class WcsSelectOption {
  /**  */
  wcsSelectOptionClick!: EventEmitter<CustomEvent<ISelectOptionSelectOptionChosedEvent>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsSelectOptionClick']);
  }
}


export declare interface WcsSpinner extends Components.WcsSpinner {}
@ProxyCmp({
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

import { SwitchChangeEventDetail as ISwitchSwitchChangeEventDetail } from 'wcs-core/dist/types/components/switch/switch-interface';
export declare interface WcsSwitch extends Components.WcsSwitch {}
@ProxyCmp({
  inputs: ['checked', 'name']
})
@Component({
  selector: 'wcs-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['checked', 'name'],
  outputs: ['wcsChange']
})
export class WcsSwitch {
  /** Emitted when the checked property has changed. */
  wcsChange!: EventEmitter<CustomEvent<ISwitchSwitchChangeEventDetail>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsChange']);
  }
}


export declare interface WcsTab extends Components.WcsTab {}
@ProxyCmp({
  inputs: ['header', 'itemKey']
})
@Component({
  selector: 'wcs-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['header', 'itemKey'],
  outputs: ['tabLoaded']
})
export class WcsTab {
  /** Do not use, meant for internal use only. @inner undefined,@ignore undefined*/
  tabLoaded!: EventEmitter<CustomEvent<void>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tabLoaded']);
  }
}

import { WcsTabChangeEvent as ITabsWcsTabChangeEvent } from 'wcs-core/dist/types/components/tabs/tabs-interface';
export declare interface WcsTabs extends Components.WcsTabs {}
@ProxyCmp({
  inputs: ['align', 'gutter', 'headersOnly', 'selectedIndex', 'selectedKey']
})
@Component({
  selector: 'wcs-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['align', 'gutter', 'headersOnly', 'selectedIndex', 'selectedKey'],
  outputs: ['tabChange']
})
export class WcsTabs {
  /** 
Emitted when the selected tab change. */
  tabChange!: EventEmitter<CustomEvent<ITabsWcsTabChangeEvent>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tabChange']);
  }
}

import { TextareaChangeEventDetail as ITextareaTextareaChangeEventDetail } from 'wcs-core/dist/types/components/textarea/textarea-interface';
export declare interface WcsTextarea extends Components.WcsTextarea {}
@ProxyCmp({
  inputs: ['autoGrow', 'autocapitalize', 'autofocus', 'clearOnEdit', 'cols', 'debounce', 'disabled', 'enterkeyhint', 'icon', 'inputmode', 'maxlength', 'minlength', 'name', 'placeholder', 'readonly', 'required', 'rows', 'spellcheck', 'state', 'value', 'wrap'],
  methods: ['fitContent', 'setFocus', 'getInputElement']
})
@Component({
  selector: 'wcs-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['autoGrow', 'autocapitalize', 'autofocus', 'clearOnEdit', 'cols', 'debounce', 'disabled', 'enterkeyhint', 'icon', 'inputmode', 'maxlength', 'minlength', 'name', 'placeholder', 'readonly', 'required', 'rows', 'spellcheck', 'state', 'value', 'wrap'],
  outputs: ['wcsChange', 'wcsInput', 'wcsBlur', 'wcsFocus']
})
export class WcsTextarea {
  /** Emitted when the input value has changed. */
  wcsChange!: EventEmitter<CustomEvent<ITextareaTextareaChangeEventDetail>>;
  /** Emitted when a keyboard input occurred. */
  wcsInput!: EventEmitter<CustomEvent<KeyboardEvent>>;
  /** Emitted when the input loses focus. */
  wcsBlur!: EventEmitter<CustomEvent<FocusEvent>>;
  /** Emitted when the input has focus. */
  wcsFocus!: EventEmitter<CustomEvent<FocusEvent>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsChange', 'wcsInput', 'wcsBlur', 'wcsFocus']);
  }
}


export declare interface WcsTooltip extends Components.WcsTooltip {}
@ProxyCmp({
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
