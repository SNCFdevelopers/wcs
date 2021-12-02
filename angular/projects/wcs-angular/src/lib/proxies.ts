/* eslint-disable */
/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from "@angular/core";
import { fromEvent } from "rxjs";
export const proxyInputs = (Cmp: any, inputs: string[]) => {
  const Prototype = Cmp.prototype;
  inputs.forEach(item => {
    Object.defineProperty(Prototype, item, {
      get() {
        return this.el[item];
      },
      set(val: any) {
        this.z.runOutsideAngular(() => (this.el[item] = val));
      }
    });
  });
};
export const proxyMethods = (Cmp: any, methods: string[]) => {
  const Prototype = Cmp.prototype;
  methods.forEach(methodName => {
    Prototype[methodName] = function () {
      const args = arguments;
      return this.z.runOutsideAngular(() => this.el[methodName].apply(this.el, args));
    };
  });
};
export const proxyOutputs = (instance: any, el: any, events: string[]) => {
  events.forEach(eventName => instance[eventName] = fromEvent(el, eventName));
};
function ProxyCmp(opts: {
  inputs?: any;
  methods?: any;
}) {
  const decorator = function (cls: any) {
    if (opts.inputs) {
      proxyInputs(cls, opts.inputs);
    }
    if (opts.methods) {
      proxyMethods(cls, opts.methods);
    }
    return cls;
  };
  return decorator;
}
import { Components } from "wcs-core";
export declare interface WcsActionBar extends Components.WcsActionBar {
}
@ProxyCmp({ inputs: ["gutter"] })
@Component({ selector: "wcs-action-bar", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["gutter"] })
export class WcsActionBar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsApp extends Components.WcsApp {
}
@Component({ selector: "wcs-app", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
export class WcsApp {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsBadge extends Components.WcsBadge {
}
@ProxyCmp({ inputs: ["color", "shape"] })
@Component({ selector: "wcs-badge", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "shape"] })
export class WcsBadge {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsButton extends Components.WcsButton {
}
@ProxyCmp({ inputs: ["disabled", "href", "mode", "ripple", "shape", "type"] })
@Component({ selector: "wcs-button", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["disabled", "href", "mode", "ripple", "shape", "type"] })
export class WcsButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsCard extends Components.WcsCard {
}
@ProxyCmp({ inputs: ["mode"] })
@Component({ selector: "wcs-card", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["mode"] })
export class WcsCard {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsCardBody extends Components.WcsCardBody {
}
@Component({ selector: "wcs-card-body", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
export class WcsCardBody {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsCheckbox extends Components.WcsCheckbox {
}
@ProxyCmp({ inputs: ["checked", "indeterminate", "labelAlignment", "name"] })
@Component({ selector: "wcs-checkbox", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["checked", "indeterminate", "labelAlignment", "name"] })
export class WcsCheckbox {
  wcsChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["wcsChange"]);
  }
}
export declare interface WcsComNav extends Components.WcsComNav {
}
@ProxyCmp({ inputs: ["appName"] })
@Component({ selector: "wcs-com-nav", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["appName"] })
export class WcsComNav {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsComNavCategory extends Components.WcsComNavCategory {
}
@ProxyCmp({ inputs: ["label"], "methods": ["close", "open"] })
@Component({ selector: "wcs-com-nav-category", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["label"] })
export class WcsComNavCategory {
  wcsCategoryOpened!: EventEmitter<CustomEvent>;
  wcsCategoryItemClicked!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["wcsCategoryOpened", "wcsCategoryItemClicked"]);
  }
}
export declare interface WcsComNavSubmenu extends Components.WcsComNavSubmenu {
}
@ProxyCmp({ inputs: ["label", "panelDescription", "panelTitle"], "methods": ["close", "open"] })
@Component({ selector: "wcs-com-nav-submenu", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["label", "panelDescription", "panelTitle"] })
export class WcsComNavSubmenu {
  wcsSubmenuOpened!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["wcsSubmenuOpened"]);
  }
}
export declare interface WcsDivider extends Components.WcsDivider {
}
@Component({ selector: "wcs-divider", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
export class WcsDivider {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsDropdown extends Components.WcsDropdown {
}
@ProxyCmp({ inputs: ["disabled", "mode", "noArrow", "placement", "shape"] })
@Component({ selector: "wcs-dropdown", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["disabled", "mode", "noArrow", "placement", "shape"] })
export class WcsDropdown {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsDropdownDivider extends Components.WcsDropdownDivider {
}
@Component({ selector: "wcs-dropdown-divider", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
export class WcsDropdownDivider {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsDropdownHeader extends Components.WcsDropdownHeader {
}
@Component({ selector: "wcs-dropdown-header", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
export class WcsDropdownHeader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsDropdownItem extends Components.WcsDropdownItem {
}
@Component({ selector: "wcs-dropdown-item", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
export class WcsDropdownItem {
  wcsDropdownItemClick!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["wcsDropdownItemClick"]);
  }
}
export declare interface WcsEditableField extends Components.WcsEditableField {
}
@ProxyCmp({ inputs: ["errorMsg", "formatFn", "label", "readonly", "type", "validateFn", "value"] })
@Component({ selector: "wcs-editable-field", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["errorMsg", "formatFn", "label", "readonly", "type", "validateFn", "value"] })
export class WcsEditableField {
  wcsChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["wcsChange"]);
  }
}
export declare interface WcsError extends Components.WcsError {
}
@Component({ selector: "wcs-error", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
export class WcsError {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsField extends Components.WcsField {
}
@Component({ selector: "wcs-field", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
export class WcsField {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsFieldContent extends Components.WcsFieldContent {
}
@Component({ selector: "wcs-field-content", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
export class WcsFieldContent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsFieldLabel extends Components.WcsFieldLabel {
}
@Component({ selector: "wcs-field-label", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
export class WcsFieldLabel {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsFooter extends Components.WcsFooter {
}
@Component({ selector: "wcs-footer", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
export class WcsFooter {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsFormField extends Components.WcsFormField {
}
@ProxyCmp({ inputs: ["icon", "isError"] })
@Component({ selector: "wcs-form-field", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["icon", "isError"] })
export class WcsFormField {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsGalactic extends Components.WcsGalactic {
}
@ProxyCmp({ inputs: ["text"] })
@Component({ selector: "wcs-galactic", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["text"] })
export class WcsGalactic {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsGalacticMenu extends Components.WcsGalacticMenu {
}
@ProxyCmp({ inputs: ["text"] })
@Component({ selector: "wcs-galactic-menu", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["text"] })
export class WcsGalacticMenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsGrid extends Components.WcsGrid {
}
@ProxyCmp({ inputs: ["data", "loading", "rowIdPath", "selectedItems", "selectionConfig", "serverMode", "wcsGridPaginationId"] })
@Component({ selector: "wcs-grid", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["data", "loading", "rowIdPath", "selectedItems", "selectionConfig", "serverMode", "wcsGridPaginationId"] })
export class WcsGrid {
  wcsGridSelectionChange!: EventEmitter<CustomEvent>;
  wcsGridAllSelectionChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["wcsGridSelectionChange", "wcsGridAllSelectionChange"]);
  }
}
export declare interface WcsGridColumn extends Components.WcsGridColumn {
}
@ProxyCmp({ inputs: ["customCells", "formatter", "hidden", "name", "path", "sort", "sortFn", "sortOrder", "width"] })
@Component({ selector: "wcs-grid-column", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["customCells", "formatter", "hidden", "name", "path", "sort", "sortFn", "sortOrder", "width"] })
export class WcsGridColumn {
  wcsSortChange!: EventEmitter<CustomEvent>;
  wcsHiddenChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["wcsSortChange", "wcsHiddenChange"]);
  }
}
export declare interface WcsGridCustomCell extends Components.WcsGridCustomCell {
}
@ProxyCmp({ inputs: ["columnId", "rowId"] })
@Component({ selector: "wcs-grid-custom-cell", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["columnId", "rowId"] })
export class WcsGridCustomCell {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsGridPagination extends Components.WcsGridPagination {
}
@ProxyCmp({ inputs: ["availablePageSizes", "currentPage", "itemsCount", "pageCount", "pageSize"] })
@Component({ selector: "wcs-grid-pagination", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["availablePageSizes", "currentPage", "itemsCount", "pageCount", "pageSize"] })
export class WcsGridPagination {
  wcsGridPaginationChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["wcsGridPaginationChange"]);
  }
}
export declare interface WcsHeader extends Components.WcsHeader {
}
@Component({ selector: "wcs-header", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
export class WcsHeader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsHint extends Components.WcsHint {
}
@ProxyCmp({ inputs: ["small"] })
@Component({ selector: "wcs-hint", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["small"] })
export class WcsHint {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsHorizontalStepper extends Components.WcsHorizontalStepper {
}
@ProxyCmp({ inputs: ["checkOnComplete", "currentStep", "mode", "steps"], "methods": ["previous", "next"] })
@Component({ selector: "wcs-horizontal-stepper", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["checkOnComplete", "currentStep", "mode", "steps"] })
export class WcsHorizontalStepper {
  wcsHorizontalStepClick!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["wcsHorizontalStepClick"]);
  }
}
export declare interface WcsIcon extends Components.WcsIcon {
}
@ProxyCmp({ inputs: ["icon", "size"] })
@Component({ selector: "wcs-icon", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["icon", "size"] })
export class WcsIcon {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsInput extends Components.WcsInput {
}
@ProxyCmp({ inputs: ["accept", "autocapitalize", "autocomplete", "autocorrect", "autofocus", "clearInput", "clearOnEdit", "debounce", "disabled", "enterkeyhint", "icon", "inputmode", "max", "maxlength", "min", "minlength", "multiple", "name", "pattern", "placeholder", "readonly", "required", "size", "spellcheck", "state", "step", "type", "value"], "methods": ["setFocus", "getInputElement"] })
@Component({ selector: "wcs-input", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["accept", "autocapitalize", "autocomplete", "autocorrect", "autofocus", "clearInput", "clearOnEdit", "debounce", "disabled", "enterkeyhint", "icon", "inputmode", "max", "maxlength", "min", "minlength", "multiple", "name", "pattern", "placeholder", "readonly", "required", "size", "spellcheck", "state", "step", "type", "value"] })
export class WcsInput {
  wcsInput!: EventEmitter<CustomEvent>;
  wcsChange!: EventEmitter<CustomEvent>;
  wcsBlur!: EventEmitter<CustomEvent>;
  wcsFocus!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["wcsInput", "wcsChange", "wcsBlur", "wcsFocus"]);
  }
}
export declare interface WcsLabel extends Components.WcsLabel {
}
@ProxyCmp({ inputs: ["required"] })
@Component({ selector: "wcs-label", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["required"] })
export class WcsLabel {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsListItem extends Components.WcsListItem {
}
@ProxyCmp({ inputs: ["activated"] })
@Component({ selector: "wcs-list-item", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["activated"] })
export class WcsListItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsListItemProperties extends Components.WcsListItemProperties {
}
@Component({ selector: "wcs-list-item-properties", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
export class WcsListItemProperties {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsListItemProperty extends Components.WcsListItemProperty {
}
@Component({ selector: "wcs-list-item-property", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
export class WcsListItemProperty {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsMatIcon extends Components.WcsMatIcon {
}
@ProxyCmp({ inputs: ["family", "icon", "size"] })
@Component({ selector: "wcs-mat-icon", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["family", "icon", "size"] })
export class WcsMatIcon {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsModal extends Components.WcsModal {
}
@ProxyCmp({ inputs: ["backdrop", "show", "showCloseButton"] })
@Component({ selector: "wcs-modal", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["backdrop", "show", "showCloseButton"] })
export class WcsModal {
  wcsDialogClosed!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["wcsDialogClosed"]);
  }
}
export declare interface WcsNav extends Components.WcsNav {
}
@Component({ selector: "wcs-nav", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
export class WcsNav {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsNavItem extends Components.WcsNavItem {
}
@ProxyCmp({ inputs: ["href", "text"] })
@Component({ selector: "wcs-nav-item", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["href", "text"] })
export class WcsNavItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsProgressBar extends Components.WcsProgressBar {
}
@ProxyCmp({ inputs: ["showLabel", "small", "value"] })
@Component({ selector: "wcs-progress-bar", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["showLabel", "small", "value"] })
export class WcsProgressBar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsProgressRadial extends Components.WcsProgressRadial {
}
@ProxyCmp({ inputs: ["showLabel", "size", "value"] })
@Component({ selector: "wcs-progress-radial", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["showLabel", "size", "value"] })
export class WcsProgressRadial {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsRadio extends Components.WcsRadio {
}
@ProxyCmp({ inputs: ["checked", "disabled", "label", "mode", "value"] })
@Component({ selector: "wcs-radio", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["checked", "disabled", "label", "mode", "value"] })
export class WcsRadio {
  wcsRadioClick!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["wcsRadioClick"]);
  }
}
export declare interface WcsRadioGroup extends Components.WcsRadioGroup {
}
@ProxyCmp({ inputs: ["mode", "name", "value"] })
@Component({ selector: "wcs-radio-group", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["mode", "name", "value"] })
export class WcsRadioGroup {
  wcsChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["wcsChange"]);
  }
}
export declare interface WcsSelect extends Components.WcsSelect {
}
@ProxyCmp({ inputs: ["chips", "compareWith", "disabled", "multiple", "name", "placeholder", "value"], "methods": ["open", "close"] })
@Component({ selector: "wcs-select", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["chips", "compareWith", "disabled", "multiple", "name", "placeholder", "value"] })
export class WcsSelect {
  wcsChange!: EventEmitter<CustomEvent>;
  wcsFocus!: EventEmitter<CustomEvent>;
  wcsBlur!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["wcsChange", "wcsFocus", "wcsBlur"]);
  }
}
export declare interface WcsSelectOption extends Components.WcsSelectOption {
}
@ProxyCmp({ inputs: ["chipBackgroundColor", "chipColor", "disabled", "selected", "value"] })
@Component({ selector: "wcs-select-option", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["chipBackgroundColor", "chipColor", "disabled", "selected", "value"] })
export class WcsSelectOption {
  wcsSelectOptionClick!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["wcsSelectOptionClick"]);
  }
}
export declare interface WcsSpinner extends Components.WcsSpinner {
}
@ProxyCmp({ inputs: ["mode"] })
@Component({ selector: "wcs-spinner", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["mode"] })
export class WcsSpinner {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface WcsSwitch extends Components.WcsSwitch {
}
@ProxyCmp({ inputs: ["checked", "name"] })
@Component({ selector: "wcs-switch", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["checked", "name"] })
export class WcsSwitch {
  wcsChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["wcsChange"]);
  }
}
export declare interface WcsTab extends Components.WcsTab {
}
@ProxyCmp({ inputs: ["header", "itemKey"] })
@Component({ selector: "wcs-tab", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["header", "itemKey"] })
export class WcsTab {
  tabLoaded!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["tabLoaded"]);
  }
}
export declare interface WcsTabs extends Components.WcsTabs {
}
@ProxyCmp({ inputs: ["align", "gutter", "headersOnly", "selectedIndex", "selectedKey"] })
@Component({ selector: "wcs-tabs", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["align", "gutter", "headersOnly", "selectedIndex", "selectedKey"] })
export class WcsTabs {
  tabChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["tabChange"]);
  }
}
export declare interface WcsTextarea extends Components.WcsTextarea {
}
@ProxyCmp({ inputs: ["autoGrow", "autocapitalize", "autofocus", "clearOnEdit", "cols", "debounce", "disabled", "enterkeyhint", "icon", "inputmode", "maxlength", "minlength", "name", "placeholder", "readonly", "required", "rows", "spellcheck", "state", "value", "wrap"], "methods": ["fitContent", "setFocus", "getInputElement"] })
@Component({ selector: "wcs-textarea", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["autoGrow", "autocapitalize", "autofocus", "clearOnEdit", "cols", "debounce", "disabled", "enterkeyhint", "icon", "inputmode", "maxlength", "minlength", "name", "placeholder", "readonly", "required", "rows", "spellcheck", "state", "value", "wrap"] })
export class WcsTextarea {
  wcsChange!: EventEmitter<CustomEvent>;
  wcsInput!: EventEmitter<CustomEvent>;
  wcsBlur!: EventEmitter<CustomEvent>;
  wcsFocus!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["wcsChange", "wcsInput", "wcsBlur", "wcsFocus"]);
  }
}
export declare interface WcsTooltip extends Components.WcsTooltip {
}
@ProxyCmp({ inputs: ["for", "position"] })
@Component({ selector: "wcs-tooltip", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["for", "position"] })
export class WcsTooltip {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
