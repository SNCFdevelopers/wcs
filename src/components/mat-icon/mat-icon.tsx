import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'wcs-mat-icon',
    styleUrl: 'mat-icon.scss',
    shadow: true
})
export class MatIcon implements ComponentInterface {
    /**
     * Use the icon name from Material Icons
     */
    @Prop() icon: string;
    /**
     * Size of the icon
     */
    @Prop() size: 's' | 'm' | 'l' | 'xl' = 'm';
    render() {
        return (
            <Host>
                <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <i class={'material-icons size-' + this.size}>
                    {this.icon}
                </i>
            </Host>
        );
    }
}
