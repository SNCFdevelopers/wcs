import { Component, Prop, Element, State, ComponentInterface, Listen, Event, EventEmitter, Watch, h } from '@stencil/core';

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
    @Element() el !: HTMLWcsSelectElement;

    @Prop({ mutable: true }) align: WcsTabsAlignment = 'start';

    /**
     * Current selected tab index
     */
    @Prop({ reflectToAttr: true, mutable: true }) selectedIndex = 0;

    @State() headers: string[] = [];

    /**
     * Emitted when the selected tab change
     */
    @Event() wcsTabsChange: EventEmitter<WcsTabsChangeEvent>;

    private didLoad = false;
    private tabsEl !: HTMLElement;

    componentDidLoad() {
        this.tabsEl = this.el.shadowRoot.querySelector('.wcs-tabs');
        this.didLoad = true;
        if (this.tabsEl.querySelector('slot') === null) {
            Array.from(this.el.querySelectorAll('wcs-tab'))
                .filter(node => node.parentNode != this.tabsEl)
                .forEach(tab => {
                    this.el.removeChild(tab);
                    this.tabsEl.appendChild(tab);
                });
        }
        this.refreshHeaders();
    }

    @Watch('selectedIndex')
    selectedIndexChanged(): void {
        this.wcsTabsChange.emit({
            tabName: this.headers[this.selectedIndex],
            tabIndex: this.selectedIndex
        });
    }

    /**
     * XXX: Temporary fix waiting for two issues to be resolved:
     * - https://github.com/ionic-team/stencil/issues/1261
     * - https://github.com/ionic-team/stencil/issues/1130
     *
     * When resolved this should just be done once in the componentDidLoad method.
     */
    @Listen('wcsTabDidLoad') refreshHeaders() {
        if (this.didLoad) {
            const slot = this.tabsEl.querySelector('slot');
            if (slot && slot.assignedElements) {
                this.headers = slot.assignedElements()
                    .map(x => x.getAttribute('header'));
            } else {
                this.headers = [];
                this.tabsEl.querySelectorAll('wcs-tab')
                    .forEach(x => {
                        this.headers.push(x.getAttribute('header'));
                    });
            }
        }
    }

    selectTab(index: number) {
        this.selectedIndex = index;
    }

    getHeaderAlignClass() {
        switch (this.align) {
            case 'start':
                return 'start';
            case 'end':
                return 'end';
            case 'center':
                return 'center';
        }
    }

    componentWillUpdate() {
        const slot = this.tabsEl.querySelector('slot');
        const tabs = slot && slot.assignedElements
            ? slot.assignedElements()
            : this.tabsEl.querySelectorAll('wcs-tab');

        tabs.forEach((el: HTMLWcsTabElement, idx) => {
            if (idx !== this.selectedIndex) {
                el.setAttribute('style', 'display: none;');
            } else {
                el.setAttribute('style', 'display: initial;');
            }
        });
    }

    render() {
        return [
            <ul class={'wcs-tabs-headers ' + this.getHeaderAlignClass()}>
                {this.headers.map((header, idx) =>
                    <li class={'wcs-tab-header ' + (this.selectedIndex === idx ? 'active' : '')} onClick={() => this.selectTab(idx)}>
                        <span>{header}</span>
                    </li>
                )}
            </ul>,
            <div class="wcs-tabs">
                <slot name="wcs-tab" />
            </div>
        ];
    }
}
