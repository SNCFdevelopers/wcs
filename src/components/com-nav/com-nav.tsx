import {Component, Host, h, Prop, Element, ComponentInterface, State, Listen} from '@stencil/core';
import {registerCloseHandlerForFocusOutEventOn} from "./com-nav-utils";

const WCS_COM_NAV_SUBMENU_TAG_NAME = 'WCS-COM-NAV-SUBMENU';

@Component({
    tag: 'wcs-com-nav',
    styleUrl: 'com-nav.scss',
    shadow: true,
})
export class ComNav implements ComponentInterface {
    @Element() el!: HTMLWcsComNavElement;

    /** Name of the application to be displayed in the menu bar */
    @Prop() appName: string;

    @State() mobileMenuOpen: boolean = false;
    @State() currentActiveSizing: 'desktop' | 'mobile';
    resizeObserver: ResizeObserver;
    private hasAlreadyRegisteredClickHandlerOnSlottedLink: boolean = false;

    private mobileMenuIconClick() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
    }

    disconnectedCallback() {
        this.resizeObserver?.disconnect();
    }

    componentWillLoad(): Promise<void> | void {
        this.resizeObserver = new ResizeObserver(entry => {
            const cr = entry[0].contentRect;
            const paddingRight = cr.right - cr.width;
            const paddingLeft = cr.left;
            if (cr.width < 576 - (paddingLeft + paddingRight)) {
                this.currentActiveSizing = 'mobile';
            } else {
                this.currentActiveSizing = 'desktop';
            }
        });
        this.resizeObserver.observe(document.body);

        const slottedNavigableItems = this.el.querySelectorAll(':scope > wcs-com-nav-submenu:not([slot]), :scope > a:not([slot])');
        registerCloseHandlerForFocusOutEventOn<HTMLWcsComNavSubmenuElement>(slottedNavigableItems, WCS_COM_NAV_SUBMENU_TAG_NAME);
    }

    componentDidRender() {
        this.registerHandlerToCloseMobileMenuOnClickOnSlottedLinkTag();
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
        return (
            <Host>
                <div class="container">
                    <div class="container-left">
                        <div class="app-name">{this.appName}
                            <slot name="app-name"/>
                        </div>
                        <div class="menu-bar">
                            {this.currentActiveSizing === 'desktop' ? <slot/> : null}
                        </div>
                    </div>
                    <div class="container-right">
                        <slot name="actions"/>
                        <span id="mobile-menu-icon" data-mobile-open={this.mobileMenuOpen}
                              onClick={() => this.mobileMenuIconClick()}></span>
                    </div>
                </div>
                <div class="mobile-overlay" data-mobile-open={this.mobileMenuOpen}>
                    {this.currentActiveSizing === 'mobile' ? <slot/> : null}
                </div>
            </Host>
        );
    }

}
