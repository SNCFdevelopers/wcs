import { Component, h, ComponentInterface, State, Prop, Host, Element, Method, Watch } from '@stencil/core';

import { SelectArrow } from '../select/select-arrow';
import { WcsNativeSelectSize } from './native-select-interface';
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";

/**
 * The `wcs-native-select` component is designed to accept a native `<select>` element as a slotted child. This choice
 * allows developers to bind the `<select>` element using the framework of their choice, without the need to re-expose all the
 * properties of the `<select>` and `<option>` elements in this component.
 *
 * The component wraps the native `<select>` element and provides custom styles and behavior, while preserving the native
 * functionality and accessibility.
 *
 * ### ✅ Guidance
 *
 * - To have a placeholder, you must have an option as child which has `selected` attribute and `disabled`
 * attribute. You can add the `hidden` attribute to don't show the placeholder option in the options overlay.
 *
 * ### Example usage
 *
 * ```html
 * <wcs-native-select>
 *   <select>
 *     <option value="option1">Option 1</option>
 *     <option value="option2">Option 2</option>
 *     <option value="option3">Option 3</option>
 *   </select>
 * </wcs-native-select>
 * ```
 *
 * ### Note
 * - We did not find a way to detect when the select is reset, if you want to apply the placeholder style when the
 * select is reset, you have to call the `updateStyles()` method manually.
 * - It is strongly recommended to use native-select when you don't have to support the multi-selection feature
 * - Use a native-select instead of a wcs-select if your application is mainly on mobile / tablet. The native behavior of the device will be used.
 *
 * @cssprop --wcs-select-native-line-height - Line height of the select
 * 
 * @cssprop --wcs-select-native-size-m - Height of the select when size is 'm'
 * @cssprop --wcs-select-native-font-size-m - Font size of the select when size is 'm'
 * @cssprop --wcs-select-native-size-l - Height of the select when size is 'l'
 * @cssprop --wcs-select-native-font-size-l - Font size of the select when size is 'l'
 * 
 * @cssprop --wcs-select-native-border-radius - Border radius of the select
 * 
 * @cssprop --wcs-select-native-background-color - Background color of the select
 * 
 * @cssprop --wcs-select-native-border-color-default - Border color of the select when not focused
 * @cssprop --wcs-select-native-border-color-disabled - Border color of the select when disabled
 * @cssprop --wcs-select-native-border-color-focus - Border color of the select when focused
 * @cssprop --wcs-select-native-border-color-error - Border color of the select when in error state
 * 
 * @cssprop --wcs-select-native-border-style-default - Border style of the select when not focused
 * @cssprop --wcs-select-native-border-style-focus - Border style of the select when focused
 * 
 * @cssprop --wcs-select-native-border-width - Border width of the select when not focused
 * @cssprop --wcs-select-native-border-width-focus - Border width of the select when focused
 * 
 * @cssprop --wcs-select-native-value-color - Color of the selected value
 * @cssprop --wcs-select-native-value-font-weight - Font weight of the selected value
 * @cssprop --wcs-select-native-value-font-style - Font style of the selected value
 * 
 * @cssprop --wcs-select-native-padding-horizontal-m - Padding horizontal of the select when size is 'm'
 * @cssprop --wcs-select-native-padding-horizontal-l - Padding horizontal of the select when size is 'l'
 * 
 * @cssprop --wcs-select-native-arrow-color - Color of the select arrow
 * @cssprop --wcs-select-native-arrow-color-disabled - Color of the select arrow when the select is disabled
 * 
 * @cssprop --wcs-select-native-text-color-disabled - Color of the text when the select is disabled
 *
 * @cssprop --wcs-select-native-placeholder-color - Color of the placeholder
 * @cssprop --wcs-select-native-placeholder-font-weight - Font weight of the placeholder
 * @cssprop --wcs-select-native-placeholder-font-style - Font style of the placeholder
 *
 * @cssprop --wcs-select-native-option-color - Text color of the options
 * @cssprop --wcs-select-native-option-font-style - Font style of the options
 * @cssprop --wcs-select-native-option-selected-color - Text color of the selected option
 *
 * 
 */
@Component({
    tag: 'wcs-native-select',
    styleUrl: 'native-select.scss',
    shadow: true
})
export class NativeSelect implements ComponentInterface, MutableAriaAttribute {
    /**
     * The `size` property controls the size of the slotted `select` element by adjusting its padding.
     * There are two possible size options:
     * - 'm': medium size
     * - 'l': large size
     *
     * The default value is 'm'.
     */
    @Prop({reflect: true}) size: WcsNativeSelectSize = 'm';
    /**
     * If `true`, the user must fill in a value before submitting a form.
     * It is propagated to the slotted select element
     */
    @Prop() required = false;
    
    @Element() private el!: HTMLWcsNativeSelectElement;

    @State() private expanded: boolean = false;

