import {
    Component,
    ComponentInterface,
    Element,
    forceUpdate,
    h,
    Host,
    Listen,
    Method,
    Prop,
    State,
} from '@stencil/core';
import { comNavDidLoadWithResizeObserver, registerCloseHandlerForFocusOutEventOn } from "./com-nav-utils";
import { inheritAriaAttributes, inheritAttributes, isEscapeKey } from "../../utils/helpers";
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";
import { ComNavSize } from "./com-nav-size";


const COM_NAV_INHERITED_ATTRS = ['title'];

const WCS_COM_NAV_SUBMENU_TAG_NAME = 'WCS-COM-NAV-SUBMENU';

/**
 * *Part of communication design system*
 *
 * The com-nav component is a container for navigation links to external or internal pages of the website.
 *
 * @slot <no-name> - Default slot containing all the menu declarations
 * @slot app-name - (Optional) Extra slot for the application name
 * @slot actions - Slot for actions placed on the right part of the container
 * 
 * @cssprop --wcs-com-nav-menu-bar-height - Height of the menu bar
 * @cssprop --wcs-com-nav-border-color - Border color of the bottom border of the com-nav
 * @cssprop --wcs-com-nav-border-width - Border width of the border below com-nav
 * @cssprop --wcs-com-nav-background-color - Background color of the com-nav;
 * @cssprop --wcs-com-nav-app-name-color - App name color
 * @cssprop --wcs-com-nav-app-name-font-weight - App name font-weight
 * @cssprop --wcs-com-nav-app-name-font-size - Font size of the App name text
 * @cssprop --wcs-com-nav-app-name-line-height - Line height of the App name text
 * @cssprop --wcs-com-nav-item-color - Color of the wcs-nav-item inside menu-bar
 * @cssprop --wcs-com-nav-item-font-weight - Font weight of the wcs-nav-item inside menu-bar
 * @cssprop --wcs-com-nav-focus-outline-color - Focus outline color of the wcs-nav-item inside menu-bar
 * @cssprop --wcs-com-nav-horizontal-padding - Padding horizontal of wcs-com-nav
 * @cssprop --wcs-com-nav-mobile-overlay-gap - Gap between each items section in mobile overlay
 * @cssprop --wcs-com-nav-mobile-overlay-padding-top - Padding top inside mobile overlay
 * @cssprop --wcs-com-nav-mobile-overlay-padding-bottom - Padding bottom inside mobile overlay
 * @cssprop --wcs-com-nav-mobile-overlay-padding-left - Padding left inside mobile overlay
 * @cssprop --wcs-com-nav-mobile-overlay-padding-right - Padding right inside mobile overlay
 * @cssprop --wcs-com-nav-mobile-menu-icon-border-color - Bar border color on the left of icon mobile menu
 * @cssprop --wcs-com-nav-mobile-menu-icon-gap- Gap between icon mobile menu and separator on the left
 * @cssprop --wcs-com-nav-mobile-menu-icon-margin-left - Margin left of icon mobile menu
 * @cssprop --wcs-com-nav-menu-bar-gap - Gap between each item inside menu-bar
 * @cssprop --wcs-com-nav-menu-bar-margin-left - Margin left between menu bar and the app-name section
 * @cssprop --wcs-com-nav-menu-bar-item-color - Item color of the item inside menu bar
 * @cssprop --wcs-com-nav-menu-bar-item-font-weight - Font weight of the item inside menu bar
 */
@Component({
    tag: 'wcs-com-nav',
    styleUrl: 'com-nav.scss',
    shadow: true,
})
export class ComNav implements ComponentInterface, MutableAriaAttribute {
    @Element() private el!: HTMLWcsComNavElement;
    private inheritedAttributes: { [k: string]: any } = {};

    /** Name of the application to be displayed in the menu bar */
    @Prop() appName: string;

    @State() private mobileMenuOpen: boolean = false;
    @State() public currentActiveSizing: ComNavSize;
    private resizeObserver: ResizeObserver;

    private mobileMenuIconClick() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
    }

    disconnectedCallback() {
        this.resizeObserver?.disconnect();
    }

    componentWillLoad(): Promise<void> | void {
        this.inheritedAttributes = {
            ...inheritAriaAttributes(this.el),
            ...inheritAttributes(this.el, COM_NAV_INHERITED_ATTRS)
        };

        const slottedNavigableItems = this.el.querySelectorAll(':scope > wcs-com-nav-submenu:not([slot]), :scope > a:not([slot])');
        registerCloseHandlerForFocusOutEventOn<HTMLWcsComNavSubmenuElement>(slottedNavigableItems, WCS_COM_NAV_SUBMENU_TAG_NAME);
    }

    componentDidLoad(): void {
        if(!this.resizeObserver) {
            this.resizeObserver = comNavDidLoadWithResizeObserver(this);
            this.resizeObserver.observe(document.body);
        }
    }
    
    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        // XXX: Special case on this component because of the desktop / mobile mode that re-renders the <nav> element,
        // making it lose all its attribute
        this.inheritedAttributes[attr] = value;
        forceUpdate(this);
    }

    private closeMobileMenu() {
        this.mobileMenuOpen = false;
    }

    // In mobile mode, we have only one global drawer to display the menu, that why we have to listen the clicks events
    // in the root component (this component). In desktop mode, all submenus and categories manage their drawer its
    // opening state.
    //
    // We listen to the click events fired by the submenu component and we close the mobile menu.
    // In desktop mode, the submenu itself manages the closing of the menu.
    @Listen('wcsClickOnFinalAction')
    onClickOnFinalAction() {
        this.closeMobileMenu();
    }
    
    render() {
        const menuAriaLabel = this.inheritedAttributes['aria-label'] || undefined;
        
        return (
            <Host>
                <div class="container">
                    <div class="container-left">
                        <div class="app-name">{this.appName}
                            <slot name="app-name"/>
                        </div>
                        {this.currentActiveSizing === 'desktop' ?
                            <nav role="navigation" {...this.inheritedAttributes}>
                                <div class="menu-bar" role="list">
                                    {this.currentActiveSizing === 'desktop' 
                                        ? <slot/> 
                                        : null}
                                </div>
                            </nav>
                            : null}
                    </div>
                    <div class="container-right">
                        <slot name="actions"/>
                        {this.currentActiveSizing === 'mobile' ?
                            <nav id="wcs-com-nav-mobile-menu" role="navigation" {...this.inheritedAttributes}>
                                <button id="mobile-menu-icon"
                                    aria-label={menuAriaLabel}
                                    aria-expanded={this.mobileMenuOpen ? "true" : "false"}
                                    aria-controls="wcs-com-nav-mobile-menu"
                                    onClick={() => this.mobileMenuIconClick()}></button>
                                {this.currentActiveSizing === 'mobile'
                                    ? <div class="mobile-overlay" data-mobile-open={this.mobileMenuOpen} role="list"><slot /></div>
                                    : null}
                            </nav>
                            : null}
                    </div>
                </div>
            </Host>
        );
    }

    /**
     * Close the mobile menu if the user press escape.
     * @param evt keydown event on window target.
     */
    @Listen('keydown', {target: 'window'})
    exitMobileMenuOnKeyDown(evt: KeyboardEvent) {
        if (isEscapeKey(evt)) {
            this.closeMobileMenu();
        }
    }
}
