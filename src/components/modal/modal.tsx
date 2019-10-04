import { Component, h, Prop } from '@stencil/core';

@Component({
    tag: 'wcs-modal',
    styleUrl: 'modal.scss',
    shadow: true,
})
export class Modal {
    /**
     * Specifies whether the component should display a backdrop on the entire page
     */
    @Prop({ reflect: true, mutable: false }) backdrop: boolean = true;

    /**
     * Displays the modal
     */
    @Prop({ reflect: true, mutable: true }) show: boolean = true;

    render() {
        return (
            <host>
                <div class="wcs-modal-backdrop"></div>
                <div class="wcs-modal">
                    <div class="wcs-modal-header">
                        <h5>
                            <slot name="wcs-modal-header"></slot>
                        </h5>
                        <wcs-button shape="round" mode="stroked" class="wcs-dark">
                            <i class="material-icons">close</i>
                        </wcs-button>
                    </div>
                    <div class="wcs-modal-content">
                        <slot></slot>
                    </div>
                    <div class="wcs-modal-actions">
                        <slot name="wcs-modal-actions"></slot>
                    </div>
                </div>
            </host>
        );
    }
}
