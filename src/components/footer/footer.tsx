import { Component, ComponentInterface, h, Host } from '@stencil/core';

/**
 * The footer component has been designed to leave as much customization as possible to the developer. The footers are often specific to the application developed.
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
