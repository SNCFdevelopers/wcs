import { Component, ComponentInterface, Element, h, Host, Listen, Method, Prop, State } from '@stencil/core';
import { Instance, createPopper } from '@popperjs/core';
import {
    clickInsideElement,
    inheritAriaAttributes,
    inheritAttributes,
    isEnterKey,
    isEscapeKey,
    isSpaceKey, setOrRemoveAttribute
} from '../../utils/helpers';
import { AriaAttributeName } from "../../utils/mutable-aria-attribute";


const GALACTIC_MENU_INHERITED_ATTRS = ['tabindex', 'title'];

@Component({
    tag: 'wcs-galactic-menu',
    styleUrl: 'galactic-menu.scss',
    shadow: true
})
export class Galactic implements ComponentInterface {
    @Element() private el: HTMLWcsGalacticMenuElement;
    private menuButton!: HTMLWcsMatIconElement;
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
    
    private handleMenuButtonKeyDown(_event: KeyboardEvent) {
        if (isSpaceKey(_event) || isEnterKey(_event)) {
            _event.preventDefault();
            this.toggleMenu();
        }
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
                <wcs-mat-icon role="button"
                              tabindex="0"
                              id="toggle-menu-icon"
                              icon="more_horiz"
                              size="m"
                              aria-haspopup="true"
                              aria-controls="menu"
                              aria-expanded={this.showPopoverMenu ? "true" : "false"}
                              ref={el => {this.menuButton = el}}
                              onClick={_ => this.toggleMenu()}
                              onKeyDown={e => this.handleMenuButtonKeyDown(e)}
                              {...this.inheritedAttributes}></wcs-mat-icon>
                <span id="menu" role="menu" data-show={this.showPopoverMenu}>
                    <div id="arrow" data-popper-arrow />
                    <slot/>
                </span>
            </Host>
        );
    }
}