    @State() private disabled: boolean;
    private selectElement: HTMLSelectElement;

    private observer: MutationObserver;
    private readonly SLOTTED_SELECT_TRACKED_ATTRIBUTES_LIST = ['disabled'];

    @Watch('required')
    requiredChanged(newValue: boolean, oldValue: boolean) {
        if(newValue !== oldValue) {
            if(!this.selectElement) return;
            this.selectElement.required = this.required;
        }
    }
    
    componentWillLoad() {
        this.selectElement = this.el.querySelector('select');
        if (!this.selectElement) throw new Error("wcs-native-select must be used with a native slotted select, please refer to the documentation.");

        this.onSelectedOptionChange();

        /**
         * We use an event listener to apply the default style to the select when user chose an active option
         */
        this.selectElement.addEventListener('change', () => {
            this.onSelectedOptionChange();
        });

        this.observer = new MutationObserver(mutations => {
            const hasSpiedAttrMutation = mutations.filter(m => this.SLOTTED_SELECT_TRACKED_ATTRIBUTES_LIST.includes(m.attributeName)).length > 0;
            if (hasSpiedAttrMutation) {
                this.updateHostAttributeWithSlottedSelect();
            }

            // A workaround to detect when the select is reset by using a class change on the select element. For example
            // angular add/remove ng-pristine and ng-dirty classes on the form controls when the form is reset.
            // Not the best solution but it works since we cannot detect the reset event on the native select element.
            if (mutations.filter(m => m.attributeName === 'class').length > 0) {
                this._updateStyles();
            }
        });
        this.updateHostAttributeWithSlottedSelect();
        this.observer.observe(this.selectElement, {attributes: true});
    }

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        if(!this.selectElement) return;
        this.selectElement.setAttribute(attr, value);
    }

    private onSelectedOptionChange(): void {
        this._updateStyles();
    }

    private _updateStyles() {
        if (this.isPlaceholderOptionSelected()) {
            this.applyPlaceholderStylesOnNativeSlottedSelectElement();
        } else {
            this.applySelectedOptionStylesOnNativeSlottedSelectElement();
        }
    }

    private isPlaceholderOptionSelected() {
        return Array.from(this.selectElement.options).filter(o => o.selected)[0]?.disabled == true;
    }

    /**
     * This method should always unset all styles modified by the `applyPlaceholderStylesOnNativeSlottedSelectElement()`
     * @private
     */
    private applySelectedOptionStylesOnNativeSlottedSelectElement() {
        this.selectElement.style.color = "var(--wcs-select-native-value-color)";
        this.selectElement.style.fontStyle = "var(--wcs-select-native-value-font-style)";
        this.selectElement.style.fontWeight = "var(--wcs-select-native-value-font-weight)";
        Array.from(this.selectElement.options).forEach(option => {
            option.style.fontStyle = "var(--wcs-select-native-option-font-style)";
            if (!option.disabled) {
                option.style.color = "var(--wcs-select-native-option-color)";
            }
        });
    }

    /**
     * This method apply styles when the placeholder is shown.
     *
     * We use javascript because we cannot achieve that behaviour in pure css when the native select is not required
     * @private
     */
    private applyPlaceholderStylesOnNativeSlottedSelectElement() {
        this.selectElement.style.color = "var(--wcs-select-native-placeholder-color)";
        this.selectElement.style.fontWeight = "var(--wcs-select-native-placeholder-font-weight)";
        this.selectElement.style.fontStyle = "var(--wcs-select-native-placeholder-font-style)";
        Array.from(this.selectElement.options).forEach(option => {
            option.style.fontStyle = "var(--wcs-select-native-option-font-style)";
            if (!option.disabled) {
                option.style.color = "var(--wcs-select-native-option-color)";
            }
        });
    }

    private updateHostAttributeWithSlottedSelect() {
        this.disabled = this.selectElement?.hasAttribute('disabled');
    }

    disconnectedCallback() {
        this.observer?.disconnect();
        this.selectElement?.removeEventListener("change", () => {
            this.onSelectedOptionChange();
        });
    }

    /**
     * Use this method to force the component to update its styles. It can be useful when the select is reset (with a placeholder).
     */
    @Method()
    async updateStyles() {
        // Note : we try to automatically detect if the select is reset with the onreset event and with a mutation
        // observer on the select element. But it seems that the onreset event is not fired when the select is reset.
        // and the mutation observer is not fired when the select is reset with the reset() method on the form.
        // So we have to let the user call this method manually when he reset the select.
        this._updateStyles();
    }

    render() {
        return (
            <Host class={`${this.expanded ? 'expanded' : ''}`} data-disabled={this.disabled} data-size={this.size}>
                <div class="select-wrapper">
                    <slot></slot>
                    <div class="arrow-container">
                        <SelectArrow up={this.expanded}></SelectArrow>
                    </div>
                </div>
            </Host>
        );
    }
}
