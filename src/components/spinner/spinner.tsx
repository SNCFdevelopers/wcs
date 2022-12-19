import { Component, ComponentInterface, Prop, h } from '@stencil/core';
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

    render() {
        return (
            <svg viewBox="0 0 50 50">
                <circle class="dashed-background-circle" cx="25" cy="25" r="21" fill="none"/>
                <g class="infinite-rotation-container">
                    <circle class="dash-rotating-circle" cx="25" cy="25" r="21" fill="none" />
                </g>
            </svg>
        );
    }
}
