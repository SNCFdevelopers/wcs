import { Component, Prop, Element, State, ComponentInterface, Event, EventEmitter, Watch, h, Host, Listen } from '@stencil/core';

import { WcsTabsAlignment, WcsTabChangeEvent } from './tabs-interface';

/**
 * Tabs component to switch between tab content.
 * Use in conjuction with `wcs-tab`.
 *
 * @example
 * ```html
 * <wcs-tabs>
 *    <wcs-tab header="One">The content !</wcs-tab>
 *    <wcs-tab header="Two">More content !</wcs-tab>
 * </wcs-tabs>
 * ```
 */
@Component({
    tag: 'wcs-tabs',
    styleUrl: 'tabs.scss',
    shadow: true,
})
export class Tabs implements ComponentInterface {
    /**
     * Tab headers alignment.
     */
    @Prop({ mutable: true, reflect: true }) align: WcsTabsAlignment = 'start';

    /**
     * Current selected tab index.
     * Starts at 0.
     */
    @Prop({ reflect: true, mutable: true }) selectedIndex = 0;

    /**
     * Emitted when the selected tab change.
     */
    @Event() tabChange!: EventEmitter<WcsTabChangeEvent>;

    @Element() el!: HTMLWcsTabsElement;

    @State() headers: string[] = [];

    @Watch('selectedIndex')
    selectedIndexChanged(_newValue: boolean, _oldValue: boolean) {
        this.tabChange.emit({
            tabName: this.headers[this.selectedIndex],
            tabIndex: this.selectedIndex
        });
    }

    @Listen('tabLoaded')
    onTabLoaded() {
        this.refreshHeaders();
    }

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
                    if (tab.parentElement.isEqualNode(this.el)) {
                        this.el.removeChild(tab);
                        tabDiv.appendChild(tab);
                    }
                });
        }
    }

    handleKeyDown(ev: KeyboardEvent, tabIndex: number) {
        const target = ev.target as HTMLDivElement;
        switch (ev.key) {
            case ' ':
            case 'Enter': {
                this.selectedIndex = tabIndex;
                ev.preventDefault();
                break;
            }
            case 'ArrowLeft': {
                if (target.previousElementSibling
                    && target.previousElementSibling.classList.contains('wcs-tab-header')
                ) {
                    (target.previousElementSibling as HTMLDivElement).focus();
                    ev.preventDefault();
                }
                break;
            }
            case 'ArrowRight': {
                if (target.nextElementSibling
                    && target.nextElementSibling.classList.contains('wcs-tab-header')
                ) {
                    (target.nextElementSibling as HTMLDivElement).focus();
                    ev.preventDefault();
                }
                break;
            }
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
        const tabsEl = this.el.shadowRoot.querySelector('.wcs-tabs');
        // FIXME: problem with this selector being too greedy in ff < 63
        const tabs = this.el.shadowRoot.querySelectorAll('.wcs-tabs > wcs-tab');

        return tabs.length !== 0
            ? tabs
            : tabsEl.querySelector('slot')
                ? tabsEl.querySelector('slot').assignedElements() as unknown as NodeListOf<HTMLWcsTabElement>
                : [];
    }

    private selectTab(index: number) {
        this.selectedIndex = index;
    }

    componentWillUpdate() {
        this.updateTabVisibility();
        this.moveInkBar();
    }

    private updateTabVisibility() {
        this.tabs.forEach((el: HTMLWcsTabElement, idx: number) => {
            if (idx !== this.selectedIndex) {
                el.setAttribute('style', 'display: none;');
            } else {
                el.setAttribute('style', 'display: block;');
            }
        });
    }

    private moveInkBar() {
        this.el.shadowRoot.querySelector('.wcs-tabs-headers > .wcs-ink-bar')
            .setAttribute('style', `left: calc((var(--wcs-tabs-width) + 2 * var(--wcs-tabs-padding-horizontal)) * ${this.selectedIndex})`);
    }

    render() {
        return (
            <Host>
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
                </div>
                <div class="wcs-tabs">
                    <slot name="wcs-tab" />
                </div>
            </Host>
        );
    }
}
