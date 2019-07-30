import { h } from "@stencil/core";
import * as MDCRipple from '@material/ripple';
import { SelectArrow } from './select-arrow';
/**
 * Select component, use in conjuction with wcs-select-option.
 *
 * @example ```hmtl
 *  <wcs-select>
 *      <wcs-select-option value="1">One</wcs-select-option>
 *  </wcs-select>```
 * @todo Complete keyboard navigation.
 */
export class Select {
    constructor() {
        /** Wether the select is expanded */
        this.expanded = false;
        /** Wether the component is fully loaded in the DOM. */
        this.hasLoaded = false;
        /** If `true`, the user cannot interact with the select. */
        this.disabled = false;
        // XXX: We use fat arrow to have a reference to the function and
        // being able to unregister it later on.
        this.handleExpandedKeyEvents = (keyEvent) => {
            if (keyEvent.code === 'Escape') {
                this.unExpand();
            }
            else if (keyEvent.code === 'Tab') {
                this.unExpand();
                // XXX: so we preserve default select behavior, that is:
                // When expanded, pressing tab only unexpand and does not blur
                keyEvent.preventDefault();
            }
            else if (keyEvent.code === 'ArrowDown') {
                keyEvent.preventDefault();
                // Select next value
            }
            else if (keyEvent.code === 'ArrowUp') {
                // Select previous value
                keyEvent.preventDefault();
            }
        };
        this.focus = () => {
            this.wrapperEl.focus();
            this.wcsFocus.emit();
            this.wrapperEl.addEventListener('keydown', this.handleFocusedKeyEvents);
        };
        this.handleFocusedKeyEvents = (keyEvent) => {
            if (keyEvent.code === 'Escape') {
                this.blur();
            }
            else if (keyEvent.code === 'Space') {
                this.expand();
                // Focus on selected or first value.
                // XXX: so the page doesn't scroll down.
                keyEvent.preventDefault();
                this.wrapperEl.removeEventListener('keydown', this.handleFocusedKeyEvents);
            }
        };
        this.blur = () => {
            this.wrapperEl.blur();
            this.wcsBlur.emit();
            this.wrapperEl.removeEventListener('keydown', this.handleFocusedKeyEvents);
        };
    }
    componentDidLoad() {
        this.optionsEl = this.el.shadowRoot.querySelector('.wcs-select-options');
        this.contentEl = this.el.shadowRoot.querySelector('.wcs-select-content');
        this.wrapperEl = this.el.shadowRoot.querySelector('.wcs-select-wrapper');
        if (this.optionsEl.querySelector('slot') === null) {
            this.el.querySelectorAll('wcs-select-option')
                .forEach(option => {
                this.el.removeChild(option);
                this.optionsEl.appendChild(option);
            });
        }
        this.expandOnClick();
        this.addRippleEffect();
        this.wrapperEl.addEventListener('focus', this.focus);
        this.wrapperEl.addEventListener('blur', this.blur);
        this.hasLoaded = true;
    }
    componentDidUnload() {
        // XXX: to be sure we have no dangling listeners.
        this.window.removeEventListener('keydown', this.handleExpandedKeyEvents);
        this.wrapperEl.removeEventListener('focus', this.focus);
        this.wrapperEl.addEventListener('blur', this.blur);
    }
    expandOnClick() {
        this.el.addEventListener('mousedown', () => {
            if (!this.disabled) {
                if (this.expanded) {
                    this.unExpand();
                }
                else {
                    this.expand();
                }
            }
        });
    }
    expand() {
        this.window.addEventListener('keydown', this.handleExpandedKeyEvents);
        // TODO: add focus on options and focus the first.
        this.expanded = true;
    }
    unExpand() {
        this.expanded = false;
        this.window.removeEventListener('keydown', this.handleExpandedKeyEvents);
    }
    addRippleEffect() {
        // XXX: Unwrapped dependency over MDCRipple...
        const ripple = new MDCRipple.MDCRipple(this.contentEl);
        ripple.unbounded = true;
    }
    onWindowClickEvent(event) {
        if (this.expanded
            && (event.target !== this.el
                && !(event.target instanceof Node && this.el.contains(event.target)))) {
            this.unExpand();
        }
    }
    selectedOptionChanged(event) {
        this.value = event.detail.value;
        this.displayText = event.detail.displayText;
        this.wcsChange.emit({ value: event.detail.value });
    }
    wrapperClasses() {
        return (this.expanded ? 'expanded ' : '')
            + (this.hasValue ? ' has-value ' : '')
            + (this.disabled ? ' disabled ' : '')
            + 'wcs-select-wrapper';
    }
    get hasValue() {
        return this.displayText !== undefined;
    }
    updateStyles() {
        // Make the options container width the same width as everything.
        const padding = 1.25; // XXX: This doesn't use the css variable.
        const borderSize = 1;
        this.optionsEl.setAttribute('style', `width: calc(${Math.ceil(this.el.getBoundingClientRect().width)}px - ${2 * padding}rem - ${2 * borderSize}px);`);
        this.setMarginTopOnNotFirstOption();
    }
    focusedAttributes() {
        return !this.disabled ? { tabIndex: 0 } : {};
    }
    // XXX: Investigate if there is no way to do it with pure CSS.
    // It poses problem due to slot not allowing deep styling.
    setMarginTopOnNotFirstOption() {
        const slot = this.optionsEl.querySelector('slot');
        let options;
        if (slot && slot.assignedElements) {
            options = this.optionsEl.querySelector('slot').assignedElements();
        }
        else {
            options = this.optionsEl.querySelectorAll('wcs-select-option');
        }
        options.forEach((opt, key) => {
            if (key !== 0) {
                opt.setAttribute('style', `padding-top: 0.875rem;`);
            }
        });
    }
    render() {
        if (this.hasLoaded) {
            this.updateStyles();
        }
        return (h("div", Object.assign({ class: this.wrapperClasses() }, this.focusedAttributes()),
            h("div", { class: "wcs-select-content" },
                h("label", { class: "wcs-select-text" }, this.hasValue
                    ? this.displayText
                    : this.placeholder),
                h(SelectArrow, { up: this.expanded })),
            h("div", { class: "wcs-select-options" },
                h("slot", { name: "wcs-select-option" }))));
    }
    static get is() { return "wcs-select"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["select.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["select.css"]
    }; }
    static get properties() { return {
        "disabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "If `true`, the user cannot interact with the select."
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "placeholder": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string | null",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "The text to display when the select is empty."
            },
            "attribute": "placeholder",
            "reflect": false
        },
        "name": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "The name of the control, which is submitted with the form data."
            },
            "attribute": "name",
            "reflect": false
        },
        "value": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any | null",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "The currently selected value."
            },
            "attribute": "value",
            "reflect": false
        }
    }; }
    static get contextProps() { return [{
            "name": "window",
            "context": "window"
        }]; }
    static get states() { return {
        "expanded": {},
        "hasLoaded": {},
        "displayText": {},
        "focused": {}
    }; }
    static get events() { return [{
            "method": "wcsChange",
            "name": "wcsChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the value has changed."
            },
            "complexType": {
                "original": "SelectChangeEventDetail",
                "resolved": "SelectChangeEventDetail",
                "references": {
                    "SelectChangeEventDetail": {
                        "location": "import",
                        "path": "./select-interface"
                    }
                }
            }
        }, {
            "method": "wcsFocus",
            "name": "wcsFocus",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the select has focus."
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
                "references": {}
            }
        }, {
            "method": "wcsBlur",
            "name": "wcsBlur",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the select loses focus."
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
    static get listeners() { return [{
            "name": "click",
            "method": "onWindowClickEvent",
            "target": "window",
            "capture": false,
            "passive": false
        }, {
            "name": "wcsSelectOptionClick",
            "method": "selectedOptionChanged",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
