import { Component, ComponentInterface, Element, h, Host, Method, Prop } from '@stencil/core';
import { MaterialIconFamily, MaterialIconSize } from './mat-icon-interface';
import { inheritAriaAttributes, inheritAttributes, setOrRemoveAttribute } from "../../utils/helpers";
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";

const ICON_FAMILY_CLASS_NAME: Record<MaterialIconFamily, string> = {
    filled: 'material-icons',
    outlined: 'material-icons-outlined',
    twotone: 'material-icons-two-tone',
    rounded: 'material-icons-round',
    sharp: 'material-icons-sharp'
}

const MAT_ICON_INHERITED_ATTRS = ['title'];

/**
 * A component used to display a [Material Icon](https://fonts.google.com/icons). Can be useful when used in wcs-grid or in a wcs-button.
 */
@Component({
    tag: 'wcs-mat-icon',
    styleUrl: 'mat-icon.scss',
    shadow: true
})
export class MatIcon implements ComponentInterface, MutableAriaAttribute {
    @Element() private el!: HTMLElement;
    private nativeIcon!: HTMLElement;
    private inheritedAttributes: { [k: string]: any } = {};

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

    componentWillLoad(): Promise<void> | void {
        this.inheritedAttributes = {
            ...inheritAriaAttributes(this.el),
            ...inheritAttributes(this.el, MAT_ICON_INHERITED_ATTRS),
        };
    }

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        setOrRemoveAttribute(this.nativeIcon, attr, value);
    }

    render() {
        return (
            <Host>
                <i aria-hidden="true"
                   class={ICON_FAMILY_CLASS_NAME[this.family] + ' size-' + this.size}
                   ref={(el) => (this.nativeIcon = el)}
                   {...this.inheritedAttributes}>
                    {this.icon}
                </i>
            </Host>
        );
    }
}
