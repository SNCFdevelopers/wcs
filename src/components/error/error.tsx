import { Component, ComponentInterface, h, Host } from '@stencil/core';

/**
 * The `wcs-error` should always be wrapped in a `wcs-form-field`.
 * It is used to display a red message under the field indicating an incorrect user input.
 * 
 * ## Accessibility guidelines 💡
 * - Provide a relevant error message to inform the users what they should change to make the field valid
 * - Always add the error icon, to ensure the visual indication of the error state other than the color
 * - `aria-description` will be automatically added to the field for screen readers
 * - `aria-invalid="true"` will be automatically added to the field for screen readers
 * 
 * @cssprop --wcs-error-color - Color of the text
 * @cssprop --wcs-error-font-size - Font size
 * @cssprop --wcs-error-font-weight - Font weight
 */
@Component({
    tag: 'wcs-error',
    styleUrl: 'error.scss',
    shadow: true,
})
export class Label implements ComponentInterface {
    render() {
        return (
            <Host role="alert" slot="error">
                <slot />
            </Host>
        );
    }
}
