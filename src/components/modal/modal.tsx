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
    Watch, Method
} from '@stencil/core';
import { ModalSize } from './modal-interface';
import { isElementFocused, isFocusable } from "../../utils/accessibility";
import { inheritAriaAttributes, inheritAttributes, isTabKey, setOrRemoveAttribute } from "../../utils/helpers";
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";

const MODAL_INHERITED_ATTRS = [];

/**
 * The modal component (also named dialog or popup) is an interface element that appears on top of the page content.
 * Use it to show a message, a confirmation dialog, or any other content like forms.
 *
 * ## Accessibility guidelines 💡
 * > - Modal element has `role="dialog"` and `aria-modal="true"`
 * > - Keyboard navigation is trapped inside the modal
 * > - It is mandatory to set the `modal-trigger-controls-id` to the id of the element that opens the dialog, in order
 * > to focus it upon dialog dismissal.
 * > - The modal can be closed at any time by pressing the Escape key.
 * >
 * > - More info : https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 *
 * @cssprop --wcs-modal-max-height - Max height of the main container
 * @cssprop --wcs-modal-overflow-y - Overflow-y of the content
 * @slot <no-name> Main container slot
 * @slot header Header container slot (for title)
 * @slot actions Actions container slot (for buttons)
 */
@Component({
    tag: 'wcs-modal',
    styleUrl: 'modal.scss',
    shadow: false,
})
export class Modal implements ComponentInterface, MutableAriaAttribute {
    @Element() private el: HTMLElement;
    private nativeDivDialog!: HTMLDivElement;
    private inheritedAttributes: { [k: string]: any } = {};

    /**
     * Specifies whether the component should display a backdrop on the entire page
     */
    @Prop({reflect: true}) withoutBackdrop: boolean = false;

    /**
     * Displays the modal
     */
    @Prop({reflect: true, mutable: true}) show: boolean = false;

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
     * Specifies the aria-label present on the close button when the modal is opened.  
     * Only use when `showCloseButton` is `true`.
     */
    @Prop() closeButtonAriaLabel: string = 'Fermer';

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
     * Specifies which element id controls the modal
     * @private
     */
    @Prop() modalTriggerControlsId: string;

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
    /**
     * This attribute is used to determine if the modal has been closed for the first time since its last activation.
     * It is set to 'true' when the modal is first closed, and will be reset to 'false' when the modal is shown again.
     * This state is important for accessibility reasons in order to focus the modal trigger element (like the button 
     * which controls the modal)
     *
     * @private
     */
    private hasBeenClosedBefore: boolean = false;

    componentWillLoad(): Promise<void> | void {
        if (!this.modalTriggerControlsId) {
            console.warn('wcs-modal: You must provide the modal-trigger-controls-id attribute to the modal to make it to work properly');
        }

        this.inheritedAttributes = {
            ...inheritAriaAttributes(this.el),
            ...inheritAttributes(this.el, MODAL_INHERITED_ATTRS),
        };
    }

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

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        setOrRemoveAttribute(this.nativeDivDialog, attr, value);
    }
    
    @Watch("show")
    onShowChange() {
        if(this.show) {
            this.hasBeenClosedBefore = false;
            this.showAttributeChangedMarker = true;
        } else {
            // if we already made actions when the modal was firstly closed, we do nothing
            if(this.hasBeenClosedBefore) {
                return;
            }
            
            this.hasBeenClosedBefore = true;

            if(this.modalTriggerControlsId) {
                const modalTriggerControlsHtmlElement = document.getElementById(this.modalTriggerControlsId);
                if(!modalTriggerControlsHtmlElement) {
                    console.warn(`wcs-modal: Element with id '${this.modalTriggerControlsId}' could not be found`);
                }
                modalTriggerControlsHtmlElement?.focus();
            }
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
            if (isTabKey(event)) {
                this.updateFocusableElements(); // XXX: maybe a performance issue
                const firstElement = this.firstFocusableElement;
                const lastElement = this.lastFocusableElement;

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
                     ref={(el) => (this.nativeDivDialog = el)}
                     {...this.inheritedAttributes}
                >
                    <div class="wcs-modal-header">
                        <h1 id={modalTitleId}>
                            <slot name="header"></slot>
                        </h1>
                        {this.showCloseButton && (
                            <wcs-button shape="round" 
                                        mode="clear" 
                                        id="wcs-modal-close-button" 
                                        class="wcs-dark" 
                                        aria-label={this.closeButtonAriaLabel}
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
