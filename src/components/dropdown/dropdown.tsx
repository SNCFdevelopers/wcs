import {
    Component,
    ComponentInterface, Element,
    h, Host, Listen, Prop, State
} from '@stencil/core';
import { SelectArrow } from '../select/select-arrow';

import { WcsButtonMode, WcsButtonShape } from '../button/button-interface';

/**
 * Dropdown component.
 *
 * @example ```hmtl
 *   <wcs-dropdown>
 *       <div slot="placeholder"></div>
 *       <div slot="items">
 *           <wcs-dropdown-header></wcs-dropdown-header>
 *           <wcs-divider></wcs-divider>
 *           <wcs-dropdown-item></wcs-dropdown-item>
 *      </div>
 *   </wcs-dropdown>
 * ```
 * @todo Complete keyboard navigation.
 */
@Component({
    tag: 'wcs-dropdown',
    styleUrl: 'dropdown.scss',
    shadow: true
})
export class Dropdown implements ComponentInterface {
    @Element() el: HTMLWcsDropdownElement;

    @Prop() mode: WcsButtonMode = 'stroked';

    @Prop() shape: WcsButtonShape = 'normal';

    @Prop() disabled: boolean = false;

    @State() expanded = false;

    componentDidLoad() {
        const buttonWrapper = this.el.shadowRoot.querySelector('wcs-button').shadowRoot.querySelector('button');
        const buttonTextColor = window.getComputedStyle(buttonWrapper).color;
        (this.el.shadowRoot.querySelector('.arrow') as HTMLElement).style.fill = buttonTextColor;

    }

    private onButtonClick(e: MouseEvent): void {
        e.stopPropagation();
        this.expanded = !this.expanded;
    }

    @Listen('click', { target: 'window' })
    onWindowClickEvent(event: MouseEvent) {
        // TODO: Extract to utils
        const clickedOnDropdownOrChildren = event.target instanceof Node && this.el.contains(event.target);
        if (this.expanded && !clickedOnDropdownOrChildren) {
            this.expanded = false;
        }
    }

    @Listen('wcsDropdownItemClick')
    dropdownItemClick(_: CustomEvent<any>) {
        this.expanded = false;
    }

    render() {
        return (
            <Host>
                <wcs-button mode={this.mode} shape={this.shape} onClick={($event) => this.onButtonClick($event)}>
                    <div class="wcs-button-content-wrapper">
                        <slot name="placeholder"/>
                        <SelectArrow up={this.expanded}/>
                    </div>
                </wcs-button>
                <div class={(this.expanded ? 'show ' : '') + 'popover'}>
                    <div class="container">
                        <slot name="item"/>
                    </div>
                </div>
            </Host>
        );
    }
}

