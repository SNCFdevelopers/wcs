import { h } from "@stencil/core";
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
export class Tabs {
    constructor() {
        this.align = 'start';
        /**
         * Current selected tab index
         */
        this.selectedIndex = 0;
        this.headers = [];
        this.didLoad = false;
    }
    componentDidLoad() {
        this.tabsEl = this.el.shadowRoot.querySelector('.wcs-tabs');
        this.didLoad = true;
        if (this.tabsEl.querySelector('slot') === null) {
            this.el.querySelectorAll('wcs-tab')
                .forEach(tab => {
                this.el.removeChild(tab);
                this.tabsEl.appendChild(tab);
            });
        }
        this.refreshHeaders();
        if (this.tabsEl.querySelector('slot') === null) {
            this.el.querySelectorAll('wcs-tab')
                .forEach(tab => {
                this.el.removeChild(tab);
                this.tabsEl.appendChild(tab);
            });
        }
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
            h("ul", { class: 'wcs-tabs-headers ' + this.getHeaderAlignClass() }, this.headers.map((header, idx) => h("li", { class: 'wcs-tab-header ' + (this.selectedIndex === idx ? 'active' : ''), onClick: () => this.selectTab(idx) },
                h("span", null, header)))),
            h("div", { class: "wcs-tabs" },
                h("slot", { name: "wcs-tab" }))
        ];
    }
    static get is() { return "wcs-tabs"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["tabs.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["tabs.css"]
    }; }
    static get properties() { return {
        "align": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "WcsTabsAlignment",
                "resolved": "\"center\" | \"end\" | \"start\"",
                "references": {
                    "WcsTabsAlignment": {
                        "location": "import",
                        "path": "./tabs-interface"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "align",
            "reflect": false,
            "defaultValue": "'start'"
        },
        "selectedIndex": {
            "type": "number",
            "mutable": true,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Current selected tab index"
            },
            "attribute": "selected-index",
            "reflect": true,
            "defaultValue": "0"
        }
    }; }
    static get states() { return {
        "headers": {}
    }; }
    static get events() { return [{
            "method": "wcsTabsChange",
            "name": "wcsTabsChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the selected tab change"
            },
            "complexType": {
                "original": "WcsTabsChangeEvent",
                "resolved": "WcsTabsChangeEvent",
                "references": {
                    "WcsTabsChangeEvent": {
                        "location": "import",
                        "path": "./tabs-interface"
                    }
                }
            }
        }]; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "selectedIndex",
            "methodName": "selectedIndexChanged"
        }]; }
    static get listeners() { return [{
            "name": "wcsTabDidLoad",
            "method": "refreshHeaders",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
