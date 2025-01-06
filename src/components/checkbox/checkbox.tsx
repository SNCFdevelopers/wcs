import { Component, Prop, Event, EventEmitter, ComponentInterface, h, Host, Method, Element } from '@stencil/core';
import { CheckboxChangeEventDetail, CheckboxLabelAlignment } from './checkbox-interface';
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";
import { inheritAriaAttributes, inheritAttributes, setOrRemoveAttribute } from "../../utils/helpers";

const CHECKBOX_INHERITED_ATTRS = ['tabindex', 'title'];

/**
 * The checkbox component is an input for choosing one or more items from a set by checking / unchecking it.
 * 
 * @cssprop --wcs-checkbox-outline-radius-focus - Border radius of the focus outline
 * @cssprop --wcs-checkbox-outline-color-focus - Color of the focus outline
 * 
 * @cssprop --wcs-checkbox-text-color-default - Color of the text when the checkbox is not selected
 * @cssprop --wcs-checkbox-text-font-weight - Font weight of the text
 * @cssprop --wcs-checkbox-text-font-size - Font size of the text
 * @cssprop --wcs-checkbox-text-color-disabled - Color of the text when the checkbox is disabled
 * @cssprop --wcs-checkbox-text-color-hover - Color of the text when the checkbox is hovered
 * @cssprop --wcs-checkbox-text-color-selected - Color of the text when the checkbox is selected
 *
 * @cssprop --wcs-checkbox-border-color-default - Color of the border when the checkbox is not selected
 * @cssprop --wcs-checkbox-border-color-hover - Color of the border when the checkbox is hovered
 * @cssprop --wcs-checkbox-border-color-disabled - Color of the border when the checkbox is disabled
 * @cssprop --wcs-checkbox-border-color-selected - Color of the border when the checkbox is selected
 * @cssprop --wcs-checkbox-border-radius - Border radius of the checkbox
 * @cssprop --wcs-checkbox-border-width - Width of the border of the checkbox
 * @cssprop --wcs-checkbox-background-color-selected - Background color of the checkbox when selected
 * @cssprop --wcs-checkbox-background-color-disabled - Background color of the checkbox when disabled
 * @cssprop --wcs-checkbox-background-color-hover - Background color of the checkbox when hovered
 *
 * @cssprop --wcs-checkmark-color - Color of the checkmark
 * @cssprop --wcs-checkmark-height - Height of the checkmark (From the bottom left to the top right of the checkmark)
 * @cssprop --wcs-checkmark-width - Width of the checkmark (From the bottom right to the top left of the checkmark)
 * @cssprop --wcs-checkmark-border-width - Width of the border of the checkmark
 * 
 * @cssprop --wcs-checkbox-size - Size of the checkbox
 * @cssprop --wcs-checkbox-gap - Gap between the checkbox and the label
 */
@Component({
    tag: 'wcs-checkbox',
    styleUrl: 'checkbox.scss',
    shadow: {
        delegatesFocus: true,
    },
})
export class Checkbox implements ComponentInterface, MutableAriaAttribute {
    @Element() private el!: HTMLElement;
    private nativeInput!: HTMLInputElement;
    private inheritedAttributes: { [k: string]: any } = {};
    private checkboxId = `wcs-checkbox-${checkboxIds++}`;

    @Prop() name = this.checkboxId;
    /**
     * If `true` the checkbox is in indeterminate state.
     */
    @Prop({ reflect: true, mutable: true }) indeterminate = false;

    /**
     * If `true`, the checkbox is selected.
     */
    @Prop({ reflect: true, mutable: true }) checked = false;

    /**
     * Specifie the alignment of the checkbox with the label content
     */
    @Prop({ mutable: true, reflect: true }) labelAlignment: CheckboxLabelAlignment = 'center';

    /**
     * Specify wether the checkbox is disabled or not.
     */
    @Prop({ reflect: true }) disabled: boolean = false;

    /**
     * Emitted when the checked property has changed.
     */
    @Event() wcsChange!: EventEmitter<CheckboxChangeEventDetail>;

    /**
     * Emitted when the checkbox has focus.
     */
    @Event() wcsFocus!: EventEmitter<FocusEvent>;

    /**
     * Emitted when the checkbox loses focus.
     */
    @Event() wcsBlur!: EventEmitter<FocusEvent>;

    componentWillLoad(): Promise<void> | void {
        this.inheritedAttributes = {
            ...inheritAriaAttributes(this.el),
            ...inheritAttributes(this.el, CHECKBOX_INHERITED_ATTRS),
        };
    }

    componentDidLoad() {
        this.onSlotChange();
    }

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        setOrRemoveAttribute(this.nativeInput, attr, value);
    }

    handleChange(_event: Event) {
        this.indeterminate = false;
        this.checked = !this.checked;
        this.wcsChange.emit({
            checked: this.checked,
        });
    }

    handleFocus(event: FocusEvent) {
        this.wcsFocus.emit(event);
    }

    handleBlur(event: FocusEvent) {
        this.wcsBlur.emit(event);
    }

    onSlotChange() { 
        const slot = this.el.shadowRoot.querySelector('slot');
        if (slot) {
            // TODO: remove when pseudo-class that indicate a slot has content is supported in all major browsers 
            //  (https://github.com/w3c/csswg-drafts/issues/6867)
            // https://developer.mozilla.org/en-US/docs/Web/CSS/:empty
            const assignedNodes = slot.assignedNodes();
            if (assignedNodes.length > 0) {
                this.el.shadowRoot.querySelector('.text').classList.remove('hidden');
            } else {
                this.el.shadowRoot.querySelector('.text').classList.add('hidden');
            }
        }
    }
    
    render() {
        return (
            <Host>
                <label htmlFor={this.name} class="wcs-container" aria-disabled={this.disabled}>
                    <input
                        onBlur={this.handleBlur.bind(this)}
                        onChange={this.handleChange.bind(this)}
                        onFocus={this.handleFocus.bind(this)}
                        checked={this.checked}
                        class="wcs-checkbox"
                        type="checkbox"
                        ref={(el) => (this.nativeInput = el)}
                        name={this.name}
                        disabled={this.disabled}
                        id={this.name}
                        {...this.inheritedAttributes}
                    ></input>
                    <span class="wcs-checkmark"></span>
                    <span class="text">
                        <slot onSlotchange={(_) => this.onSlotChange()} />
                    </span>
                </label>
            </Host>
        );
    }
}

let checkboxIds = 0;
