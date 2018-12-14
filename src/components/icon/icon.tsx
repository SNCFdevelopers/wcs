import { Component, Prop } from '@stencil/core';


@Component({
    tag: 'wcs-icon'
})
export class Icon {
    @Prop() icon: string;
    @Prop() size: 'x5' | 'x75' | '1x' | '1x2' | '1x5' | '1x7' | '2x' | '3x' | '30px' | '50px' | '66px' | '90px' | '96px' | '140px';

    render() {
        const cssClass = {
            class: {
                [`icons-${this.icon}`]: true,
                [`icons-size-${this.size}`]: true }
        };
        return (
            <i {...cssClass}>
            </i>
        );
    }
}
