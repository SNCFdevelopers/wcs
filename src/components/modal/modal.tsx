import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

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

    /**
     * Triggered when the user leaves the dialog with the closing button.
     */
    @Event({
        eventName: 'wcs-dialog-closed'
    }) wcsDialogClosed: EventEmitter<void>;

    @Prop({ reflect: true, mutable: false }) showCloseButton: boolean = true;

    render() {
        return (
            <host>
                <div class="wcs-modal-backdrop"></div>
                <div class="wcs-modal">
                    <div class="wcs-modal-header">
                        <h5>
                            <slot name="wcs-modal-header"></slot>
                        </h5>
                        {this.showCloseButton ? (
                            <wcs-button shape="round" mode="stroked" class="wcs-dark"
                                        onClick={($event) => this.onCloseButtonClick($event)}>
                                <i class="material-icons">close</i>
                            </wcs-button>) : ('')
                        }

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

    private onCloseButtonClick(_: MouseEvent) {
        this.show = false;
        this.wcsDialogClosed.emit();
    }
}
