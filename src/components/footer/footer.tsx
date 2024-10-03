import { Component, ComponentInterface, h, Host } from '@stencil/core';

/**
 * The footer component has been designed to leave as much customization as possible to the developer. The footers are often specific to the application developed.
 * 
 * @cssprop --wcs-footer-background-color - Background color of the footer
 * @cssprop --wcs-footer-text-color - Text color of the footer
 * @cssprop --wcs-footer-link-text-color - Text color of the links in the footer
 * @cssprop --wcs-footer-link-text-color-hover - Text color of the links in the footer when hovered
 * @cssprop --wcs-footer-link-font-size - Font size of the links in the footer
 * @cssprop --wcs-footer-link-font-weight - Font weight of the links in the footer
 * @cssprop --wcs-footer-link-gap - Gap between the links in the footer
 * @cssprop --wcs-footer-gap - Vertical gap between the content and the two end slots
 * @cssprop --wcs-footer-end-gap - Horizontal gap between the right and left end slots
 * @cssprop --wcs-footer-max-width - Max width of the footer for responsive purposes 
 * @cssprop --wcs-footer-padding - Padding all around the content of the footer
 * 
 * @slot <no-name> Main container slot
 * @slot end-left Bottom-left part of the footer
 * @slot end-right Bottom-right part of the footer
 */
@Component({
    tag: 'wcs-footer',
    styleUrl: 'footer.scss',
    shadow: true,
})
export class Footer implements ComponentInterface {
    render(): any {
        return (
            <Host>
                <div class="container">
                    <div>
                        <slot />
                    </div>
                    <div class="end">
                        <div class="end-left">
                            <slot name="end-left"/>
                        </div>
                        <div class="end-right">
                            <slot name="end-right"/>
                        </div>
                    </div>
                </div>
            </Host>
        )
    }
}
