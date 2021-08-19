import { Component, ComponentInterface, h, Host } from '@stencil/core';

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
                        <div>
                            <slot name="end-left"/>
                        </div>
                        <div>
                            <slot name="end-right"/>
                        </div>
                    </div>
                </div>
            </Host>
        )
    }
}
