import {
    Element,
    Component,
    Event,
    EventEmitter,
    h,
    Host,
    Listen,
    Prop,
    ComponentInterface, 
    Watch
} from '@stencil/core';
import { ModalSize } from './modal-interface';
import { isElementFocused, isFocusable } from "../../utils/accessibility";
import { isTabKey } from "../../utils/helpers";

@Component({
    tag: 'wcs-modal',
    styleUrl: 'modal.scss',
    shadow: false,
})
export class Modal implements ComponentInterface {
    @Element() el: HTMLElement;

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

    /**
     * Give an unique id
     * @private
     */
    private modalId: number = modalIds++;

    private firstFocusableElement: HTMLElement;
    private lastFocusableElement: HTMLElement;
    /**
     * This attribute is used to determine whether the show attribute has changed since the last rendering. 
     * This allows us to call the focus method on the first element of the modal when the show attribute changes to true. 
     * This call is made in the componentDidRender method
     * @private
     */
    private showAttributeChangedMarker: boolean = false;

    componentDidLoad() {
        this.updateFocusableElements();
    }

    componentDidRender() {
        this.updateFocusableElements();
        if (this.showAttributeChangedMarker) {
            this.showAttributeChangedMarker = false;
            this.firstFocusableElement?.focus();
        }
    }
    
    @Watch("show")
    onShowChange() {
        if(this.show) {
            this.showAttributeChangedMarker = true;
        }
    }

    private updateFocusableElements() {
        const focusableElements = Array.from(this.el.querySelectorAll('*'))
            .filter(element => isFocusable(element));

        this.firstFocusableElement = focusableElements.length > 0 && focusableElements[0] as HTMLElement;
        this.lastFocusableElement = focusableElements.length > 0 && focusableElements[focusableElements.length - 1] as HTMLElement;
    }
    
    private close() {
        // If the modal isn't shown, we don't do anything
        if (this.show) {
            this.show = false;
            this.wcsDialogClosed.emit();
        }
    }

    @Listen('keydown', {target: 'document'})
    onKeyDown(event: KeyboardEvent) {
        if (this.show && this.showCloseButton && event.key === 'Escape') {
            this.close();
        }

        if (this.show) {
            const firstElement = this.firstFocusableElement;
            const lastElement = this.lastFocusableElement;

            if (isTabKey(event)) {
                if (event.shiftKey && isElementFocused(firstElement)) {
                    event.preventDefault();
                    lastElement.focus();
                } else if (!event.shiftKey && isElementFocused(lastElement)) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        }
    }

    private onCloseButtonClick(_: MouseEvent) {
        this.close();
    }

    private handleSlotContentChange() {
        this.updateFocusableElements();
    }

    render() {
        const modalTitleId = `wcs-modal-title-${this.modalId}`;
        return (
            <Host>
                <div class="wcs-modal-container"
                     data-size={this.size}
                     aria-modal={true}
                     role={"dialog"}
                     aria-labelledby={modalTitleId}
                >
                    <div class="wcs-modal-header">
                        <h5 id={modalTitleId}>
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
                        <slot onSlotchange={() => this.handleSlotContentChange()}></slot>
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
}

let modalIds = 0;
