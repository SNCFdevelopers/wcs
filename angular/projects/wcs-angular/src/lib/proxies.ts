/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from 'wcs-core';


@ProxyCmp({
  inputs: ['groupContentWithHeader', 'hideActionText', 'highlight']
})
@Component({
  selector: 'wcs-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['groupContentWithHeader', 'hideActionText', 'highlight'],
})
export class WcsAccordion {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsAccordion extends Components.WcsAccordion {}


@ProxyCmp({
})
@Component({
  selector: 'wcs-accordion-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class WcsAccordionContent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsAccordionContent extends Components.WcsAccordionContent {}


@ProxyCmp({
})
@Component({
  selector: 'wcs-accordion-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class WcsAccordionHeader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsAccordionHeader extends Components.WcsAccordionHeader {}


@ProxyCmp({
  inputs: ['groupContentWithHeader', 'hideActionText', 'highlight', 'open'],
  methods: ['close']
})
@Component({
  selector: 'wcs-accordion-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['groupContentWithHeader', 'hideActionText', 'highlight', 'open'],
})
export class WcsAccordionPanel {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsOpenChange']);
  }
}


export declare interface WcsAccordionPanel extends Components.WcsAccordionPanel {

  wcsOpenChange: EventEmitter<CustomEvent<boolean>>;
}


@ProxyCmp({
  inputs: ['gutter']
})
@Component({
  selector: 'wcs-action-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['gutter'],
})
export class WcsActionBar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsActionBar extends Components.WcsActionBar {}


@ProxyCmp({
})
@Component({
  selector: 'wcs-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class WcsApp {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsApp extends Components.WcsApp {}


@ProxyCmp({
  inputs: ['color', 'shape']
})
@Component({
  selector: 'wcs-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'shape'],
})
export class WcsBadge {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsBadge extends Components.WcsBadge {}


@ProxyCmp({
  inputs: ['disabled', 'href', 'loading', 'mode', 'ripple', 'shape', 'size', 'target', 'type']
})
@Component({
  selector: 'wcs-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'href', 'loading', 'mode', 'ripple', 'shape', 'size', 'target', 'type'],
})
export class WcsButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsButton extends Components.WcsButton {}


@ProxyCmp({
  inputs: ['mode']
})
@Component({
  selector: 'wcs-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['mode'],
})
export class WcsCard {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsCard extends Components.WcsCard {}


@ProxyCmp({
})
@Component({
  selector: 'wcs-card-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class WcsCardBody {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsCardBody extends Components.WcsCardBody {}


@ProxyCmp({
  inputs: ['checked', 'disabled', 'indeterminate', 'labelAlignment', 'name'],
  methods: ['setAriaAttribute']
})
@Component({
  selector: 'wcs-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'indeterminate', 'labelAlignment', 'name'],
})
export class WcsCheckbox {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsChange']);
  }
}


import type { CheckboxChangeEventDetail as IWcsCheckboxCheckboxChangeEventDetail } from 'wcs-core';

export declare interface WcsCheckbox extends Components.WcsCheckbox {
  /**
   * Emitted when the checked property has changed.
   */
  wcsChange: EventEmitter<CustomEvent<IWcsCheckboxCheckboxChangeEventDetail>>;
}


@ProxyCmp({
  inputs: ['appName']
})
@Component({
  selector: 'wcs-com-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appName'],
})
export class WcsComNav {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsComNav extends Components.WcsComNav {}


@ProxyCmp({
  inputs: ['label'],
  methods: ['close', 'open']
})
@Component({
  selector: 'wcs-com-nav-category',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['label'],
})
export class WcsComNavCategory {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsCategoryOpened', 'wcsCategoryItemClicked']);
  }
}


import type { CategoryOpenedEventDetail as IWcsComNavCategoryCategoryOpenedEventDetail } from 'wcs-core';

export declare interface WcsComNavCategory extends Components.WcsComNavCategory {

  wcsCategoryOpened: EventEmitter<CustomEvent<IWcsComNavCategoryCategoryOpenedEventDetail>>;

  wcsCategoryItemClicked: EventEmitter<CustomEvent<UIEvent>>;
}


@ProxyCmp({
  inputs: ['label', 'panelDescription', 'panelTitle'],
  methods: ['close', 'open']
})
@Component({
  selector: 'wcs-com-nav-submenu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['label', 'panelDescription', 'panelTitle'],
})
export class WcsComNavSubmenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsSubmenuOpened', 'wcsClickOnFinalAction']);
  }
}


import type { MenuOpenedEventDetail as IWcsComNavSubmenuMenuOpenedEventDetail } from 'wcs-core';

export declare interface WcsComNavSubmenu extends Components.WcsComNavSubmenu {

  wcsSubmenuOpened: EventEmitter<CustomEvent<IWcsComNavSubmenuMenuOpenedEventDetail>>;
  /**
   * Emitted when a user click on a final navigation action.

Used by the com-nav component to close the mobile menu overlay when a user click on a final action.
   */
  wcsClickOnFinalAction: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['label', 'max', 'min', 'size', 'step', 'value'],
  methods: ['setAriaAttribute']
})
@Component({
  selector: 'wcs-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['label', 'max', 'min', 'size', 'step', 'value'],
})
export class WcsCounter {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsChange', 'wcsBlur']);
  }
}


import type { CounterChangeEventDetail as IWcsCounterCounterChangeEventDetail } from 'wcs-core';

export declare interface WcsCounter extends Components.WcsCounter {
  /**
   * Emitted when the value of the counter has changed.
   */
  wcsChange: EventEmitter<CustomEvent<IWcsCounterCounterChangeEventDetail>>;
  /**
   * Emitted when the counter loses focus.
   */
  wcsBlur: EventEmitter<CustomEvent<FocusEvent>>;
}


@ProxyCmp({
})
@Component({
  selector: 'wcs-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class WcsDivider {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsDivider extends Components.WcsDivider {}


@ProxyCmp({
  inputs: ['disabled', 'mode', 'noArrow', 'placement', 'shape']
})
@Component({
  selector: 'wcs-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'mode', 'noArrow', 'placement', 'shape'],
})
export class WcsDropdown {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsDropdown extends Components.WcsDropdown {}


@ProxyCmp({
})
@Component({
  selector: 'wcs-dropdown-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class WcsDropdownDivider {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsDropdownDivider extends Components.WcsDropdownDivider {}


@ProxyCmp({
})
@Component({
  selector: 'wcs-dropdown-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class WcsDropdownHeader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsDropdownHeader extends Components.WcsDropdownHeader {}


@ProxyCmp({
})
@Component({
  selector: 'wcs-dropdown-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class WcsDropdownItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsDropdownItemClick']);
  }
}


export declare interface WcsDropdownItem extends Components.WcsDropdownItem {
  /**
   * Event emitted when the dropdown item is clicked
   */
  wcsDropdownItemClick: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['errorMsg', 'formatFn', 'label', 'readonly', 'size', 'type', 'validateFn', 'value']
})
@Component({
  selector: 'wcs-editable-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['errorMsg', 'formatFn', 'label', 'readonly', 'size', 'type', 'validateFn', 'value'],
})
export class WcsEditableField {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsChange']);
  }
}


import type { EditableComponentUpdateEvent as IWcsEditableFieldEditableComponentUpdateEvent } from 'wcs-core';

export declare interface WcsEditableField extends Components.WcsEditableField {
  /**
   * event called at each (valid) update of the field.
   */
  wcsChange: EventEmitter<CustomEvent<IWcsEditableFieldEditableComponentUpdateEvent>>;
}


@ProxyCmp({
})
@Component({
  selector: 'wcs-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class WcsError {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsError extends Components.WcsError {}


@ProxyCmp({
})
@Component({
  selector: 'wcs-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class WcsField {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsField extends Components.WcsField {}


@ProxyCmp({
})
@Component({
  selector: 'wcs-field-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class WcsFieldContent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsFieldContent extends Components.WcsFieldContent {}


@ProxyCmp({
})
@Component({
  selector: 'wcs-field-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class WcsFieldLabel {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsFieldLabel extends Components.WcsFieldLabel {}


@ProxyCmp({
})
@Component({
  selector: 'wcs-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class WcsFooter {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsFooter extends Components.WcsFooter {}


@ProxyCmp({
  inputs: ['isError']
})
@Component({
  selector: 'wcs-form-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['isError'],
})
export class WcsFormField {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsFormField extends Components.WcsFormField {}


@ProxyCmp({
  inputs: ['text']
})
@Component({
  selector: 'wcs-galactic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['text'],
})
export class WcsGalactic {
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
  selector: 'wcs-galactic-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['text'],
})
export class WcsGalacticMenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsGalacticMenu extends Components.WcsGalacticMenu {}


@ProxyCmp({
  inputs: ['data', 'loading', 'rowIdPath', 'selectedItems', 'selectionConfig', 'serverMode', 'wcsGridPaginationId']
})
@Component({
  selector: 'wcs-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['data', 'loading', 'rowIdPath', 'selectedItems', 'selectionConfig', 'serverMode', 'wcsGridPaginationId'],
})
export class WcsGrid {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsGridSelectionChange', 'wcsGridAllSelectionChange']);
  }
}


import type { WcsGridRowSelectedEventDetails as IWcsGridWcsGridRowSelectedEventDetails } from 'wcs-core';
import type { WcsGridAllRowSelectedEventDetails as IWcsGridWcsGridAllRowSelectedEventDetails } from 'wcs-core';

export declare interface WcsGrid extends Components.WcsGrid {
  /**
   * Event emitted when a row is selected or unselected
   */
  wcsGridSelectionChange: EventEmitter<CustomEvent<IWcsGridWcsGridRowSelectedEventDetails>>;
  /**
   * Event emitted when all rows are selected or unselected
   */
  wcsGridAllSelectionChange: EventEmitter<CustomEvent<IWcsGridWcsGridAllRowSelectedEventDetails>>;
}


@ProxyCmp({
  inputs: ['customCells', 'formatter', 'hidden', 'name', 'path', 'sort', 'sortFn', 'sortOrder', 'width']
})
@Component({
  selector: 'wcs-grid-column',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['customCells', 'formatter', 'hidden', 'name', 'path', 'sort', 'sortFn', 'sortOrder', 'width'],
})
export class WcsGridColumn {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsSortChange', 'wcsHiddenChange']);
  }
}


import type { WcsGridColumnSortChangeEventDetails as IWcsGridColumnWcsGridColumnSortChangeEventDetails } from 'wcs-core';

export declare interface WcsGridColumn extends Components.WcsGridColumn {
  /**
   * Event emitted when the sort of the column is changed.
   */
  wcsSortChange: EventEmitter<CustomEvent<IWcsGridColumnWcsGridColumnSortChangeEventDetails>>;
  /**
   * Event emitted if the column is dynamically switching visibility.
   */
  wcsHiddenChange: EventEmitter<CustomEvent<boolean>>;
}


@ProxyCmp({
  inputs: ['columnId', 'rowId']
})
@Component({
  selector: 'wcs-grid-custom-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['columnId', 'rowId'],
})
export class WcsGridCustomCell {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsGridCustomCell extends Components.WcsGridCustomCell {}


@ProxyCmp({
  inputs: ['availablePageSizes', 'currentPage', 'itemsCount', 'pageCount', 'pageSize']
})
@Component({
  selector: 'wcs-grid-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['availablePageSizes', 'currentPage', 'itemsCount', 'pageCount', 'pageSize'],
})
export class WcsGridPagination {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsGridPaginationChange']);
  }
}


import type { WcsGridPaginationChangeEventDetails as IWcsGridPaginationWcsGridPaginationChangeEventDetails } from 'wcs-core';

export declare interface WcsGridPagination extends Components.WcsGridPagination {
  /**
   * Event emitted when the pagination changes.
   */
  wcsGridPaginationChange: EventEmitter<CustomEvent<IWcsGridPaginationWcsGridPaginationChangeEventDetails>>;
}


@ProxyCmp({
})
@Component({
  selector: 'wcs-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class WcsHeader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsHeader extends Components.WcsHeader {}


@ProxyCmp({
  inputs: ['small']
})
@Component({
  selector: 'wcs-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['small'],
})
export class WcsHint {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsHint extends Components.WcsHint {}


@ProxyCmp({
  inputs: ['checkOnComplete', 'currentStep', 'mode', 'steps'],
  methods: ['previous', 'next']
})
@Component({
  selector: 'wcs-horizontal-stepper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checkOnComplete', 'currentStep', 'mode', 'steps'],
})
export class WcsHorizontalStepper {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsHorizontalStepClick']);
  }
}


import type { HorizontalStepClickEvent as IWcsHorizontalStepperHorizontalStepClickEvent } from 'wcs-core';

export declare interface WcsHorizontalStepper extends Components.WcsHorizontalStepper {
  /**
   * Emits when the user selects a new step.
   */
  wcsHorizontalStepClick: EventEmitter<CustomEvent<IWcsHorizontalStepperHorizontalStepClickEvent>>;
}


@ProxyCmp({
  inputs: ['icon', 'size']
})
@Component({
  selector: 'wcs-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['icon', 'size'],
})
export class WcsIcon {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsIcon extends Components.WcsIcon {}


@ProxyCmp({
  inputs: ['accept', 'autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'clearInput', 'clearOnEdit', 'debounce', 'disabled', 'enterkeyhint', 'icon', 'inputmode', 'max', 'maxlength', 'min', 'minlength', 'multiple', 'name', 'pattern', 'placeholder', 'prefixLabel', 'readonly', 'required', 'size', 'spellcheck', 'state', 'step', 'suffixLabel', 'type', 'value'],
  methods: ['setFocus', 'getInputElement', 'setAriaAttribute']
})
@Component({
  selector: 'wcs-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['accept', 'autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'clearInput', 'clearOnEdit', 'debounce', 'disabled', 'enterkeyhint', 'icon', 'inputmode', 'max', 'maxlength', 'min', 'minlength', 'multiple', 'name', 'pattern', 'placeholder', 'prefixLabel', 'readonly', 'required', 'size', 'spellcheck', 'state', 'step', 'suffixLabel', 'type', 'value'],
})
export class WcsInput {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsInput', 'wcsChange', 'wcsBlur', 'wcsFocus']);
  }
}


import type { InputChangeEventDetail as IWcsInputInputChangeEventDetail } from 'wcs-core';

export declare interface WcsInput extends Components.WcsInput {
  /**
   * Emitted when a keyboard input occurred. See https://developer.mozilla.org/en-US/docs/Web/Events/input
   */
  wcsInput: EventEmitter<CustomEvent<KeyboardEvent>>;
  /**
   * Emitted when the value has changed. See https://developer.mozilla.org/en-US/docs/Web/Events/change
   */
  wcsChange: EventEmitter<CustomEvent<IWcsInputInputChangeEventDetail>>;
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
  inputs: ['required']
})
@Component({
  selector: 'wcs-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['required'],
})
export class WcsLabel {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsLabel extends Components.WcsLabel {}


@ProxyCmp({
  inputs: ['activated']
})
@Component({
  selector: 'wcs-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['activated'],
})
export class WcsListItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsListItem extends Components.WcsListItem {}


@ProxyCmp({
})
@Component({
  selector: 'wcs-list-item-properties',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class WcsListItemProperties {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsListItemProperties extends Components.WcsListItemProperties {}


@ProxyCmp({
})
@Component({
  selector: 'wcs-list-item-property',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class WcsListItemProperty {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsListItemProperty extends Components.WcsListItemProperty {}


@ProxyCmp({
  inputs: ['family', 'icon', 'size']
})
@Component({
  selector: 'wcs-mat-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['family', 'icon', 'size'],
})
export class WcsMatIcon {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsMatIcon extends Components.WcsMatIcon {}


@ProxyCmp({
  inputs: ['hideActions', 'modalTriggerControlsId', 'show', 'showCloseButton', 'size', 'withoutBackdrop']
})
@Component({
  selector: 'wcs-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['hideActions', 'modalTriggerControlsId', 'show', 'showCloseButton', 'size', 'withoutBackdrop'],
})
export class WcsModal {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsDialogClosed']);
  }
}


export declare interface WcsModal extends Components.WcsModal {
  /**
   * Triggered when the user leaves the dialog with the closing button.
   */
  wcsDialogClosed: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['size'],
  methods: ['setAriaAttribute', 'updateStyles']
})
@Component({
  selector: 'wcs-native-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['size'],
})
export class WcsNativeSelect {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsNativeSelect extends Components.WcsNativeSelect {}


@ProxyCmp({
})
@Component({
  selector: 'wcs-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class WcsNav {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsNav extends Components.WcsNav {}


@ProxyCmp({
  inputs: ['href', 'text']
})
@Component({
  selector: 'wcs-nav-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['href', 'text'],
})
export class WcsNavItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsNavItem extends Components.WcsNavItem {}


@ProxyCmp({
  inputs: ['showLabel', 'small', 'value']
})
@Component({
  selector: 'wcs-progress-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['showLabel', 'small', 'value'],
})
export class WcsProgressBar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsProgressBar extends Components.WcsProgressBar {}


@ProxyCmp({
  inputs: ['showLabel', 'size', 'value']
})
@Component({
  selector: 'wcs-progress-radial',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['showLabel', 'size', 'value'],
})
export class WcsProgressRadial {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsProgressRadial extends Components.WcsProgressRadial {}


@ProxyCmp({
  inputs: ['checked', 'disabled', 'label', 'mode', 'name', 'value']
})
@Component({
  selector: 'wcs-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'label', 'mode', 'name', 'value'],
})
export class WcsRadio {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsRadioClick']);
  }
}


import type { RadioChosedEvent as IWcsRadioRadioChosedEvent } from 'wcs-core';

export declare interface WcsRadio extends Components.WcsRadio {

  wcsRadioClick: EventEmitter<CustomEvent<IWcsRadioRadioChosedEvent>>;
}


@ProxyCmp({
  inputs: ['mode', 'name', 'value'],
  methods: ['setAriaAttribute']
})
@Component({
  selector: 'wcs-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['mode', 'name', 'value'],
})
export class WcsRadioGroup {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsChange']);
  }
}


import type { RadioGroupChangeEventDetail as IWcsRadioGroupRadioGroupChangeEventDetail } from 'wcs-core';

export declare interface WcsRadioGroup extends Components.WcsRadioGroup {
  /**
   * Emitted when the value has changed.
   */
  wcsChange: EventEmitter<CustomEvent<IWcsRadioGroupRadioGroupChangeEventDetail>>;
}


@ProxyCmp({
  inputs: ['autocomplete', 'chips', 'compareWith', 'disabled', 'filterFn', 'multiple', 'name', 'placeholder', 'size', 'value'],
  methods: ['open', 'close', 'setAriaAttribute']
})
@Component({
  selector: 'wcs-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autocomplete', 'chips', 'compareWith', 'disabled', 'filterFn', 'multiple', 'name', 'placeholder', 'size', 'value'],
})
export class WcsSelect {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsChange', 'wcsFocus', 'wcsBlur', 'wcsFilterChange']);
  }
}


import type { SelectChangeEventDetail as IWcsSelectSelectChangeEventDetail } from 'wcs-core';
import type { SelectFilerChangeEventDetail as IWcsSelectSelectFilerChangeEventDetail } from 'wcs-core';

export declare interface WcsSelect extends Components.WcsSelect {
  /**
   * Emitted when the value has changed.
   */
  wcsChange: EventEmitter<CustomEvent<IWcsSelectSelectChangeEventDetail>>;
  /**
   * Emitted when the select has focus.
   */
  wcsFocus: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the select loses focus.
   */
  wcsBlur: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the autocomplete filter has changed.
   */
  wcsFilterChange: EventEmitter<CustomEvent<IWcsSelectSelectFilerChangeEventDetail>>;
}


@ProxyCmp({
  inputs: ['chipBackgroundColor', 'chipColor', 'disabled', 'selected', 'value']
})
@Component({
  selector: 'wcs-select-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['chipBackgroundColor', 'chipColor', 'disabled', 'selected', 'value'],
})
export class WcsSelectOption {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsSelectOptionClick']);
  }
}


import type { SelectOptionChosedEvent as IWcsSelectOptionSelectOptionChosedEvent } from 'wcs-core';

export declare interface WcsSelectOption extends Components.WcsSelectOption {

  wcsSelectOptionClick: EventEmitter<CustomEvent<IWcsSelectOptionSelectOptionChosedEvent>>;
}


@ProxyCmp({
  inputs: ['animation', 'radius']
})
@Component({
  selector: 'wcs-skeleton-circle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['animation', 'radius'],
})
export class WcsSkeletonCircle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsSkeletonCircle extends Components.WcsSkeletonCircle {}


@ProxyCmp({
  inputs: ['animation', 'height', 'rounded', 'width']
})
@Component({
  selector: 'wcs-skeleton-rectangle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['animation', 'height', 'rounded', 'width'],
})
export class WcsSkeletonRectangle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsSkeletonRectangle extends Components.WcsSkeletonRectangle {}


@ProxyCmp({
  inputs: ['animation', 'height']
})
@Component({
  selector: 'wcs-skeleton-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['animation', 'height'],
})
export class WcsSkeletonText {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsSkeletonText extends Components.WcsSkeletonText {}


@ProxyCmp({
  inputs: ['mode']
})
@Component({
  selector: 'wcs-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['mode'],
})
export class WcsSpinner {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsSpinner extends Components.WcsSpinner {}


@ProxyCmp({
  inputs: ['checked', 'disabled', 'labelAlignment', 'name'],
  methods: ['setAriaAttribute']
})
@Component({
  selector: 'wcs-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'labelAlignment', 'name'],
})
export class WcsSwitch {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsChange']);
  }
}


import type { SwitchChangeEventDetail as IWcsSwitchSwitchChangeEventDetail } from 'wcs-core';

export declare interface WcsSwitch extends Components.WcsSwitch {
  /**
   * Emitted when the checked property has changed.
   */
  wcsChange: EventEmitter<CustomEvent<IWcsSwitchSwitchChangeEventDetail>>;
}


@ProxyCmp({
  inputs: ['header', 'itemKey']
})
@Component({
  selector: 'wcs-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['header', 'itemKey'],
})
export class WcsTab {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tabLoaded']);
  }
}


export declare interface WcsTab extends Components.WcsTab {
  /**
   * Do not use, meant for internal use only. @inner undefined,@ignore undefined
   */
  tabLoaded: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['align', 'description', 'gutter', 'headersOnly', 'selectedIndex', 'selectedKey']
})
@Component({
  selector: 'wcs-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['align', 'description', 'gutter', 'headersOnly', 'selectedIndex', 'selectedKey'],
})
export class WcsTabs {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tabChange']);
  }
}


import type { WcsTabChangeEvent as IWcsTabsWcsTabChangeEvent } from 'wcs-core';

export declare interface WcsTabs extends Components.WcsTabs {
  /**
   * 
Emitted when the selected tab change.
   */
  tabChange: EventEmitter<CustomEvent<IWcsTabsWcsTabChangeEvent>>;
}


@ProxyCmp({
  inputs: ['autoGrow', 'autocapitalize', 'autofocus', 'clearOnEdit', 'cols', 'debounce', 'disabled', 'enterkeyhint', 'icon', 'inputmode', 'maxlength', 'minlength', 'name', 'placeholder', 'readonly', 'required', 'resize', 'rows', 'spellcheck', 'state', 'value', 'wrap'],
  methods: ['setAriaAttribute', 'fitContent', 'setFocus', 'getInputElement']
})
@Component({
  selector: 'wcs-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoGrow', 'autocapitalize', 'autofocus', 'clearOnEdit', 'cols', 'debounce', 'disabled', 'enterkeyhint', 'icon', 'inputmode', 'maxlength', 'minlength', 'name', 'placeholder', 'readonly', 'required', 'resize', 'rows', 'spellcheck', 'state', 'value', 'wrap'],
})
export class WcsTextarea {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['wcsChange', 'wcsInput', 'wcsBlur', 'wcsFocus']);
  }
}


import type { TextareaChangeEventDetail as IWcsTextareaTextareaChangeEventDetail } from 'wcs-core';

export declare interface WcsTextarea extends Components.WcsTextarea {
  /**
   * Emitted when the input value has changed.
   */
  wcsChange: EventEmitter<CustomEvent<IWcsTextareaTextareaChangeEventDetail>>;
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
  inputs: ['appendTo', 'content', 'delay', 'duration', 'for', 'interactive', 'maxWidth', 'position', 'theme', 'trigger'],
  methods: ['hide', 'show', 'disable', 'enable']
})
@Component({
  selector: 'wcs-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appendTo', 'content', 'delay', 'duration', 'for', 'interactive', 'maxWidth', 'position', 'theme', 'trigger'],
})
export class WcsTooltip {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WcsTooltip extends Components.WcsTooltip {}


