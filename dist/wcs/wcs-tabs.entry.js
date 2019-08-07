import { r as registerInstance, c as createEvent, h, d as getElement } from './chunk-2b7d6005.js';

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
class Tabs {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.align = 'start';
        /**
         * Current selected tab index
         */
        this.selectedIndex = 0;
        this.headers = [];
        this.didLoad = false;
        this.wcsTabsChange = createEvent(this, "wcsTabsChange", 7);
    }
    componentDidLoad() {
        this.tabsEl = this.el.shadowRoot.querySelector('.wcs-tabs');
        this.didLoad = true;
        if (this.tabsEl.querySelector('slot') === null) {
            Array.from(this.el.querySelectorAll('wcs-tab'))
                .filter(node => node.parentNode !== this.tabsEl)
                .forEach(tab => {
                this.el.removeChild(tab);
                this.tabsEl.appendChild(tab);
            });
        }
        this.refreshHeaders();
    }
    selectedIndexChanged() {
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
    refreshHeaders() {
        if (this.didLoad) {
            const slot = this.tabsEl.querySelector('slot');
            if (slot && slot.assignedElements) {
                this.headers = slot.assignedElements()
                    .map(x => x.getAttribute('header'));
            }
            else {
                this.headers = [];
                this.tabsEl.querySelectorAll('wcs-tab')
                    .forEach(x => {
                    this.headers.push(x.getAttribute('header'));
                });
            }
        }
    }
    selectTab(index) {
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
        tabs.forEach((el, idx) => {
            if (idx !== this.selectedIndex) {
                el.setAttribute('style', 'display: none;');
            }
            else {
                el.setAttribute('style', 'display: initial;');
            }
        });
    }
    render() {
        return [
            h("ul", { class: 'wcs-tabs-headers ' + this.getHeaderAlignClass() }, this.headers.map((header, idx) => h("li", { class: 'wcs-tab-header ' + (this.selectedIndex === idx ? 'active' : ''), onClick: () => this.selectTab(idx) }, h("span", null, header)))),
            h("div", { class: "wcs-tabs" }, h("slot", { name: "wcs-tab" }))
        ];
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "selectedIndex": ["selectedIndexChanged"]
    }; }
    static get style() { return ".wcs-background-primary {\n  background-color: #0088ce;\n}\n\n.wcs-color-primary {\n  color: #fff;\n}\n\n.wcs-background-primary-hover {\n  background-color: #0088ce;\n}\n.wcs-background-primary-hover:hover {\n  background-color: #00a1f4;\n  border-color: #02a9ff;\n}\n\n.wcs-background-secondary {\n  background-color: #4d4f53;\n}\n\n.wcs-color-secondary {\n  color: #fff;\n}\n\n.wcs-background-secondary-hover {\n  background-color: #4d4f53;\n}\n.wcs-background-secondary-hover:hover {\n  background-color: #5f6267;\n  border-color: #66686d;\n}\n\n.wcs-background-success {\n  background-color: #82be00;\n}\n\n.wcs-color-success {\n  color: #212529;\n}\n\n.wcs-background-success-hover {\n  background-color: #82be00;\n}\n.wcs-background-success-hover:hover {\n  background-color: #9ce400;\n  border-color: #a5f100;\n}\n\n.wcs-background-info {\n  background-color: #009aa6;\n}\n\n.wcs-color-info {\n  color: #fff;\n}\n\n.wcs-background-info-hover {\n  background-color: #009aa6;\n}\n.wcs-background-info-hover:hover {\n  background-color: #00bdcc;\n  border-color: #00c9d9;\n}\n\n.wcs-background-danger {\n  background-color: #cd0037;\n}\n\n.wcs-color-danger {\n  color: #fff;\n}\n\n.wcs-background-danger-hover {\n  background-color: #cd0037;\n}\n.wcs-background-danger-hover:hover {\n  background-color: #f30041;\n  border-color: #ff0145;\n}\n\n.wcs-background-warning {\n  background-color: #ffb612;\n}\n\n.wcs-color-warning {\n  color: #212529;\n}\n\n.wcs-background-warning-hover {\n  background-color: #ffb612;\n}\n.wcs-background-warning-hover:hover {\n  background-color: #ffc238;\n  border-color: #ffc645;\n}\n\n.wcs-background-light {\n  background-color: #f2f2f2;\n}\n\n.wcs-color-light {\n  color: #212529;\n}\n\n.wcs-background-light-hover {\n  background-color: #f2f2f2;\n}\n.wcs-background-light-hover:hover {\n  background-color: white;\n  border-color: white;\n}\n\n.wcs-background-dark {\n  background-color: #343a40;\n}\n\n.wcs-color-dark {\n  color: #fff;\n}\n\n.wcs-background-dark-hover {\n  background-color: #343a40;\n}\n.wcs-background-dark-hover:hover {\n  background-color: #454d55;\n  border-color: #4b545c;\n}\n\n:host {\n  margin-top: 0.5rem !important;\n}\n\n.wcs-tabs-headers {\n  display: -ms-flexbox;\n  display: flex;\n  list-style: none;\n  padding-left: 0;\n  border-bottom: var(--wcs-tabs-headers-border-bottom);\n  margin: 0px;\n  padding-bottom: 14px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.wcs-tabs-headers.center {\n  -ms-flex-pack: center;\n  justify-content: center;\n}\n.wcs-tabs-headers.end {\n  -ms-flex-pack: end;\n  justify-content: end;\n}\n.wcs-tabs-headers.start {\n  -ms-flex-pack: start;\n  justify-content: start;\n}\n\n.wcs-tab-header {\n  padding-right: 1.5rem;\n  cursor: pointer;\n}\n.wcs-tab-header span {\n  color: #4d4f53;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.375;\n  padding-top: 0.25rem;\n  padding-bottom: 1rem;\n}\n\n.wcs-tab-header:hover > span {\n  color: #0088ce;\n}\n\n.active span {\n  font-weight: 500;\n  color: #0088ce;\n  position: relative;\n}\n.active span:after {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 0.3125rem;\n  content: \"\";\n  background-color: #0088ce;\n  border-radius: 3px;\n}"; }
}

export { Tabs as wcs_tabs };
