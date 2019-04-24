export class Tabs {
    constructor() {
        this.align = 'start';
        this.selectedIndex = 0;
        this.headers = [];
        this.didLoad = false;
    }
    componentDidLoad() {
        this.tabsEl = this.el.shadowRoot.querySelector('.wcs-tabs');
        this.didLoad = true;
        this.refreshHeaders();
    }
    selectedIndexChanged() {
        this.wcsTabsChange.emit({
            tabName: this.headers[this.selectedIndex],
            tabIndex: this.selectedIndex
        });
    }
    refreshHeaders() {
        if (this.didLoad) {
            this.headers = this.tabsEl.querySelector('slot')
                .assignedElements()
                .map(x => x.getAttribute('header'));
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
        this.tabsEl.querySelector('slot').assignedElements().forEach((el, idx) => {
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
    static get properties() { return {
        "align": {
            "type": String,
            "attr": "align",
            "mutable": true
        },
        "el": {
            "elementRef": true
        },
        "headers": {
            "state": true
        },
        "selectedIndex": {
            "type": Number,
            "attr": "selected-index",
            "reflectToAttr": true,
            "mutable": true,
            "watchCallbacks": ["selectedIndexChanged"]
        }
    }; }
    static get events() { return [{
            "name": "wcsTabsChange",
            "method": "wcsTabsChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "wcsTabDidLoad",
            "method": "refreshHeaders"
        }]; }
    static get style() { return "/**style-placeholder:wcs-tabs:**/"; }
}
