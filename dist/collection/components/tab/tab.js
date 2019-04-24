export class Tab {
    constructor() {
        this.slot = 'wcs-tab';
    }
    componentDidLoad() {
        this.wcsTabDidLoad.emit();
    }
    render() {
        return (h("slot", null));
    }
    static get is() { return "wcs-tab"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "slot": {
            "type": String,
            "attr": "slot",
            "reflectToAttr": true
        }
    }; }
    static get events() { return [{
            "name": "wcsTabDidLoad",
            "method": "wcsTabDidLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
}
