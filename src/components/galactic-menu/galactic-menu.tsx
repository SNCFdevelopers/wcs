import { Component, ComponentInterface, Element, h, Host, Listen, Method, Prop, State } from '@stencil/core';
import { Instance, createPopper } from '@popperjs/core';
import {
    clickInsideElement,
    inheritAriaAttributes,
    inheritAttributes,
    isEscapeKey,
    setOrRemoveAttribute
} from '../../utils/helpers';
import { AriaAttributeName } from "../../utils/mutable-aria-attribute";


const GALACTIC_MENU_INHERITED_ATTRS = ['tabindex', 'title'];

/**
 * *Part of communication design system*
 * You can put a wcs-galactic-menu inside a wcs-galactic component to add an extra menu
 * 
 * @slot <no-name> - Main container slot
 * 
 * @cssprop --wcs-galactic-menu-background-color - Background color of the menu
 * @cssprop --wcs-galactic-menu-padding-horizontal - Horizontal padding of the menu
 * @cssprop --wcs-galactic-menu-gap - Gap between items in the menu
 * @cssprop --wcs-galactic-menu-height - Height of the menu
 * @cssprop --wcs-galactic-menu-icon-focus-outline-color - Color of the focus outline on the icon
 * @cssprop --wcs-galactic-menu-overlay-background-color - Background color of the overlay
 * @cssprop --wcs-galactic-menu-overlay-padding - Padding of the overlay
 * @cssprop --wcs-galactic-menu-overlay-color - Color of the overlay
 */
@Component({
    tag: 'wcs-galactic-menu',
    styleUrl: 'galactic-menu.scss',
    shadow: true
})
export class Galactic implements ComponentInterface {
    @Element() private el: HTMLWcsGalacticMenuElement;
    private menuButton!: HTMLButtonElement;
    private inheritedAttributes: { [k: string]: any } = {};
    
    @State() private showPopoverMenu: boolean = false;
    private popper: Instance;
    /**
     * Text to be displayed in the galactic bar
     */
    @Prop() text: string;
    private menu;
    private tooltip;

    componentDidLoad() {
        this.menu = this.el.shadowRoot.getElementById('toggle-menu-icon');
        this.tooltip = this.el.shadowRoot.getElementById('menu');
        this.popper = createPopper(this.menu, this.tooltip, {
            placement: 'bottom-end',
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8]
                    }
                }
            ]
        });
    }

    componentWillLoad(): Promise<void> | void {
        this.inheritedAttributes = {
            ...inheritAriaAttributes(this.el),
            ...inheritAttributes(this.el, GALACTIC_MENU_INHERITED_ATTRS),
        };
    }

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        setOrRemoveAttribute(this.menuButton, attr, value);
    }


    @Listen('click', {target: 'window'})
    onWindowClickEvent(event: MouseEvent) {
        if (clickInsideElement(event, this.tooltip) || clickInsideElement(event, this.menu)) {
            return;
        } else {
            if (this.showPopoverMenu) {
                this.toggleMenu();
            }
        }
    }

    @Listen('keydown')
    onKeyDown(_event: KeyboardEvent) {
        if (isEscapeKey(_event)) {
            _event.preventDefault();
            this.showPopoverMenu = false;
            this.menuButton?.focus();
        }
    }
    
    private toggleMenu() {
        this.showPopoverMenu = !this.showPopoverMenu;
    }

    componentDidRender() {
        if (this.popper) {
            this.popper.update();
        }
    }

    render(): any {
        return (
            <Host>
                <span>{this.text}</span>
                <button aria-haspopup="true"
                        aria-controls="menu"
                        ref={el => {
                            this.menuButton = el
                        }}
                        aria-expanded={this.showPopoverMenu ? "true" : "false"}
                        {...this.inheritedAttributes}
                        onClick={_ => this.toggleMenu()}>
                    <wcs-mat-icon id="toggle-menu-icon" icon="more_horiz" size="m"></wcs-mat-icon>
                </button>
                <span id="menu" role="menu" data-show={this.showPopoverMenu}>
                    <div id="arrow" data-popper-arrow />
                    <slot/>
                </span>
            </Host>
        );
    }
}
