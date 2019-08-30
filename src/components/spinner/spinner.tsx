import { Component, ComponentInterface, Prop } from '@stencil/core';

@Component({
    tag: 'wcs-spinner',
    styleUrl: 'spinner.scss',
    shadow: true
})
export class Spinner implements ComponentInterface {
    /**
     * Indicates the spinner display mode.
     * Accepted values: `border` or `growing`
     */
    @Prop({ mutable: true, reflect: true }) mode: 'border' | 'growing' = 'border';
}
