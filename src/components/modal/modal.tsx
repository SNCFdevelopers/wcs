import { Component, Event, EventEmitter, h, Host, Listen, Prop } from '@stencil/core';
import { ModalSize } from './modal-interface';

@Component({
    tag: 'wcs-modal',
    styleUrl: 'modal.scss',
    shadow: false,
})
export class Modal {
    /**
     * Specifies whether the component should display a backdrop on the entire page
     */
    @Prop({reflect: true}) withoutBackdrop: boolean = false;

    /**
     * Displays the modal
     */
    @Prop({reflect: true}) show: boolean = false;

    /**
     * Triggered when the user leaves the dialog with the closing button.
     */
    @Event() wcsDialogClosed: EventEmitter<void>;

    /**
     * Specifies whether the component should display a close button.
     * if false, it won't close the modal when the escape key is pressed.
     */
    @Prop({reflect: true}) showCloseButton: boolean = false;

    /**
     * There are multiple sizes for modals. The default size is medium (m), however other sizes are available. Select the
     * size best suited for the content and screen size displaying the modal. Remember to test responsiveness.
     */
    @Prop() size: ModalSize = 'm';

    /**
     * Specifies whether the component should hide the actions slot or not
     */
    @Prop({reflect: true}) hideActions: boolean = false;

    render() {
        return (
            <Host>
                <div class="wcs-modal-backdrop"></div>
                <div class="wcs-modal-container" data-size={this.size}>
                    <div class="wcs-modal-header">
                        <h5>
                            <slot name="header"></slot>
                        </h5>
                        {this.showCloseButton && (
                            <wcs-button shape="round" mode="clear" class="wcs-dark"
                                        onClick={($event) => this.onCloseButtonClick($event)}>
                                <wcs-mat-icon icon="close"></wcs-mat-icon>
                            </wcs-button>)
                        }

                    </div>
                    <div class="wcs-modal-content">
                        <slot></slot>
                    </div>
                    {!this.hideActions && (
                        <div class="wcs-modal-actions">
                            <slot name="actions"></slot>
                        </div>)
                    }
                </div>
            </Host>
        );
    }

    @Listen('keydown', {target: 'document'})
    // @ts-ignore
    private onKeyDown(event: KeyboardEvent) {
        if (this.showCloseButton && event.key === 'Escape') {
            this.close();
        }
    }

    private onCloseButtonClick(_: MouseEvent) {
        this.close();
    }

    private close() {
        this.show = false;
        this.wcsDialogClosed.emit();
    }
}
