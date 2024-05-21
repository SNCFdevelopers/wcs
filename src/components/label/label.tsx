import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';

/**
 * The `wcs-label` should always be wrapped in a `wcs-form-field`.
 * It is used to caption a form control component.
 *
 * ## Accessibility guidelines 💡
 * - Use concise name for the label. If you want to describe more your form control, add a `wcs-hint`
 * - Use the required flag only as an indication to inform users that the form control is required
 */
@Component({
    tag: 'wcs-label',
    styleUrl: 'label.scss',
    shadow: true,
})
export class Label implements ComponentInterface {
    /**
     * If `true`, marks the label with a red star.
     * Automatically added if the wrapped component inside the `wcs-form-field` already has the `required` attribute. 
     */
    @Prop({ reflect: true }) required = false;

    render() {
        return (
            <Host slot="label">
                <label>
                    <slot />
                </label>
            </Host>
        );
    }
}
