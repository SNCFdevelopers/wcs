export class SelectOption {
    constructor() {
        this.disabled = false;
        this.selected = false;
        this.slot = 'wcs-select-option';
    }
    componentWillLoad() {
        if (this.value === undefined) {
            this.value = this.el.textContent || '';
        }
    }
    componentDidLoad() {
        this.addClickEventListener();
    }
    addClickEventListener() {
        this.el.addEventListener('mousedown', () => {
            if (!this.disabled) {
                const displayText = this.el.getElementsByClassName('wcs-selection-option-container')[0].innerHTML;
                this.wcsSelectOptionClick.emit({
                    value: this.value,
                    displayText
                });
            }
        });
    }
    render() {
        const wrapperClasses = (this.disabled ? 'disabled ' : '') +
            (this.selected ? 'selected ' : '');
        return (h("div", { class: wrapperClasses + 'wcs-selection-option-container' },
            h("slot", null)));
    }
    static get is() { return "wcs-select-option"; }
    static get properties() { return {
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "el": {
            "elementRef": true
        },
        "selected": {
            "type": Boolean,
            "attr": "selected",
            "mutable": true
        },
        "slot": {
            "type": String,
            "attr": "slot",
            "reflectToAttr": true
        },
        "value": {
            "type": "Any",
            "attr": "value",
            "reflectToAttr": true,
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "wcsSelectOptionClick",
            "method": "wcsSelectOptionClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:wcs-select-option:**/"; }
}
