import { r as registerInstance, c as createEvent, h, d as getElement } from './chunk-2b7d6005.js';

/**
 * Select option component, use in conjuction with wcs-select.
 */
class SelectOption {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** Wether this option can be selected. */
        this.disabled = false;
        /** Wether this option is selected. */
        this.selected = false;
        /**
         * This property should not be used,
         * it is only meant for internal use.
         * @internal
         * @ignore
         */
        this.slot = 'wcs-select-option';
        this.wcsSelectOptionClick = createEvent(this, "wcsSelectOptionClick", 7);
    }
    componentWillLoad() {
        if (this.value === undefined) {
            // If no value was given we use the text content instead.
            this.value = this.el.textContent || '';
        }
    }
    componentDidLoad() {
        this.addClickEventListener();
    }
    addClickEventListener() {
        this.el.addEventListener('mousedown', () => {
            if (!this.disabled) {
                // We select inner HTML as it's what's passed into the slot.
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
        return (
        // TODO: Try to remove this div
        h("div", { class: wrapperClasses + 'wcs-selection-option-container' }, h("slot", null)));
    }
    get el() { return getElement(this); }
    static get style() { return ".wcs-background-primary {\n  background-color: #0088ce;\n}\n\n.wcs-color-primary {\n  color: #fff;\n}\n\n.wcs-background-primary-hover {\n  background-color: #0088ce;\n}\n.wcs-background-primary-hover:hover {\n  background-color: #00a1f4;\n  border-color: #02a9ff;\n}\n\n.wcs-background-secondary {\n  background-color: #4d4f53;\n}\n\n.wcs-color-secondary {\n  color: #fff;\n}\n\n.wcs-background-secondary-hover {\n  background-color: #4d4f53;\n}\n.wcs-background-secondary-hover:hover {\n  background-color: #5f6267;\n  border-color: #66686d;\n}\n\n.wcs-background-success {\n  background-color: #82be00;\n}\n\n.wcs-color-success {\n  color: #212529;\n}\n\n.wcs-background-success-hover {\n  background-color: #82be00;\n}\n.wcs-background-success-hover:hover {\n  background-color: #9ce400;\n  border-color: #a5f100;\n}\n\n.wcs-background-info {\n  background-color: #009aa6;\n}\n\n.wcs-color-info {\n  color: #fff;\n}\n\n.wcs-background-info-hover {\n  background-color: #009aa6;\n}\n.wcs-background-info-hover:hover {\n  background-color: #00bdcc;\n  border-color: #00c9d9;\n}\n\n.wcs-background-danger {\n  background-color: #cd0037;\n}\n\n.wcs-color-danger {\n  color: #fff;\n}\n\n.wcs-background-danger-hover {\n  background-color: #cd0037;\n}\n.wcs-background-danger-hover:hover {\n  background-color: #f30041;\n  border-color: #ff0145;\n}\n\n.wcs-background-warning {\n  background-color: #ffb612;\n}\n\n.wcs-color-warning {\n  color: #212529;\n}\n\n.wcs-background-warning-hover {\n  background-color: #ffb612;\n}\n.wcs-background-warning-hover:hover {\n  background-color: #ffc238;\n  border-color: #ffc645;\n}\n\n.wcs-background-light {\n  background-color: #f2f2f2;\n}\n\n.wcs-color-light {\n  color: #212529;\n}\n\n.wcs-background-light-hover {\n  background-color: #f2f2f2;\n}\n.wcs-background-light-hover:hover {\n  background-color: white;\n  border-color: white;\n}\n\n.wcs-background-dark {\n  background-color: #343a40;\n}\n\n.wcs-color-dark {\n  color: #fff;\n}\n\n.wcs-background-dark-hover {\n  background-color: #343a40;\n}\n.wcs-background-dark-hover:hover {\n  background-color: #454d55;\n  border-color: #4b545c;\n}\n\nwcs-select-option {\n  display: block;\n}\n\n.wcs-selection-option-container {\n  display: block;\n  cursor: pointer;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  font-weight: 500;\n  color: black;\n}\n.wcs-selection-option-container:hover, .wcs-selection-option-container.selected {\n  color: #0088ce;\n}\n\n.disabled.wcs-selection-option-container {\n  cursor: default;\n  color: #b9b9b9;\n}\n\n.selected {\n  color: #0088ce;\n}"; }
}

export { SelectOption as wcs_select_option };
