import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';
import { SwitchChangeEventDetail, SwitchLabelAlignment } from './switch-interface';
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";
import { inheritAriaAttributes, inheritAttributes, setOrRemoveAttribute } from "../../utils/helpers";

const SWITCH_INHERITED_ATTRS = ['tabindex'];

/**
 * The switch component is a control used to switch between on and off state.
 * 
 * @cssprop --wcs-switch-outline-color-focus - Color of the focus outline
 * 
 * @cssprop --wcs-switch-text-color-default - Color of the text when the switch is not selected
 * @cssprop --wcs-switch-text-color-selected - Color of the text when the switch is selected
 * @cssprop --wcs-switch-text-color-disabled - Color of the text when the switch is disabled

 * 
 * @cssprop --wcs-switch-background-color-initial - Background color of the switch when not selected
 * @cssprop --wcs-switch-background-color-final - Background color of the switch when selected
 * @cssprop --wcs-switch-background-color-disabled - Background color of the switch when disabled
 * @cssprop --wcs-switch-background-color-disabled-selected - Background color of the switch when disabled and selected
 * @cssprop --wcs-switch-background-color-hover-selected - Background color of the switch when hovered and selected
 * 
 * @cssprop --wcs-switch-height - Height of the switch
 * @cssprop --wcs-switch-width - Width of the switch
 * @cssprop --wcs-switch-border-radius - Border radius of the switch
 * @cssprop --wcs-switch-padding-horizontal - Horizontal padding of the switch
 * @cssprop --wcs-switch-padding-vertical - Vertical padding of the switch
 * 
 * @cssprop --wcs-switch-dot-color-default - Color of the dot when not selected
 * @cssprop --wcs-switch-dot-color-selected - Color of the dot when selected
 * @cssprop --wcs-switch-dot-color-disabled - Color of the dot when disabled
 * 
 * @cssprop --wcs-switch-dot-translate-x - Horizontal translation of the dot (from left to right = right to left)
 * @cssprop --wcs-switch-dot-size - Size of the dot
 * 
 * @cssprop --wcs-switch-gap - Gap between the switch and the text
 */
@Component({
    tag: 'wcs-switch',
    styleUrl: 'switch.scss',
    shadow: {
        delegatesFocus: true,
    }
})
export class Switch implements ComponentInterface, MutableAriaAttribute {
    @Element() private el!: HTMLElement;
    private switchId = `wcs-switch-${switchIds++}`;
    private nativeInput!: HTMLInputElement;
    private inheritedAttributes: { [k: string]: any } = {};

    @Prop() name = this.switchId;

    /**
     * If `true`, the switch is selected.
     */
    @Prop({reflect: true}) checked = false;

    /**
     * Specifie the alignment of the switch with the label content
     */
    @Prop({reflect: true}) labelAlignment: SwitchLabelAlignment = 'center';

    /**
     * Specify whether the switch is disabled or not.
     */
    @Prop() disabled: boolean = false;

    /**
     * Emitted when the checked property has changed.
     */
    @Event() wcsChange!: EventEmitter<SwitchChangeEventDetail>;

    /**
     * Emitted when the switch has focus.
     */
    @Event() wcsFocus!: EventEmitter<FocusEvent>;
    
    /**
     * Emitted when the switch loses focus.
     */
    @Event() wcsBlur!: EventEmitter<FocusEvent>;

    toggleChange(_event: Event) {
        this.checked = !this.checked;
        this.wcsChange.emit({
            checked: this.checked
        });
    }

    handleFocus(event: FocusEvent) {
        this.wcsFocus.emit(event);
    }

    handleBlur(event: FocusEvent) {
        this.wcsBlur.emit(event);
    }

    componentWillLoad(): Promise<void> | void {
        this.inheritedAttributes = {
            ...inheritAriaAttributes(this.el),
            ...inheritAttributes(this.el, SWITCH_INHERITED_ATTRS),
        };
    }
    
    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        setOrRemoveAttribute(this.nativeInput, attr, value);
    }

    render() {
        return (
            <Host>
                <label htmlFor={this.name} class="wcs-container" aria-disabled={this.disabled}>
                    <input onBlur={this.handleBlur.bind(this)}
                           onChange={(evt) => this.toggleChange(evt)}
                           onFocus={this.handleFocus.bind(this)}
                           checked={this.checked}
                           id={this.name}
                           class="wcs-switch"
                           type="checkbox"
                           name={this.name}
                           disabled={this.disabled}
                           ref={el => {this.nativeInput = el}}
                           {...this.inheritedAttributes}>
                    </input>
                    <span class="wcs-checkmark"></span>
                    <span class="text">
                        <slot/>
                    </span>
                </label>
            </Host>
        );
    }
}

let switchIds = 0;
