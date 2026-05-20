import { Component, Element, h, Host, Method, Prop } from '@stencil/core';
import { parseCssTimeValueToMilliseconds } from '../../utils/helpers';
import { WcsAlertDrawerPosition } from "./alert-drawer-interface";
import { WcsAlertConfig } from "../alert/alert-interface";

/**
 * Serve as a container for displaying `wcs-alert` components. Directly use this component to display alerts in your applications.
 * 
 * ## Usage
 * 
 * You can place the `wcs-alert-drawer` component anywhere in your application. It will be used to display alerts.
 * You need to set `position` property to define where the alert drawer will be displayed on the screen.
 * 
 * About alerts order:
 * - alerts are ordered up-bottom if the position is `top` and bottom-up if the position is `bottom`
 * 
 * ## Accessibility guidelines 💡
 * 
 * - The component has `aria-live="polite"` and `aria-atomic="true"` attributes to announce the new alerts to screen readers
 * 
 * ## Configuration (on the web component)
 *
 * Per default, the `wcs-alert-drawer` is configured with:
 * - `position: 'top-right'`
 * - `showProgressBar: false`
 * - `timeout: 5000`
 *
 * When using the `WcsAlertDrawer::show(alert: WcsAlertConfig)` method, you can override the default configuration by 
 * overriding it through the argument.
 * You can also set them in the `wcs-alert-drawer` component directly as attributes
 * 
 * ```html
 * <wcs-alert-drawer position="top-right" show-progress-bar timeout="10000">
 * ```
 * With this configuration, all alerts will be displayed with a progress bar and a timeout of 10 seconds.
 * 
 * @slot - the alert drawer content, where alerts you put as children will be displayed
 * 
 * @cssprop --wcs-alert-drawer-gap - Gap between alerts
 * @cssprop --wcs-alert-drawer-margin-horizontal - Margin horizontal of the alert drawer
 * @cssprop --wcs-alert-drawer-margin-vertical - Margin vertical of the alert drawer
 * @cssprop --wcs-alert-drawer-hide-alert-animation-duration - Duration of the hide alert animation
 * @cssprop --wcs-alert-drawer-min-width - Minimum width of the alert drawer => define the width of the alerts
 */
@Component({
    tag: 'wcs-alert-drawer',
    styleUrl: 'alert-drawer.scss',
    shadow: true,
})
export class AlertDrawer {
    @Element()
    private el!: HTMLWcsAlertDrawerElement;

    /**
     * Position of the alert drawer on the screen
     */
    @Prop({ reflect: true }) position: WcsAlertDrawerPosition = 'bottom-right';

    /**
     * Timeout for the alert to be dismissed automatically
     */
    @Prop() timeout: number = 5000;
    /**
     * Whether to show the progress bar or not
     */
    @Prop() showProgressBar: boolean = false;

    /*
     https://www.reddit.com/r/Frontend/comments/1ato11w/comment/kqz4gt8/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef
     */
    private alertEventListeners = new WeakMap<HTMLElement, (evt: AnimationEvent) => void>();
    private timeoutId = undefined;

    private userPrefersReducedMotion: boolean = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    private alertsContainer: HTMLDivElement;

    /**
     * Handles the dismissal of an alert
     * @param alert The alert element
     */
    private close = (alert: HTMLWcsAlertElement): void => {
        if (!this.userPrefersReducedMotion) {
            this.timeoutId = setTimeout(() => {
                alert.remove();
                // Cleanup the event listener reference
                this.alertEventListeners.delete(alert);
            }, parseCssTimeValueToMilliseconds(window.getComputedStyle(this.el).getPropertyValue("--wcs-alert-drawer-hide-alert-animation-duration")) || 300);
        } else {
            // If the user has reduced motion preference, remove the alert immediately
            alert.remove();
            // Cleanup the event listener reference
            this.alertEventListeners.delete(alert);
        }
    };

    /**
     * Method exposed on `wcs-alert-drawer` to show an alert programmatically via the JS API
     * @example
     * Plain javascript (example inside a script tag):
     * ```javascript
     *  document.querySelector('wcs-alert-drawer').show({
     *      title: 'Alert title',
     *      subtitle: 'Alert subtitle',
     *      intent: 'info',
     *      showProgressBar: true,
     *      timeout: 5000
     *  });
     * ```
     * @param alert The alert to show
     */
    @Method()
    async show(alert: WcsAlertConfig): Promise<void> {
        this.alertsContainer.appendChild(this.renderToast(alert));
    }

    /**
     * Method exposed on `wcs-alert-drawer` to clear all `wcs-alert` which are inside, via the JS API
     * @example
     * Plain javascript (example inside a script tag):
     * ```javascript
     *  document.querySelector('wcs-alert-drawer').clear();
     * ```
     */
    @Method()
    async clear(): Promise<void> {
        this.alertsContainer.replaceChildren();
    }

    private renderToast(alert: WcsAlertConfig): HTMLWcsAlertElement {
        const alertElement = document.createElement('wcs-alert') as HTMLWcsAlertElement;
        alertElement.setAttribute('intent', alert.intent);

        // Uses the alert config if defined, otherwise falls back to the drawer default
        // as the showProgressBar is a boolean attribute, we need to set it to an empty string only if true
        if ((alert.showProgressBar ?? this.showProgressBar)) {
            alertElement.setAttribute('show-progress-bar', '');
        }
        
        // Uses the alert config if defined, otherwise falls back to the drawer default
        alertElement.setAttribute('timeout', String(alert.timeout ?? this.timeout));

        const listener = () => this.close(alertElement);
        this.alertEventListeners.set(alertElement, listener);
        alertElement.addEventListener("wcsAlertDismiss", listener);
        
        const title = document.createElement('span') as HTMLSpanElement;
        title.setAttribute('slot', 'title');
        title.textContent = alert.title;
        alertElement.appendChild(title);

        const subtitle = document.createElement('span') as HTMLSpanElement;
        subtitle.setAttribute('slot', 'subtitle');
        subtitle.textContent = alert.subtitle;
        alertElement.appendChild(subtitle);

        return alertElement;
    }

    render() {
        // https://www.clever-cloud.com/doc/clever-components/?path=/docs/%F0%9F%9B%A0-toast-cc-toaster--docs#about-accessibility
        return (
            <Host role="region" aria-label="Informations" aria-live="polite" aria-atomic="true">
                <div ref={(el) => this.alertsContainer = el} id="alerts-container">
                </div>
            </Host>
        );
    }

    disconnectedCallback() {
        this.alertEventListeners = new WeakMap(); // Clear the event listeners, weakmap is not iterable
        clearTimeout(this.timeoutId);
    }
}
