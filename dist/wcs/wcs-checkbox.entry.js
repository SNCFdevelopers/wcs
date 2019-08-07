import { r as registerInstance, c as createEvent, h, d as getElement } from './chunk-2b7d6005.js';

class Checkbox {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.checkboxId = `wcs-checkbox-${checkboxIds++}`;
        this.name = this.checkboxId;
        /**
         * If `true` the checkbox is in indeterminate state.
         */
        this.indeterminate = false;
        /**
         * If `true`, the checkbox is selected.
         */
        this.checked = false;
        this.wcsChange = createEvent(this, "wcsChange", 7);
    }
    handleChange(_event) {
        this.indeterminate = false;
        this.checked = !this.checked;
        this.wcsChange.emit({
            checked: this.checked
        });
    }
    render() {
        return (h("label", { htmlFor: this.name, class: "wcs-container" }, h("input", { onChange: (evt) => this.handleChange(evt), checked: this.checked, class: "wcs-checkbox", type: "checkbox", name: this.name, id: this.name }), h("span", { class: 'wcs-checkmark ' + (this.indeterminate ? 'indeterminate' : '') }), h("span", { class: "text" }, h("slot", null))));
    }
    get el() { return getElement(this); }
    static get style() { return ".wcs-background-primary {\n  background-color: #0088ce;\n}\n\n.wcs-color-primary {\n  color: #fff;\n}\n\n.wcs-background-primary-hover {\n  background-color: #0088ce;\n}\n.wcs-background-primary-hover:hover {\n  background-color: #00a1f4;\n  border-color: #02a9ff;\n}\n\n.wcs-background-secondary {\n  background-color: #4d4f53;\n}\n\n.wcs-color-secondary {\n  color: #fff;\n}\n\n.wcs-background-secondary-hover {\n  background-color: #4d4f53;\n}\n.wcs-background-secondary-hover:hover {\n  background-color: #5f6267;\n  border-color: #66686d;\n}\n\n.wcs-background-success {\n  background-color: #82be00;\n}\n\n.wcs-color-success {\n  color: #212529;\n}\n\n.wcs-background-success-hover {\n  background-color: #82be00;\n}\n.wcs-background-success-hover:hover {\n  background-color: #9ce400;\n  border-color: #a5f100;\n}\n\n.wcs-background-info {\n  background-color: #009aa6;\n}\n\n.wcs-color-info {\n  color: #fff;\n}\n\n.wcs-background-info-hover {\n  background-color: #009aa6;\n}\n.wcs-background-info-hover:hover {\n  background-color: #00bdcc;\n  border-color: #00c9d9;\n}\n\n.wcs-background-danger {\n  background-color: #cd0037;\n}\n\n.wcs-color-danger {\n  color: #fff;\n}\n\n.wcs-background-danger-hover {\n  background-color: #cd0037;\n}\n.wcs-background-danger-hover:hover {\n  background-color: #f30041;\n  border-color: #ff0145;\n}\n\n.wcs-background-warning {\n  background-color: #ffb612;\n}\n\n.wcs-color-warning {\n  color: #212529;\n}\n\n.wcs-background-warning-hover {\n  background-color: #ffb612;\n}\n.wcs-background-warning-hover:hover {\n  background-color: #ffc238;\n  border-color: #ffc645;\n}\n\n.wcs-background-light {\n  background-color: #f2f2f2;\n}\n\n.wcs-color-light {\n  color: #212529;\n}\n\n.wcs-background-light-hover {\n  background-color: #f2f2f2;\n}\n.wcs-background-light-hover:hover {\n  background-color: white;\n  border-color: white;\n}\n\n.wcs-background-dark {\n  background-color: #343a40;\n}\n\n.wcs-color-dark {\n  color: #fff;\n}\n\n.wcs-background-dark-hover {\n  background-color: #343a40;\n}\n.wcs-background-dark-hover:hover {\n  background-color: #454d55;\n  border-color: #4b545c;\n}\n\n.wcs-checkmark {\n  -webkit-transition: background-color 225ms cubic-bezier(0.17, 0.84, 0.44, 1), color 225ms cubic-bezier(0.17, 0.84, 0.44, 1);\n  transition: background-color 225ms cubic-bezier(0.17, 0.84, 0.44, 1), color 225ms cubic-bezier(0.17, 0.84, 0.44, 1);\n}\n\n/* Customize the label (the wcs-container) */\n.wcs-container {\n  position: relative;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -ms-flex-align: center;\n  align-items: center;\n  cursor: pointer;\n  font-size: 1rem;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  font-weight: 500;\n}\n\n/* Hide the browser\'s default checkbox */\n.wcs-container input {\n  position: absolute;\n  opacity: 0;\n  cursor: pointer;\n  height: 0;\n  width: 0;\n}\n\n.wcs-container:hover .wcs-checkmark {\n  border-color: #0088ce;\n}\n.wcs-container:hover .text {\n  color: #0088ce;\n}\n\n/* Create a custom checkbox */\n.wcs-checkmark {\n  width: 1.125rem;\n  height: 1.125rem;\n  border: 2px solid #b9b9b9;\n  border-radius: 3px;\n}\n\n.indeterminate {\n  background: #0088ce;\n  border-color: #0088ce;\n}\n\n/* .indeterminate:after {\n    background: $white;\n    display: block;\n    border: solid 12px red;\n    content: \"\";\n} */\n/* When the checkbox is checked, add a blue background */\n.wcs-container input:checked ~ .wcs-checkmark {\n  background-color: #0088ce;\n  border-color: #0088ce;\n}\n\n/* Create the wcs-checkmark/indicator (hidden when not checked) */\n.wcs-checkmark:after {\n  content: \"\";\n  position: absolute;\n  display: none;\n}\n\n/* Show the wcs-checkmark when checked */\n.wcs-container input:checked ~ .wcs-checkmark:after {\n  display: block;\n}\n\n/* Style the wcs-checkmark/indicator */\n.wcs-container .wcs-checkmark:after {\n  left: 7px;\n  width: 5px;\n  top: 3px;\n  height: 10px;\n  border: solid white;\n  border-width: 0 3px 3px 0;\n  -webkit-transform: rotate(45deg);\n  -ms-transform: rotate(45deg);\n  transform: rotate(45deg);\n}\n\n.wcs-container input:checked ~ .text {\n  color: #0088ce;\n}\n\n.text {\n  color: #747678;\n  margin-left: 6px;\n  font-weight: 500;\n  line-height: 1.375;\n}"; }
}
let checkboxIds = 0;

export { Checkbox as wcs_checkbox };
