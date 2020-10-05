/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { WcsButtonMode, WcsButtonShape, WcsButtonType } from "./components/button/button-interface";
import { CheckboxChangeEventDetail, CheckboxLabelAlignment } from "./components/checkbox/checkbox-interface";
import { SelectChangeEventDetail } from "./components/select/select-interface";
import { SelectOptionChosedEvent } from "./components/select-option/select-option-interface";
import { SwitchChangeEventDetail } from "./components/switch/switch-interface";
import { WcsTabChangeEvent, WcsTabsAlignment } from "./components/tabs/tabs-interface";
import { WcsTooltipPosition } from "./components/tooltip/tooltip-interface";
export namespace Components {
    interface WcsActionBar {
    }
    interface WcsApp {
    }
    interface WcsBadge {
    }
    interface WcsButton {
        /**
          * Specify wether the button is disabled or not.
         */
        "disabled": boolean;
        /**
          * Set a URL to point to. If specified use a `a` tag instead of `btn`.
         */
        "href"?: string;
        /**
          * This attribute specify the appearance of the button.
         */
        "mode": WcsButtonMode;
        /**
          * Specify wether the button should have a ripple effect or not.
         */
        "ripple": boolean;
        /**
          * Specify the shape of the button.
         */
        "shape": WcsButtonShape;
        /**
          * Specify the button type.
         */
        "type": WcsButtonType;
    }
    interface WcsCard {
    }
    interface WcsCardBody {
    }
    interface WcsCheckbox {
        /**
          * If `true`, the checkbox is selected.
         */
        "checked": boolean;
        /**
          * If `true` the checkbox is in indeterminate state.
         */
        "indeterminate": boolean;
        /**
          * Specifie the alignment of the checkbox with the label content
         */
        "labelAlignment": CheckboxLabelAlignment;
        "name": string;
    }
    interface WcsDropdown {
        "disabled": boolean;
        "mode": WcsButtonMode;
        "shape": WcsButtonShape;
    }
    interface WcsDropdownItem {
    }
    interface WcsError {
    }
    interface WcsFormField {
        /**
          * Specifies whether the form field is in an error state. Displays the field border in red and the message contained in the wcs-error component
         */
        "isError": boolean;
    }
    interface WcsHeader {
    }
    interface WcsHint {
        "small": boolean;
    }
    interface WcsIcon {
        "icon": string;
        "size": 'x5' | 'x75' | '1x' | '1x2' | '1x5' | '1x7' | '2x' | '3x' | '30px' | '50px' | '66px' | '90px' | '96px' | '140px';
    }
    interface WcsLabel {
        "required": boolean;
    }
    interface WcsListItem {
    }
    interface WcsListItemProperties {
    }
    interface WcsListItemProperty {
    }
    interface WcsModal {
        /**
          * Specifies whether the component should display a backdrop on the entire page
         */
        "backdrop": boolean;
        /**
          * Displays the modal
         */
        "show": boolean;
        /**
          * Specifies whether the component should a close button
         */
        "showCloseButton": boolean;
    }
    interface WcsNav {
    }
    interface WcsNavItem {
        /**
          * Attributes mapped to a <a> tag.  Don't forget to specify [routerLink] if using in conjuction with angular router.
         */
        "href": string;
        /**
          * This attribute specify the text of the item.
         */
        "text": string;
    }
    interface WcsProgressBar {
        /**
          * Whether it displays a label indicating the percentage of progress above the bar.
         */
        "showLabel": boolean;
        /**
          * Whether the component display the small version
         */
        "small": boolean;
        /**
          * The actual value of the progress. Ranging from 0 to 100.
         */
        "value": number;
    }
    interface WcsProgressRadial {
        "showLabel": boolean;
        "size": number;
        "value": number;
    }
    interface WcsSelect {
        /**
          * Close the component.
         */
        "close": () => Promise<void>;
        /**
          * If `true`, the user cannot interact with the select.
         */
        "disabled": boolean;
        /**
          * If `true`, the user can select multiple values at once.
         */
        "multiple": boolean;
        /**
          * The name of the control, which is submitted with the form data.
         */
        "name"?: string;
        /**
          * Open the component.
         */
        "open": () => Promise<void>;
        /**
          * The text to display when the select is empty.
         */
        "placeholder"?: string | null;
        /**
          * The currently selected value.
         */
        "value"?: any | null;
    }
    interface WcsSelectOption {
        /**
          * Wether this option can be selected.
         */
        "disabled": boolean;
        /**
          * This property musn't be set by hand, it is used by the `wcs-select` component. If you want a multiple select, set `multiple` attribute on the parent select instead.
          * @ignore
         */
        "multiple": boolean;
        /**
          * Wether this option is selected.
         */
        "selected": boolean;
        /**
          * The option value, not what's displayed, use inner text instead.
         */
        "value"?: any;
    }
    interface WcsSpinner {
        /**
          * Indicates the spinner display mode. Accepted values: `border` or `growing`
         */
        "mode": 'border' | 'growing';
    }
    interface WcsSwitch {
        /**
          * If `true`, the switch is selected.
         */
        "checked": boolean;
        "name": string;
    }
    interface WcsTab {
        /**
          * The header you want to be displayed for this tab.
         */
        "header": string;
    }
    interface WcsTabs {
        /**
          * Tab headers alignment.
         */
        "align": WcsTabsAlignment;
        /**
          * Current selected tab index. Starts at 0.
         */
        "selectedIndex": number;
    }
    interface WcsTooltip {
        /**
          * The **id** of the element the tooltip's going to describe.
          * @example ```html <span id="tooltiped">Some content</span> <wcs-tooltip for="tooltiped">A tooltip!</wcs-tooltip> ```
         */
        "for": string;
        /**
          * Where the tooltip is going to show relative to the element it's describing.
         */
        "position": WcsTooltipPosition;
    }
}
declare global {
    interface HTMLWcsActionBarElement extends Components.WcsActionBar, HTMLStencilElement {
    }
    var HTMLWcsActionBarElement: {
        prototype: HTMLWcsActionBarElement;
        new (): HTMLWcsActionBarElement;
    };
    interface HTMLWcsAppElement extends Components.WcsApp, HTMLStencilElement {
    }
    var HTMLWcsAppElement: {
        prototype: HTMLWcsAppElement;
        new (): HTMLWcsAppElement;
    };
    interface HTMLWcsBadgeElement extends Components.WcsBadge, HTMLStencilElement {
    }
    var HTMLWcsBadgeElement: {
        prototype: HTMLWcsBadgeElement;
        new (): HTMLWcsBadgeElement;
    };
    interface HTMLWcsButtonElement extends Components.WcsButton, HTMLStencilElement {
    }
    var HTMLWcsButtonElement: {
        prototype: HTMLWcsButtonElement;
        new (): HTMLWcsButtonElement;
    };
    interface HTMLWcsCardElement extends Components.WcsCard, HTMLStencilElement {
    }
    var HTMLWcsCardElement: {
        prototype: HTMLWcsCardElement;
        new (): HTMLWcsCardElement;
    };
    interface HTMLWcsCardBodyElement extends Components.WcsCardBody, HTMLStencilElement {
    }
    var HTMLWcsCardBodyElement: {
        prototype: HTMLWcsCardBodyElement;
        new (): HTMLWcsCardBodyElement;
    };
    interface HTMLWcsCheckboxElement extends Components.WcsCheckbox, HTMLStencilElement {
    }
    var HTMLWcsCheckboxElement: {
        prototype: HTMLWcsCheckboxElement;
        new (): HTMLWcsCheckboxElement;
    };
    interface HTMLWcsDropdownElement extends Components.WcsDropdown, HTMLStencilElement {
    }
    var HTMLWcsDropdownElement: {
        prototype: HTMLWcsDropdownElement;
        new (): HTMLWcsDropdownElement;
    };
    interface HTMLWcsDropdownItemElement extends Components.WcsDropdownItem, HTMLStencilElement {
    }
    var HTMLWcsDropdownItemElement: {
        prototype: HTMLWcsDropdownItemElement;
        new (): HTMLWcsDropdownItemElement;
    };
    interface HTMLWcsErrorElement extends Components.WcsError, HTMLStencilElement {
    }
    var HTMLWcsErrorElement: {
        prototype: HTMLWcsErrorElement;
        new (): HTMLWcsErrorElement;
    };
    interface HTMLWcsFormFieldElement extends Components.WcsFormField, HTMLStencilElement {
    }
    var HTMLWcsFormFieldElement: {
        prototype: HTMLWcsFormFieldElement;
        new (): HTMLWcsFormFieldElement;
    };
    interface HTMLWcsHeaderElement extends Components.WcsHeader, HTMLStencilElement {
    }
    var HTMLWcsHeaderElement: {
        prototype: HTMLWcsHeaderElement;
        new (): HTMLWcsHeaderElement;
    };
    interface HTMLWcsHintElement extends Components.WcsHint, HTMLStencilElement {
    }
    var HTMLWcsHintElement: {
        prototype: HTMLWcsHintElement;
        new (): HTMLWcsHintElement;
    };
    interface HTMLWcsIconElement extends Components.WcsIcon, HTMLStencilElement {
    }
    var HTMLWcsIconElement: {
        prototype: HTMLWcsIconElement;
        new (): HTMLWcsIconElement;
    };
    interface HTMLWcsLabelElement extends Components.WcsLabel, HTMLStencilElement {
    }
    var HTMLWcsLabelElement: {
        prototype: HTMLWcsLabelElement;
        new (): HTMLWcsLabelElement;
    };
    interface HTMLWcsListItemElement extends Components.WcsListItem, HTMLStencilElement {
    }
    var HTMLWcsListItemElement: {
        prototype: HTMLWcsListItemElement;
        new (): HTMLWcsListItemElement;
    };
    interface HTMLWcsListItemPropertiesElement extends Components.WcsListItemProperties, HTMLStencilElement {
    }
    var HTMLWcsListItemPropertiesElement: {
        prototype: HTMLWcsListItemPropertiesElement;
        new (): HTMLWcsListItemPropertiesElement;
    };
    interface HTMLWcsListItemPropertyElement extends Components.WcsListItemProperty, HTMLStencilElement {
    }
    var HTMLWcsListItemPropertyElement: {
        prototype: HTMLWcsListItemPropertyElement;
        new (): HTMLWcsListItemPropertyElement;
    };
    interface HTMLWcsModalElement extends Components.WcsModal, HTMLStencilElement {
    }
    var HTMLWcsModalElement: {
        prototype: HTMLWcsModalElement;
        new (): HTMLWcsModalElement;
    };
    interface HTMLWcsNavElement extends Components.WcsNav, HTMLStencilElement {
    }
    var HTMLWcsNavElement: {
        prototype: HTMLWcsNavElement;
        new (): HTMLWcsNavElement;
    };
    interface HTMLWcsNavItemElement extends Components.WcsNavItem, HTMLStencilElement {
    }
    var HTMLWcsNavItemElement: {
        prototype: HTMLWcsNavItemElement;
        new (): HTMLWcsNavItemElement;
    };
    interface HTMLWcsProgressBarElement extends Components.WcsProgressBar, HTMLStencilElement {
    }
    var HTMLWcsProgressBarElement: {
        prototype: HTMLWcsProgressBarElement;
        new (): HTMLWcsProgressBarElement;
    };
    interface HTMLWcsProgressRadialElement extends Components.WcsProgressRadial, HTMLStencilElement {
    }
    var HTMLWcsProgressRadialElement: {
        prototype: HTMLWcsProgressRadialElement;
        new (): HTMLWcsProgressRadialElement;
    };
    interface HTMLWcsSelectElement extends Components.WcsSelect, HTMLStencilElement {
    }
    var HTMLWcsSelectElement: {
        prototype: HTMLWcsSelectElement;
        new (): HTMLWcsSelectElement;
    };
    interface HTMLWcsSelectOptionElement extends Components.WcsSelectOption, HTMLStencilElement {
    }
    var HTMLWcsSelectOptionElement: {
        prototype: HTMLWcsSelectOptionElement;
        new (): HTMLWcsSelectOptionElement;
    };
    interface HTMLWcsSpinnerElement extends Components.WcsSpinner, HTMLStencilElement {
    }
    var HTMLWcsSpinnerElement: {
        prototype: HTMLWcsSpinnerElement;
        new (): HTMLWcsSpinnerElement;
    };
    interface HTMLWcsSwitchElement extends Components.WcsSwitch, HTMLStencilElement {
    }
    var HTMLWcsSwitchElement: {
        prototype: HTMLWcsSwitchElement;
        new (): HTMLWcsSwitchElement;
    };
    interface HTMLWcsTabElement extends Components.WcsTab, HTMLStencilElement {
    }
    var HTMLWcsTabElement: {
        prototype: HTMLWcsTabElement;
        new (): HTMLWcsTabElement;
    };
    interface HTMLWcsTabsElement extends Components.WcsTabs, HTMLStencilElement {
    }
    var HTMLWcsTabsElement: {
        prototype: HTMLWcsTabsElement;
        new (): HTMLWcsTabsElement;
    };
    interface HTMLWcsTooltipElement extends Components.WcsTooltip, HTMLStencilElement {
    }
    var HTMLWcsTooltipElement: {
        prototype: HTMLWcsTooltipElement;
        new (): HTMLWcsTooltipElement;
    };
    interface HTMLElementTagNameMap {
        "wcs-action-bar": HTMLWcsActionBarElement;
        "wcs-app": HTMLWcsAppElement;
        "wcs-badge": HTMLWcsBadgeElement;
        "wcs-button": HTMLWcsButtonElement;
        "wcs-card": HTMLWcsCardElement;
        "wcs-card-body": HTMLWcsCardBodyElement;
        "wcs-checkbox": HTMLWcsCheckboxElement;
        "wcs-dropdown": HTMLWcsDropdownElement;
        "wcs-dropdown-item": HTMLWcsDropdownItemElement;
        "wcs-error": HTMLWcsErrorElement;
        "wcs-form-field": HTMLWcsFormFieldElement;
        "wcs-header": HTMLWcsHeaderElement;
        "wcs-hint": HTMLWcsHintElement;
        "wcs-icon": HTMLWcsIconElement;
        "wcs-label": HTMLWcsLabelElement;
        "wcs-list-item": HTMLWcsListItemElement;
        "wcs-list-item-properties": HTMLWcsListItemPropertiesElement;
        "wcs-list-item-property": HTMLWcsListItemPropertyElement;
        "wcs-modal": HTMLWcsModalElement;
        "wcs-nav": HTMLWcsNavElement;
        "wcs-nav-item": HTMLWcsNavItemElement;
        "wcs-progress-bar": HTMLWcsProgressBarElement;
        "wcs-progress-radial": HTMLWcsProgressRadialElement;
        "wcs-select": HTMLWcsSelectElement;
        "wcs-select-option": HTMLWcsSelectOptionElement;
        "wcs-spinner": HTMLWcsSpinnerElement;
        "wcs-switch": HTMLWcsSwitchElement;
        "wcs-tab": HTMLWcsTabElement;
        "wcs-tabs": HTMLWcsTabsElement;
        "wcs-tooltip": HTMLWcsTooltipElement;
    }
}
declare namespace LocalJSX {
    interface WcsActionBar {
    }
    interface WcsApp {
    }
    interface WcsBadge {
    }
    interface WcsButton {
        /**
          * Specify wether the button is disabled or not.
         */
        "disabled"?: boolean;
        /**
          * Set a URL to point to. If specified use a `a` tag instead of `btn`.
         */
        "href"?: string;
        /**
          * This attribute specify the appearance of the button.
         */
        "mode"?: WcsButtonMode;
        /**
          * Specify wether the button should have a ripple effect or not.
         */
        "ripple"?: boolean;
        /**
          * Specify the shape of the button.
         */
        "shape"?: WcsButtonShape;
        /**
          * Specify the button type.
         */
        "type"?: WcsButtonType;
    }
    interface WcsCard {
    }
    interface WcsCardBody {
    }
    interface WcsCheckbox {
        /**
          * If `true`, the checkbox is selected.
         */
        "checked"?: boolean;
        /**
          * If `true` the checkbox is in indeterminate state.
         */
        "indeterminate"?: boolean;
        /**
          * Specifie the alignment of the checkbox with the label content
         */
        "labelAlignment"?: CheckboxLabelAlignment;
        "name"?: string;
        /**
          * Emitted when the checked property has changed.
         */
        "onWcsChange"?: (event: CustomEvent<CheckboxChangeEventDetail>) => void;
    }
    interface WcsDropdown {
        "disabled"?: boolean;
        "mode"?: WcsButtonMode;
        "shape"?: WcsButtonShape;
    }
    interface WcsDropdownItem {
        "onWcsDropdownItemClick"?: (event: CustomEvent<void>) => void;
    }
    interface WcsError {
    }
    interface WcsFormField {
        /**
          * Specifies whether the form field is in an error state. Displays the field border in red and the message contained in the wcs-error component
         */
        "isError"?: boolean;
    }
    interface WcsHeader {
    }
    interface WcsHint {
        "small"?: boolean;
    }
    interface WcsIcon {
        "icon"?: string;
        "size"?: 'x5' | 'x75' | '1x' | '1x2' | '1x5' | '1x7' | '2x' | '3x' | '30px' | '50px' | '66px' | '90px' | '96px' | '140px';
    }
    interface WcsLabel {
        "required"?: boolean;
    }
    interface WcsListItem {
    }
    interface WcsListItemProperties {
    }
    interface WcsListItemProperty {
    }
    interface WcsModal {
        /**
          * Specifies whether the component should display a backdrop on the entire page
         */
        "backdrop"?: boolean;
        /**
          * Triggered when the user leaves the dialog with the closing button.
         */
        "onWcsDialogClosed"?: (event: CustomEvent<void>) => void;
        /**
          * Displays the modal
         */
        "show"?: boolean;
        /**
          * Specifies whether the component should a close button
         */
        "showCloseButton"?: boolean;
    }
    interface WcsNav {
    }
    interface WcsNavItem {
        /**
          * Attributes mapped to a <a> tag.  Don't forget to specify [routerLink] if using in conjuction with angular router.
         */
        "href"?: string;
        /**
          * This attribute specify the text of the item.
         */
        "text"?: string;
    }
    interface WcsProgressBar {
        /**
          * Whether it displays a label indicating the percentage of progress above the bar.
         */
        "showLabel"?: boolean;
        /**
          * Whether the component display the small version
         */
        "small"?: boolean;
        /**
          * The actual value of the progress. Ranging from 0 to 100.
         */
        "value"?: number;
    }
    interface WcsProgressRadial {
        "showLabel"?: boolean;
        "size"?: number;
        "value"?: number;
    }
    interface WcsSelect {
        /**
          * If `true`, the user cannot interact with the select.
         */
        "disabled"?: boolean;
        /**
          * If `true`, the user can select multiple values at once.
         */
        "multiple"?: boolean;
        /**
          * The name of the control, which is submitted with the form data.
         */
        "name"?: string;
        /**
          * Emitted when the select loses focus.
         */
        "onWcsBlur"?: (event: CustomEvent<void>) => void;
        /**
          * Emitted when the value has changed.
         */
        "onWcsChange"?: (event: CustomEvent<SelectChangeEventDetail>) => void;
        /**
          * Emitted when the select has focus.
         */
        "onWcsFocus"?: (event: CustomEvent<void>) => void;
        /**
          * The text to display when the select is empty.
         */
        "placeholder"?: string | null;
        /**
          * The currently selected value.
         */
        "value"?: any | null;
    }
    interface WcsSelectOption {
        /**
          * Wether this option can be selected.
         */
        "disabled"?: boolean;
        /**
          * This property musn't be set by hand, it is used by the `wcs-select` component. If you want a multiple select, set `multiple` attribute on the parent select instead.
          * @ignore
         */
        "multiple"?: boolean;
        "onWcsSelectOptionClick"?: (event: CustomEvent<SelectOptionChosedEvent>) => void;
        /**
          * Wether this option is selected.
         */
        "selected"?: boolean;
        /**
          * The option value, not what's displayed, use inner text instead.
         */
        "value"?: any;
    }
    interface WcsSpinner {
        /**
          * Indicates the spinner display mode. Accepted values: `border` or `growing`
         */
        "mode"?: 'border' | 'growing';
    }
    interface WcsSwitch {
        /**
          * If `true`, the switch is selected.
         */
        "checked"?: boolean;
        "name"?: string;
        /**
          * Emitted when the checked property has changed.
         */
        "onWcsChange"?: (event: CustomEvent<SwitchChangeEventDetail>) => void;
    }
    interface WcsTab {
        /**
          * The header you want to be displayed for this tab.
         */
        "header"?: string;
        /**
          * Do not use, meant for internal use only.
          * @inner 
          * @ignore
         */
        "onTabLoaded"?: (event: CustomEvent<void>) => void;
    }
    interface WcsTabs {
        /**
          * Tab headers alignment.
         */
        "align"?: WcsTabsAlignment;
        /**
          * Emitted when the selected tab change.
         */
        "onTabChange"?: (event: CustomEvent<WcsTabChangeEvent>) => void;
        /**
          * Current selected tab index. Starts at 0.
         */
        "selectedIndex"?: number;
    }
    interface WcsTooltip {
        /**
          * The **id** of the element the tooltip's going to describe.
          * @example ```html <span id="tooltiped">Some content</span> <wcs-tooltip for="tooltiped">A tooltip!</wcs-tooltip> ```
         */
        "for"?: string;
        /**
          * Where the tooltip is going to show relative to the element it's describing.
         */
        "position"?: WcsTooltipPosition;
    }
    interface IntrinsicElements {
        "wcs-action-bar": WcsActionBar;
        "wcs-app": WcsApp;
        "wcs-badge": WcsBadge;
        "wcs-button": WcsButton;
        "wcs-card": WcsCard;
        "wcs-card-body": WcsCardBody;
        "wcs-checkbox": WcsCheckbox;
        "wcs-dropdown": WcsDropdown;
        "wcs-dropdown-item": WcsDropdownItem;
        "wcs-error": WcsError;
        "wcs-form-field": WcsFormField;
        "wcs-header": WcsHeader;
        "wcs-hint": WcsHint;
        "wcs-icon": WcsIcon;
        "wcs-label": WcsLabel;
        "wcs-list-item": WcsListItem;
        "wcs-list-item-properties": WcsListItemProperties;
        "wcs-list-item-property": WcsListItemProperty;
        "wcs-modal": WcsModal;
        "wcs-nav": WcsNav;
        "wcs-nav-item": WcsNavItem;
        "wcs-progress-bar": WcsProgressBar;
        "wcs-progress-radial": WcsProgressRadial;
        "wcs-select": WcsSelect;
        "wcs-select-option": WcsSelectOption;
        "wcs-spinner": WcsSpinner;
        "wcs-switch": WcsSwitch;
        "wcs-tab": WcsTab;
        "wcs-tabs": WcsTabs;
        "wcs-tooltip": WcsTooltip;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "wcs-action-bar": LocalJSX.WcsActionBar & JSXBase.HTMLAttributes<HTMLWcsActionBarElement>;
            "wcs-app": LocalJSX.WcsApp & JSXBase.HTMLAttributes<HTMLWcsAppElement>;
            "wcs-badge": LocalJSX.WcsBadge & JSXBase.HTMLAttributes<HTMLWcsBadgeElement>;
            "wcs-button": LocalJSX.WcsButton & JSXBase.HTMLAttributes<HTMLWcsButtonElement>;
            "wcs-card": LocalJSX.WcsCard & JSXBase.HTMLAttributes<HTMLWcsCardElement>;
            "wcs-card-body": LocalJSX.WcsCardBody & JSXBase.HTMLAttributes<HTMLWcsCardBodyElement>;
            "wcs-checkbox": LocalJSX.WcsCheckbox & JSXBase.HTMLAttributes<HTMLWcsCheckboxElement>;
            "wcs-dropdown": LocalJSX.WcsDropdown & JSXBase.HTMLAttributes<HTMLWcsDropdownElement>;
            "wcs-dropdown-item": LocalJSX.WcsDropdownItem & JSXBase.HTMLAttributes<HTMLWcsDropdownItemElement>;
            "wcs-error": LocalJSX.WcsError & JSXBase.HTMLAttributes<HTMLWcsErrorElement>;
            "wcs-form-field": LocalJSX.WcsFormField & JSXBase.HTMLAttributes<HTMLWcsFormFieldElement>;
            "wcs-header": LocalJSX.WcsHeader & JSXBase.HTMLAttributes<HTMLWcsHeaderElement>;
            "wcs-hint": LocalJSX.WcsHint & JSXBase.HTMLAttributes<HTMLWcsHintElement>;
            "wcs-icon": LocalJSX.WcsIcon & JSXBase.HTMLAttributes<HTMLWcsIconElement>;
            "wcs-label": LocalJSX.WcsLabel & JSXBase.HTMLAttributes<HTMLWcsLabelElement>;
            "wcs-list-item": LocalJSX.WcsListItem & JSXBase.HTMLAttributes<HTMLWcsListItemElement>;
            "wcs-list-item-properties": LocalJSX.WcsListItemProperties & JSXBase.HTMLAttributes<HTMLWcsListItemPropertiesElement>;
            "wcs-list-item-property": LocalJSX.WcsListItemProperty & JSXBase.HTMLAttributes<HTMLWcsListItemPropertyElement>;
            "wcs-modal": LocalJSX.WcsModal & JSXBase.HTMLAttributes<HTMLWcsModalElement>;
            "wcs-nav": LocalJSX.WcsNav & JSXBase.HTMLAttributes<HTMLWcsNavElement>;
            "wcs-nav-item": LocalJSX.WcsNavItem & JSXBase.HTMLAttributes<HTMLWcsNavItemElement>;
            "wcs-progress-bar": LocalJSX.WcsProgressBar & JSXBase.HTMLAttributes<HTMLWcsProgressBarElement>;
            "wcs-progress-radial": LocalJSX.WcsProgressRadial & JSXBase.HTMLAttributes<HTMLWcsProgressRadialElement>;
            "wcs-select": LocalJSX.WcsSelect & JSXBase.HTMLAttributes<HTMLWcsSelectElement>;
            "wcs-select-option": LocalJSX.WcsSelectOption & JSXBase.HTMLAttributes<HTMLWcsSelectOptionElement>;
            "wcs-spinner": LocalJSX.WcsSpinner & JSXBase.HTMLAttributes<HTMLWcsSpinnerElement>;
            "wcs-switch": LocalJSX.WcsSwitch & JSXBase.HTMLAttributes<HTMLWcsSwitchElement>;
            "wcs-tab": LocalJSX.WcsTab & JSXBase.HTMLAttributes<HTMLWcsTabElement>;
            "wcs-tabs": LocalJSX.WcsTabs & JSXBase.HTMLAttributes<HTMLWcsTabsElement>;
            "wcs-tooltip": LocalJSX.WcsTooltip & JSXBase.HTMLAttributes<HTMLWcsTooltipElement>;
        }
    }
}
