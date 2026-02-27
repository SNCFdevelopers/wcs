import { Component, ComponentInterface, h, Host, Method, Prop, Element } from '@stencil/core';
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";
import { inheritAriaAttributes, inheritAttributes, setOrRemoveAttribute } from "../../utils/helpers";

const LABEL_INHERITED_ATTRS = ['title'];

/**
 * The `wcs-label` should always be wrapped in a `wcs-form-field`.
 * It is used to caption a form control component.
 *
 * ## Accessibility guidelines 💡
 * - Use concise name for the label. If you want to describe more your form control, add a `wcs-hint`
 * - Use the required flag only as an indication to inform users that the form control is required
 * 
 * @cssprop --wcs-label-color - Color of the text
 * @cssprop --wcs-label-font-weight - Font weight of the text
 * 
 * @cssprop --wcs-label-required-marker-color - Color of the required marker
 * 
 * @cssprop --wcs-label-gap - Gap between text and required marker
 */
@Component({
    tag: 'wcs-label',
    styleUrl: 'label.scss',
    shadow: true,
})
export class Label implements ComponentInterface, MutableAriaAttribute {
    @Element() private el!: HTMLElement;
    private nativeLabel?: HTMLLabelElement;
    private inheritedAttributes: { [k: string]: any } = {};
    
    /**
     * If `true`, marks the label with a red star.
     * Automatically added if the wrapped component inside the `wcs-form-field` already has the `required` attribute. 
     */
    @Prop({ reflect: true }) required: boolean = false;

    componentWillLoad() {
        this.inheritedAttributes = {
            ...inheritAriaAttributes(this.el),
            ...inheritAttributes(this.el, LABEL_INHERITED_ATTRS),
        };
    }

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        setOrRemoveAttribute(this.nativeLabel, attr, value);
    }

    render() {
        return (
            <Host slot="label">
                <label ref={(el) => this.nativeLabel = el} {...this.inheritedAttributes}>
                    <slot />
                    {this.required && <span aria-hidden="true" class="required-marker">*</span>}
                </label>
            </Host>
        );
    }
}
