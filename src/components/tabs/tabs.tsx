import { Component, Prop, Element, State, ComponentInterface, Event, EventEmitter, Watch, h } from '@stencil/core';

import { WcsTabsAlignment, WcsTabsChangeEvent } from './tabs-interface';

/**
 * ### Features:
 * - [ ] Switch between different tabs
 * - [ ] Default selected value
 * - [ ] Disabled tab
 * - [ ] Customizing tab header
 * - [x] Header alignment, left / center / right
 * - [ ] Animation
 * - [ ] Disable animation
 * - [ ] Accessibility
 *  - LEFT_ARROW    Move focus to previous tab
 *  - RIGHT_ARROW    Move focus to next tab
 *  - HOME    Move focus to first tab
 *  - END    Move focus to last tab
 *  - SPACE or ENTER    Switch to focused tab
 * - [ ] Customize animation
 */
@Component({
    tag: 'wcs-tabs',
    styleUrl: 'tabs.scss',
    shadow: true,
}
)
export class Tabs implements ComponentInterface {

    @Prop({ mutable: true, reflect: true }) align: WcsTabsAlignment = 'start';

    /**
     * Current selected tab index
     */
    @Prop({ reflect: true, mutable: true }) selectedIndex = 0;

    /**
     * Emitted when the selected tab change
     */
    @Event() wcsTabsChange: EventEmitter<WcsTabsChangeEvent>;

    @Element() el!: HTMLWcsSelectElement;

    @State() headers: string[] = [];

    componentDidLoad() {
        this.putTabsInCorrectDivIfTheyAreNot();
        this.refreshHeaders();
    }

    // XXX: Firefox < 63
    private putTabsInCorrectDivIfTheyAreNot() {
        const tabDiv = this.el.shadowRoot.querySelector('.wcs-tabs');
        if (tabDiv.querySelector('slot') === null) {
            Array.from(this.el.querySelectorAll('wcs-tab'))
                .filter(node => node.parentNode !== tabDiv)
                .forEach(tab => {
                    this.el.removeChild(tab);
                    tabDiv.appendChild(tab);
                });
        }
    }

    @Watch('selectedIndex')
    selectedIndexChanged(_newValue: boolean, _oldValue: boolean) {
        this.wcsTabsChange.emit({
            tabName: this.headers[this.selectedIndex],
            tabIndex: this.selectedIndex
        });
    }

    handleKeyDown(ev: KeyboardEvent, tabIndex: number) {
        if (ev.key === ' ' || ev.key === 'Enter') {
            this.selectedIndex = tabIndex;
            ev.preventDefault();
        }
    }

    private refreshHeaders() {
        this.headers = [];
        this.tabs
            .forEach(x => {
                this.headers.push(x.getAttribute('header'));
            });
    }

    private get tabs() {
        const tabs = this.el.querySelectorAll('wcs-tab');
        return tabs.length !== 0
            ? tabs
            : this.el.querySelector('slot').assignedElements() as unknown as NodeListOf<HTMLWcsTabElement>;
    }

    private selectTab(index: number) {
        this.selectedIndex = index;
    }

    componentWillUpdate() {
        this.tabs.forEach((el: HTMLWcsTabElement, idx) => {
            if (idx !== this.selectedIndex) {
                el.setAttribute('style', 'display: none;');
            } else {
                el.setAttribute('style', 'display: block;');
            }
        });
        this.el.shadowRoot.querySelector('.wcs-tabs-headers > .wcs-ink-bar')
            .setAttribute('style', `left: calc((var(--wcs-tabs-width) + 2 * var(--wcs-tabs-padding-horizontal)) * ${this.selectedIndex})`);
    }

    render() {
        return [
            <div class="wcs-tabs-headers">
                {this.headers.map((header, idx) =>
                    <div class={'wcs-tab-header ' + (this.selectedIndex === idx ? 'active' : '')}
                        onClick={() => this.selectTab(idx)}
                        onKeyDown={evt => this.handleKeyDown(evt, idx)}
                        tabIndex={0}
                    >
                        <span>{header}</span>
                    </div>
                )}
                <div class="wcs-ink-bar"></div>
            </div>,
            <div class="wcs-tabs">
                <slot name="wcs-tab" />
            </div>
        ];
    }
}
