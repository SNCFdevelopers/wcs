import { Component, ComponentInterface, Element, h, Host, Listen, Prop, State } from '@stencil/core';
import { Instance, createPopper } from '@popperjs/core';
import { clickInsideElement } from '../../utils/helpers';

@Component({
    tag: 'wcs-galactic-menu',
    styleUrl: 'galactic-menu.scss',
    shadow: true
})
export class Galactic implements ComponentInterface {
    @Element() private el: HTMLWcsGalacticMenuElement;
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

    @Listen('click', {target: 'window'})
    onWindowClickEvent(event: MouseEvent) {
        if (clickInsideElement(event, this.tooltip) || clickInsideElement(event, this.menu)) {
            return;
        } else {
            if (this.showPopoverMenu) {
                this.toogleMenu();
            }
        }
    }


    private toogleMenu() {
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
                <wcs-mat-icon id="toggle-menu-icon" icon="more_horiz" size="m" onClick={_ => {
                    this.toogleMenu();
                }}></wcs-mat-icon>
                <span id="menu" data-show={this.showPopoverMenu}>
                    <div id="arrow" data-popper-arrow />
                    <slot/>
                </span>
            </Host>
        );
    }
}
