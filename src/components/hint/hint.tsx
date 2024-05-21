import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';

/**
 * The `wcs-hint` should always be wrapped in a `wcs-form-field`.
 * It is used to display an informative message under the field indicating an incorrect user input.
 * 
 * ## Accessibility guidelines 💡
 * - Provide a relevant hint message to inform the users about the format, how the data should be filled in, or what is the purpose of the field
 * - `aria-description` will be automatically added to the field for screen readers
 */
@Component({
    tag: 'wcs-hint',
    styleUrl: 'hint.scss',
    shadow: true,
})
export class Hint implements ComponentInterface {
    /**
     * Whether the component should display the small version of the hint
     */
    @Prop({ reflect: true, mutable: true })
    small: boolean = false;

    render() {
        return (
            <Host slot="messages">
                <slot />
            </Host>
        );
    }
}
