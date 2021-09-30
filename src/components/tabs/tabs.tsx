import {
    Component,
    Prop,
    Element,
    State,
    ComponentInterface,
    Event,
    EventEmitter,
    Watch,
    h,
    Host,
    Listen
} from '@stencil/core';

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
    @Prop({mutable: true, reflect: true}) align: WcsTabsAlignment = 'start';

    /**
     * Current selected tab index.
     * Starts at 0.
     */
    @Prop() selectedIndex = 0;

    @Prop() selectedKey: any;

    /**
     * Whether to skip rendering the tabpanel with the content of the selected tab. Use this prop if you plan to
     * separately render the tab content.
     */
    @Prop() headersOnly: boolean = false;
    /** Determines if tabs header should have a border at the bottom */
    @Prop() gutter: boolean;

    /**
     *
     * Emitted when the selected tab change.
     */
    @Event() tabChange!: EventEmitter<WcsTabChangeEvent>;

    @Element() el!: HTMLWcsTabsElement;

    @State() headers: string[] = [];

    @State() currentActiveTabIndex = 0;

    @Watch('selectedIndex')
    selectedIndexChanged(newValue: number) {
        this.currentActiveTabIndex = newValue;
    }

    @Watch('selectedKey')
    selectedTabkeyChanged(newValue: any) {
        this.updateCurrentActiveIndexByTabKey(newValue);
    }

    private emitActiveTabChange() {
        this.tabChange.emit({
            tabName: this.headers[this.currentActiveTabIndex],
            tabIndex: this.currentActiveTabIndex,
            selectedKey: this.tabs[this.currentActiveTabIndex].itemKey
        });
    }

    private updateCurrentActiveIndexByTabKey(newValue: any) {
        for (let i = 0; i < this.tabs.length; i++) {
            const tab = this.tabs[i];
            if (tab.itemKey === newValue) {
                this.currentActiveTabIndex = i;
            }
        }
    }

    @Listen('tabLoaded')
    onTabLoaded() {
        this.refreshHeaders();
    }

    componentDidLoad() {
        this.putTabsInCorrectDivIfTheyAreNot();
        this.refreshHeaders();
        if (this.selectedIndex) {
            this.currentActiveTabIndex = this.selectedIndex;
        }
        if (this.selectedKey) {
            this.updateCurrentActiveIndexByTabKey(this.selectedKey);
        }
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
                this.currentActiveTabIndex = tabIndex;
                this.emitActiveTabChange();
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

    private selectTabAndEmitChangeEvent(index: number) {
        this.currentActiveTabIndex = index;
        this.emitActiveTabChange()
    }

    componentWillUpdate() {
        if (!this.headersOnly) {
            this.updateTabVisibility();
        } else {
            this.hideAllTabsContent();
        }
    }

    private updateTabVisibility() {
        this.tabs.forEach((el: HTMLWcsTabElement, idx: number) => {
            if (idx !== this.currentActiveTabIndex) {
                el.setAttribute('style', 'display: none;');
            } else {
                el.setAttribute('style', 'display: block;');
            }
        });
    }

    private hideAllTabsContent() {
        this.tabs.forEach((el: HTMLWcsTabElement) => el.setAttribute('style', 'display: none;'));
    }

    render() {
        return (
            <Host>
                <div class="wcs-tabs-headers">
                    {this.headers.map((header, idx) =>
                        <div class={'wcs-tab-header ' + (this.currentActiveTabIndex === idx ? 'active' : '')}
                             onClick={() => this.selectTabAndEmitChangeEvent(idx)}
                             onKeyDown={evt => this.handleKeyDown(evt, idx)}
                             tabIndex={idx}
                        >
                            <span>{header}</span>
                        </div>
                    )}
                </div>
                <div class="wcs-tabs">
                    <slot name="wcs-tab"/>
                </div>
            </Host>
        );
    }
}
