import { h } from '../wcs.core.js';

class Checkbox {
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
    static get style() { return ".wcs-background-primary.sc-wcs-checkbox{background-color:#0088ce}.wcs-color-primary.sc-wcs-checkbox{color:#fff}.wcs-background-primary-hover.sc-wcs-checkbox{background-color:#0088ce}.wcs-background-primary-hover.sc-wcs-checkbox:hover{background-color:#00a1f4;border-color:#02a9ff}.wcs-background-secondary.sc-wcs-checkbox{background-color:#4d4f53}.wcs-color-secondary.sc-wcs-checkbox{color:#fff}.wcs-background-secondary-hover.sc-wcs-checkbox{background-color:#4d4f53}.wcs-background-secondary-hover.sc-wcs-checkbox:hover{background-color:#5f6267;border-color:#66686d}.wcs-background-success.sc-wcs-checkbox{background-color:#82be00}.wcs-color-success.sc-wcs-checkbox{color:#212529}.wcs-background-success-hover.sc-wcs-checkbox{background-color:#82be00}.wcs-background-success-hover.sc-wcs-checkbox:hover{background-color:#9ce400;border-color:#a5f100}.wcs-background-info.sc-wcs-checkbox{background-color:#009aa6}.wcs-color-info.sc-wcs-checkbox{color:#fff}.wcs-background-info-hover.sc-wcs-checkbox{background-color:#009aa6}.wcs-background-info-hover.sc-wcs-checkbox:hover{background-color:#00bdcc;border-color:#00c9d9}.wcs-background-danger.sc-wcs-checkbox{background-color:#cd0037}.wcs-color-danger.sc-wcs-checkbox{color:#fff}.wcs-background-danger-hover.sc-wcs-checkbox{background-color:#cd0037}.wcs-background-danger-hover.sc-wcs-checkbox:hover{background-color:#f30041;border-color:#ff0145}.wcs-background-warning.sc-wcs-checkbox{background-color:#ffb612}.wcs-color-warning.sc-wcs-checkbox{color:#212529}.wcs-background-warning-hover.sc-wcs-checkbox{background-color:#ffb612}.wcs-background-warning-hover.sc-wcs-checkbox:hover{background-color:#ffc238;border-color:#ffc645}.wcs-background-light.sc-wcs-checkbox{background-color:#f2f2f2}.wcs-color-light.sc-wcs-checkbox{color:#212529}.wcs-background-light-hover.sc-wcs-checkbox{background-color:#f2f2f2}.wcs-background-light-hover.sc-wcs-checkbox:hover{background-color:#fff;border-color:#fff}.wcs-background-dark.sc-wcs-checkbox{background-color:#343a40}.wcs-color-dark.sc-wcs-checkbox{color:#fff}.wcs-background-dark-hover.sc-wcs-checkbox{background-color:#343a40}.wcs-background-dark-hover.sc-wcs-checkbox:hover{background-color:#454d55;border-color:#4b545c}.container.sc-wcs-checkbox{position:relative;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;cursor:pointer;font-size:1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-weight:500}.container.sc-wcs-checkbox   input.sc-wcs-checkbox{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.container.sc-wcs-checkbox:hover   .checkmark.sc-wcs-checkbox{border-color:#0088ce}.container.sc-wcs-checkbox:hover   .text.sc-wcs-checkbox{color:#0088ce}.checkmark.sc-wcs-checkbox{width:1.125rem;height:1.125rem;border:2px solid #b9b9b9;border-radius:3px}.indeterminate.sc-wcs-checkbox{background:#0088ce;border-color:#0088ce}.container.sc-wcs-checkbox   input.sc-wcs-checkbox:checked ~ .checkmark.sc-wcs-checkbox{background-color:#0088ce;border-color:#0088ce}.checkmark.sc-wcs-checkbox:after{content:\"\";position:absolute;display:none}.container.sc-wcs-checkbox   input.sc-wcs-checkbox:checked ~ .checkmark.sc-wcs-checkbox:after{display:block}.container.sc-wcs-checkbox   .checkmark.sc-wcs-checkbox:after{left:7px;width:5px;top:3px;height:10px;border:solid #fff;border-width:0 3px 3px 0;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.container.sc-wcs-checkbox   input.sc-wcs-checkbox:checked ~ .text.sc-wcs-checkbox{color:#0088ce}.text.sc-wcs-checkbox{color:#747678;margin-left:6px;font-weight:500;line-height:1.375}"; }
}
let checkboxIds = 0;

export { Checkbox as WcsCheckbox };
