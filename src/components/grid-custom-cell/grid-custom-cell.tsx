import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'wcs-grid-custom-cell',
    shadow: true
})
export class GridCustomCell implements ComponentInterface {
    /**
     * ID of the column for which to render the cell
     */
    @Prop() columnId: string;
    /**
     * Key value of the object rendered for the cell's row
     */
    @Prop() rowId: any;

    render(): any {
        return (
            <Host slot={this.columnId + '-' + this.rowId}>
                <slot />
            </Host>
        );
    }
}
