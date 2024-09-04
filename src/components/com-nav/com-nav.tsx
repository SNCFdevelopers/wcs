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
import { registerCloseHandlerForFocusOutEventOn } from "./com-nav-utils";
import { getCssRootPropertyValue, inheritAriaAttributes, inheritAttributes, isEscapeKey } from "../../utils/helpers";
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";


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
    @State() private currentActiveSizing: 'desktop' | 'mobile';
    private resizeObserver: ResizeObserver;
    private hasAlreadyRegisteredClickHandlerOnSlottedLink: boolean = false;

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
            const smallBreakpoint = getCssRootPropertyValue('--wcs-phone-breakpoint-max-width') || '576px';
            const smallBreakpointValue = parseInt(smallBreakpoint, 10);            
            
            this.resizeObserver = new ResizeObserver(entry => {
                const cr = entry[0].contentRect;
                const paddingRight = cr.right - cr.width;
                const paddingLeft = cr.left;
                if (cr.width < smallBreakpointValue - (paddingLeft + paddingRight)) {
                    this.currentActiveSizing = 'mobile';
                } else {
                    this.currentActiveSizing = 'desktop';
                }
            });
            this.resizeObserver.observe(document.body);
        }
    }

    componentDidRender() {
        this.registerHandlerToCloseMobileMenuOnClickOnSlottedLinkTag();
    }
    
    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        // XXX: Special case on this component because of the desktop / mobile mode that re-renders the <nav> element,
        // making it lose all its attribute
        this.inheritedAttributes[attr] = value;
        forceUpdate(this);
    }
    
    private registerHandlerToCloseMobileMenuOnClickOnSlottedLinkTag() {
        if (this.hasAlreadyRegisteredClickHandlerOnSlottedLink) return;

        const mainSlot = this.el.shadowRoot.querySelector('slot:not([name])') as HTMLSlotElement;
        if (mainSlot) {
            this.hasAlreadyRegisteredClickHandlerOnSlottedLink = true;
            // If the user click on a `a` tag, we close the mobile menu overlay.
            mainSlot.assignedElements().filter(e => e.tagName === 'A').forEach(a => {
                    a.addEventListener('click', _ => {
                        this.mobileMenuOpen = false;
                    })
                }
            );

        }
    }

    //region Handlers for mobile menu overlay visibility
    //
    // In mobile mode, we have only one global drawer to display the menu, that why we have to listen the clicks events
    // in the root component (this component). In desktop mode, all submenus and categories manage their drawer its
    // opening state.
    //
    // We listen to the click events fired by the sebmenu component and we close the mobile menu.
    // In desktop mode, the submenu itself manages the closing of the menu.
    @Listen('wcsClickOnFinalAction')
    onClickOnFinalAction() {
        this.mobileMenuOpen = false;
    }

    // We also listen click events on the category menu items, to close the mobile menu.
    // In desktop mode, the category itself manages the closing of the menu.
    @Listen('wcsCategoryItemClicked')
    onClickOnFinalActionCat() {
        this.mobileMenuOpen = false;
    }

    //endregion
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
            this.mobileMenuOpen = false;
        }
    }
}
