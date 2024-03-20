import { Component, h, ComponentInterface, State, Prop, Host, Element, Method } from '@stencil/core';
import { SelectArrow } from '../select/select-arrow';
import { WcsSize } from "../../shared-types";
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";

export type WcsNativeSelectSize = Extract<WcsSize, 'l' | 'm'>; // todo: move into common file with custom select

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
 * - It is strongly recommended to use select-native when you don't have to support the multi-selection feature
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
    @Element() private el!: HTMLWcsNativeSelectElement;

    @State() private expanded: boolean = false;

    @State() private disabled: boolean;
    private selectElement: HTMLSelectElement;

    private observer: MutationObserver;
    private readonly SLOTTED_SELECT_TRACKED_ATTRIBUTES_LIST = ['disabled'];


    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string) {
        this.selectElement.setAttribute(attr, value);
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
        this.selectElement.style.color = "var(--wcs-primary)";
        this.selectElement.style.fontStyle = 'normal';
        this.selectElement.style.fontWeight = '500';
        Array.from(this.selectElement.options).forEach(option => {
            option.style.fontStyle = 'normal';
            if (!option.disabled) {
                option.style.color = "black";
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
        this.selectElement.style.color = "var(--wcs-text-medium)";
        this.selectElement.style.fontWeight = '400';
        this.selectElement.style.fontStyle = 'italic';
        Array.from(this.selectElement.options).forEach(option => {
            option.style.fontStyle = 'normal';
            if (!option.disabled) {
                option.style.color = "black";
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
