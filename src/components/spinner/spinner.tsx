import { Component, ComponentInterface, h, Prop } from '@stencil/core';

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
    @Prop({ mutable: true, reflectToAttr: true }) mode: 'border' | 'growing' = 'border';

    private createSpinnerModeClasses() {
        if (this.mode === 'border') {
            return 'wcs-spinner-border';
        } else if (this.mode === 'growing') {
            return 'wcs-spinner-grow';
        }
    }

    render() {
        return (
            <div class={this.createSpinnerModeClasses()}></div>

        );
    }
}
