import { Component, ComponentInterface, Prop } from '@stencil/core';
import { WcsSpinnerMode } from './spinner-interface';

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
    @Prop({ reflect: true }) mode: WcsSpinnerMode = 'border';
}
