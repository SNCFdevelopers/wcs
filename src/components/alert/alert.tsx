import {Component, Event, EventEmitter, h, Host, Prop, Element, Listen} from '@stencil/core';
import {WcsAlertIntent} from "./alert-interface";
import {AlertCloseButton} from "./alert-close-button";

/**
 * Alerts are used to communicate a state or an action that has been performed.
 * It has to be used conjunction with the `wcs-alert-drawer` component, or you can use it independently by taking care of
 * the alert visibility
 *
 * @cssprop --wcs-alert-background-color - Background color of the alert
 * @cssprop --wcs-alert-icon-background-color - Background color of the icon
 * @cssprop --wcs-alert-title-color - Color of the title
 * @cssprop --wcs-alert-subtitle-color - Color of the subtitle
 * @cssprop --wcs-alert-dismiss-button-color - Color of the dismiss button
 * @cssprop --wcs-alert-title-font-weight - Font weight of the title
 * @cssprop --wcs-alert-subtitle-font-weight - Font weight of the subtitle
 * @cssprop --wcs-alert-title-font-size - Font size of the title
 * @cssprop --wcs-alert-subtitle-font-size - Font size of the subtitle
 * @cssprop --wcs-alert-border-width - Border width of the alert
 * @cssprop --wcs-alert-border-color - Border color of the alert
 * @cssprop --wcs-alert-border-radius - Border radius of the alert
 * @cssprop --wcs-alert-padding - Padding of the alert
 * @cssprop --wcs-alert-gap - Gap between each element of the alert, icon content and close button
 * @cssprop --wcs-alert-min-width - Minimum width of the alert, default to 100% and it is set by alert-drawer component
 * @cssprop --wcs-alert-progress-bar-height - Height of the progress bar if `showProgressBar` is set to true
 * @cssprop --wcs-alert-progress-bar-background-color - Background color of the progress bar
 */
@Component({
    tag: 'wcs-alert',
    styleUrl: 'alert.scss',
    shadow: true,
})
export class Alert {
    @Element() private el: HTMLElement;

    /**
     * Controls the visibility state of the alert.
     * This property is exposed to allow control of the alert's display state and animation timing:
     * - Used by wcs-alert-drawer to coordinate exit animations when the alert is dismissed
     * - Can be used directly for custom implementations (though using wcs-alert-drawer is recommended)
     * - When set to false, it triggers the exit animation if implemented
     *
     * Note: While direct usage is possible for custom implementations, it's recommended to use
     * wcs-alert-drawer for consistent alert management and animations.
     */
    @Prop({mutable: true, reflect: true}) show: boolean = true;

    @Prop({reflect: true})
    intent: WcsAlertIntent = 'success';

    /**
     * Event emitted when the alert is dismissed
     */
    @Event() wcsAlertDismiss: EventEmitter<void>;

    /**
     * Time duration of the alert visibility
     *
     * 5000ms by default
     * If 0, the alert will not emit `wcsAlertDismiss` event automatically
     */
    @Prop() timeout = 5000;
    @Prop() showProgressBar: boolean = false;

    /** Only active if timeout > 0, becomes true when the alert reaches its maximum display time */
    private isTimedOut: boolean = false;

    /** Indicates if the mouse cursor is hovering over the alert */
    private isMouseHover: boolean = false;
    /**
     * ID of the setTimeout used to manage the alert's lifetime
     * https://developer.mozilla.org/en-US/docs/Web/API/Window/clearTimeout#notes
     */
    private timeoutId = undefined;

    /** Reference to the alert's information icon for managing its aria-label */
    private annoucementIconHtmlElement!: HTMLWcsMatIconElement;


    @Listen('mouseover')
    mouseOverHandler() {
        this.mouseHover(true)
    }

    @Listen('mouseout')
    mouseOutHandler() {
        this.mouseHover(false);
    }

    /**
     * Handles the mouse hover state of the alert
     * @param hover - true if the mouse is hovering over the alert, false otherwise
     */
    private mouseHover(hover: boolean) {
        this.isMouseHover = hover;

        // If the timeout has passed (i.e. the user had the mouse on the component when it expired), we close the alert.
        if (this.isTimedOut && !this.isMouseHover) {
            this.close();
        }
    }

    async componentWillLoad() {
        await this.showAlertAndRunTimeout();
    }

    async componentDidLoad() {
        /*
        Because icon serves also to announce the state of the alert based on the type. We set aria-label on the icon based
        on the type
         */
        this.annoucementIconHtmlElement?.setAriaAttribute('aria-hidden', 'false');

        if (this.showProgressBar) {
            this.el.style.setProperty('--wcs-alert-internal-progress-bar-animation-duration', this.timeout / 1000 + 's');
        } else {
            this.el.style.setProperty('--wcs-alert-internal-progress-bar-animation-duration', '0s');
        }
    }

    async showAlertAndRunTimeout() {
        if (this.timeout === 0) return;
        this.show = true;
        this.timeoutId = setTimeout(() => {
            // If the user has the mouse over the alert, we only indicate that the timemout has expired, and the method that handles the mousehover event will close it
            if (!this.isMouseHover) {
                this.close();
            }
            this.isTimedOut = true;
        }, this.timeout);
    }

    private onCloseButtonClick(_: MouseEvent) {
        this.close();
    }

    private close() {
        this.show = false;
        this.wcsAlertDismiss.emit();
    }

    private getMaterialIcon() {
        switch (this.intent) {
            case "success":
                return 'check_circle'
            case "information":
                return 'info'
            case "error":
                return 'error'
            case "warning":
                return 'warning'
        }
    }

    private getAriaLabel() {
        switch (this.intent) {
            case "success":
                return 'Succès';
            case "information":
                return 'Information';
            case "error":
                return 'Erreur';
            case "warning":
                return 'Attention';
        }
    }

    disconnectedCallback() {
        /*
         https://developer.mozilla.org/en-US/docs/Web/API/Window/clearTimeout#notes 
         (Passing an invalid ID to clearTimeout() silently does nothing; no exception is thrown.)
         */
        clearTimeout(this.timeoutId);
    }

    render() {
        return (
            <Host>
                <div class="icon-content-container">
                    <wcs-mat-icon class="announcement-icon"
                                  ref={(el) => this.annoucementIconHtmlElement = el}
                                  icon={this.getMaterialIcon()}
                                  aria-label={this.getAriaLabel()}
                                  role="img"
                                  aria-hidden={false}></wcs-mat-icon>
                    <div class="content">
                        <slot name="title"></slot>
                        <slot name="subtitle"></slot>
                    </div>
                </div>
                <AlertCloseButton onClick={($event) => this.onCloseButtonClick($event)}/>
                <div class={'progress-bar' + (!this.showProgressBar ? ' hidden' : '')}>
                    <div class="progress-bar-track"></div>
                </div>
            </Host>
        );
    }
}
