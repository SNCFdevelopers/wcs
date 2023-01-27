import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';
import { MaterialIconFamily, MaterialIconSize } from './mat-icon-interface';

const ICON_FAMILY_CLASS_NAME: Record<MaterialIconFamily, string> = {
    filled: 'material-icons',
    outlined: 'material-icons-outlined',
    twotone: 'material-icons-two-tone',
    rounded: 'material-icons-round',
    sharp: 'material-icons-sharp'
}
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
    @Prop() size: MaterialIconSize = 'm';
    /**
     * Family of the icon
     */
    @Prop() family: MaterialIconFamily = 'filled';

    render() {
        return (
            <Host>
                <i class={ICON_FAMILY_CLASS_NAME[this.family] + ' size-' + this.size}>
                    {this.icon}
                </i>
            </Host>
        );
    }
}
