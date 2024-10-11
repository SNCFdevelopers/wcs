import { Component, ComponentInterface, Prop, h } from '@stencil/core';
import { WcsSpinnerMode } from './spinner-interface';

/**
 * The spinner component is visual indicator that showing a process is happening in the background but the interface is
 * not yet ready for interaction.  
 * If your page structure is simple or the loading time is long (> 300ms), use [wcs-skeleton](.?path=/docs/components-skeleton--documentation) instead.
 * 
 * @cssprop --wcs-spinner-dashed-background-circle - The color of the dashed circle in the background
 * @cssprop --wcs-spinner-rotating-circle-color - The color of the rotating circle
 * 
 * @cssprop --wcs-spinner-rotate-animation-duration - The duration of the rotation animation
 * @cssprop --wcs-spinner-dashed-animation-duration - The duration of the dash animation
 * @cssprop --wcs-spinner-growing-animation-duration - The duration of the growing animation
 */
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
