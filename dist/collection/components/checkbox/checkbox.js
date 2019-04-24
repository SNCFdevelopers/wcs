export class Checkbox {
    constructor() {
        this.checkboxId = `wcs-checkbox-${checkboxIds++}`;
        this.name = this.checkboxId;
        this.checked = false;
    }
    handleChange(event) {
        this.indeterminate = false;
        this.checked = event.path[0].checked;
        this.wcsChange.emit({
            checked: this.checked,
            value: this.value
        });
    }
    render() {
        return (h("label", { htmlFor: this.name, class: "container" },
            h("input", { onChange: (evt) => this.handleChange(evt), checked: this.checked, class: "wcs-checkbox", type: "checkbox", name: this.name, id: this.name }),
            h("span", { class: 'checkmark ' + (this.indeterminate ? 'indeterminate' : '') }),
            h("span", { class: "text" },
                h("slot", null))));
    }
    static get is() { return "wcs-checkbox"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "checked": {
            "type": Boolean,
            "attr": "checked",
            "mutable": true
        },
        "el": {
            "elementRef": true
        },
        "indeterminate": {
            "type": Boolean,
            "attr": "indeterminate",
            "reflectToAttr": true,
            "mutable": true
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "value": {
            "type": "Any",
            "attr": "value"
        }
    }; }
    static get events() { return [{
            "name": "wcsChange",
            "method": "wcsChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:wcs-checkbox:**/"; }
}
let checkboxIds = 0;
