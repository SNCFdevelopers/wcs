import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'wcs-mat-icon',
    shadow: true
})
export class MatIcon implements ComponentInterface {
    /**
     * Use the icon name from Material Icons
     */
    @Prop() icon: string;

    render() {
        return (
            <Host>
                <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <i class="material-icons">
                    {this.icon}
                </i>
            </Host>
        );
    }
}
