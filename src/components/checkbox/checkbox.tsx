import { Component, Prop, Event, EventEmitter, ComponentInterface, h, Host, Method, Element } from '@stencil/core';
import { CheckboxChangeEventDetail, CheckboxLabelAlignment } from './checkbox-interface';
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";
import { inheritAriaAttributes, inheritAttributes, setOrRemoveAttribute } from "../../utils/helpers";

const CHECKBOX_INHERITED_ATTRS = ['tabindex', 'title'];

/**
 * The checkbox component is an input for choosing one or more items from a set by checking / unchecking it.
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
    @Prop() disabled: boolean = false;

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
                        <slot />
                    </span>
                </label>
            </Host>
        );
    }
}

let checkboxIds = 0;
