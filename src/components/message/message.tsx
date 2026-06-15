import {Component, Event, EventEmitter, h, Host, Prop} from '@stencil/core';
import {WcsAlertIntent} from '../alert/alert-interface';
import {WcsMessageBackground} from "./message-interface";
import {AlertCloseButton} from "../alert/alert-close-button";

/**
 * Messages are used to communicate contextual information to users.
 * They can display information, success, warning, or error states.
 *
 * Unlike alerts, messages are static feedback elements and are not automatically dismissed.
 *
 * @cssprop --wcs-message-title-color - Text color of the title
 * @cssprop --wcs-message-subtitle-color - Text color of the subtitle
 *
 * @cssprop --wcs-message-title-font-weight - Font weight of the title
 * @cssprop --wcs-message-subtitle-font-weight - Font weight of the subtitle
 *
 * @cssprop --wcs-message-title-font-size - Font size of the title
 * @cssprop --wcs-message-subtitle-font-size - Font size of the subtitle
 *
 * @cssprop --wcs-message-dismiss-button-color - Color of the dismiss button
 *
 * @cssprop --wcs-message-border-radius - Border radius of the message
 * @cssprop --wcs-message-border-width - Border width of the message
 * 
 * @cssprop --wcs-message-padding - Padding of the message
 * @cssprop --wcs-message-gap - Gap between icon and content
 *
 * @cssprop --wcs-message-border-color-success - Border color of success messages
 * @cssprop --wcs-message-icon-color-success - Icon color of success messages
 * @cssprop --wcs-message-background-color-lightest-success - Lightest background color of success messages
 * @cssprop --wcs-message-background-color-lighter-success - Lighter background color of success messages
 *
 * @cssprop --wcs-message-border-color-information - Border color of information messages
 * @cssprop --wcs-message-icon-color-information - Icon color of information messages
 * @cssprop --wcs-message-background-color-lightest-information - Lightest background color of information messages
 * @cssprop --wcs-message-background-color-lighter-information - Lighter background color of information messages
 *
 * @cssprop --wcs-message-border-color-warning - Border color of warning messages
 * @cssprop --wcs-message-icon-color-warning - Icon color of warning messages
 * @cssprop --wcs-message-background-color-lightest-warning - Lightest background color of warning messages
 * @cssprop --wcs-message-background-color-lighter-warning - Lighter background color of warning messages
 *
 * @cssprop --wcs-message-border-color-error - Border color of error messages
 * @cssprop --wcs-message-icon-color-error - Icon color of error messages
 * @cssprop --wcs-message-background-color-lightest-error - Lightest background color of error messages
 * @cssprop --wcs-message-background-color-lighter-error - Lighter background color of error messages
 *
 * @slot title - Title content of the message
 * @slot subtitle - Subtitle content of the message
 */
@Component({
    tag: 'wcs-message',
    styleUrl: 'message.scss',
    shadow: true,
})
export class Message {
    /**
     * Defines the semantic intent of the message.
     * - Non-disruptive messages (`information`, `success`) use `role="status"`
     * - Disruptive messages (`warning`, `error`) use `role="alert"`
     */
    @Prop({reflect: true})
    intent: WcsAlertIntent = 'information';

    /**
     * Defines the background appearance of the message.
     */
    @Prop({reflect: true})
    background: WcsMessageBackground = 'lightest';

    /**
     * Specifies whether the component should display a close button.
     */
    @Prop({reflect: true})
    showCloseButton: boolean = false;

    /**
     * Defines whether the message should have a border. The border color is determined by the intent of the message.
     */
    @Prop({reflect: true})
    showBorder: boolean = false;

    /**
     * Event emitted when the message is dismissed.
     */
    @Event() wcsMessageDismiss: EventEmitter<void>;

    private close() {
        this.wcsMessageDismiss.emit();
    }

    private getMaterialIcon() {
        switch (this.intent) {
            case 'success':
                return 'check_circle';
            case 'information':
                return 'info';
            case 'error':
                return 'error';
            case 'warning':
                return 'warning';
        }
    }

    private getAriaLabel() {
        switch (this.intent) {
            case 'success':
                return 'Succès';
            case 'information':
                return 'Information';
            case 'error':
                return 'Erreur';
            case 'warning':
                return 'Attention';
        }
    }

    render() {
        const isDisruptive = this.intent === 'error' || this.intent === 'warning';

        return (
            <Host role={isDisruptive ? 'alert' : 'status'}>
                <div class="icon-content-container">
                    <wcs-mat-icon
                        class="announcement-icon"
                        icon={this.getMaterialIcon()}
                        aria-label={this.getAriaLabel()}
                        role="img"
                        aria-hidden={false}/>
                    <div class="content">
                        <slot name="title"></slot>
                        <slot name="subtitle"></slot>
                    </div>
                </div>
                {this.showCloseButton && (
                    <AlertCloseButton onClick={() => this.close()}/>
                )}
            </Host>
        );
    }
}
