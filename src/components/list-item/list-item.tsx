import { Component, ComponentInterface, h, Host } from '@stencil/core';

@Component({
    tag: 'wcs-list-item',
    styleUrl: 'list-item.scss',
    shadow: true
})
export class ListItem implements ComponentInterface {
    render() {
        return (
            <Host>
                <slot name="icon"/>
                <div class="content">
                    <div class="header">
                        <div>
                            <slot name="title"/>
                            <slot name="properties"/>
                        </div>
                        <slot name="actions"/>
                    </div>
                    <slot name="description"/>
                </div>
            </Host>
        );
    }
}
