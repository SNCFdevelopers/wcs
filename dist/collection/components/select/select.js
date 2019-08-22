import { h, Host } from "@stencil/core";
import * as MDCRipple from '@material/ripple';
import { SelectArrow } from './select-arrow';
import { Machine, interpret } from 'xstate';
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
        /** If `true`, the user can select multiple values at once. */
        this.multiple = false;
    }
    /** Open the component. */
    async open() {
        this.stateService.send('OPEN');
    }
    /** Close the component. */
    async close() {
        this.stateService.send('CLOSE');
    }
    componentDidLoad() {
        this.optionsEl = this.el.shadowRoot.querySelector('.wcs-select-options');
        this.contentEl = this.el.shadowRoot.querySelector('.wcs-select-content');
        const stateMachine = Machine(this.initMachineConfig(), this.initMachineOptions());
        this.stateService = interpret(stateMachine);
        if (this.multiple) {
            this.values = [];
            this.options
                .forEach((opt) => opt.multiple = true);
        }
        this.addRippleEffect();
        // TODO: is this still usefull for anything ?
        this.hasLoaded = true;
        this.stateService.start();
    }
    get options() {
        const opts = this.optionsEl.querySelectorAll('wcs-select-option');
        return opts.length !== 0
            ? opts
            : this.optionsEl.querySelector('slot').assignedElements();
    }
    initMachineConfig() {
        return {
            key: 'select',
            initial: 'blurred',
            states: {
                blurred: {
                    entry: ['blur'],
                    on: {
                        CLOSE: { target: 'closed', cond: 'enabled' },
                        FOCUS: { target: 'closed', cond: 'enabled' },
                        OPEN: { target: 'opened', cond: 'enabled' },
                        CLICK: { target: 'opened', cond: 'enabled' },
                    }
                },
                closed: {
                    entry: ['close'],
                    on: {
                        CLICK: 'opened',
                        OPEN: 'opened',
                        BLUR: 'blurred',
                    },
                },
                opened: {
                    entry: ['open'],
                    on: {
                        CLICK: 'closed',
                        CLOSE: 'closed',
                        BLUR: 'blurred',
                        OPTION_CLICKED: { actions: ['selectOption'] }
                    },
                },
            }
        };
    }
    initMachineOptions() {
        return {
            actions: {
                open: () => {
                    this.expanded = true;
                    this.focused = true;
                },
                close: () => {
                    this.focused = true;
                    this.expanded = false;
                },
                blur: () => {
                    this.focused = false;
                    this.expanded = false;
                },
                focus: () => {
                    this.focused = true;
                },
                selectOption: (_, event) => {
                    if (event.type === 'OPTION_CLICKED') {
                        this.handleClickEvent(event.value);
                    }
                }
            },
            guards: {
                enabled: () => !this.disabled
            }
        };
    }
    handleClickEvent(event) {
        if (this.multiple) {
            this.handleClickOnMultiple(event);
        }
        else {
            this.handleNormalClick(event);
        }
        this.wcsChange.emit({
            value: this.value
        });
    }
    handleClickOnMultiple(event) {
        const index = this.values.findIndex(v => v.value === event.value);
        if (index === -1) {
            const { value, displayText } = event;
            this.values.push({ value, displayText });
            event.source.selected = true;
        }
        else {
            event.source.selected = false;
            this.values.splice(index, 1);
        }
        // TODO: Let user provide sorting function and use this if defined.
        // this.values = this.values.sort((a, b) => a.value - b.value);
        this.value = `[${this.values.map(v => v.value).join(', ')}]`;
        this.displayText = this.values.length !== 0
            ? this.values.map(v => v.displayText).join(', ')
            : undefined;
    }
    handleNormalClick(event) {
        // Reset other options to false if they were selected.
        this.options
            .forEach(option => {
            if (option.selected)
                option.selected = false;
        });
        event.source.selected = true;
        this.value = event.value;
        this.displayText = event.displayText;
        this.stateService.send('CLOSE');
    }
    componentDidUnload() {
        this.stateService.stop();
    }
    addRippleEffect() {
        // TODO: wrap MDCRipple dependency so we can eventually write our own or at least decouple a bit.
        const ripple = new MDCRipple.MDCRipple(this.contentEl);
        ripple.unbounded = true;
    }
    get hasValue() {
        // TODO: change this behavior.
        return this.displayText !== undefined;
    }
    onMouseDown(_event) {
        this.stateService.send('CLICK');
    }
    onWindowClickEvent(event) {
        const clickedOnSelectOrChildren = event.target instanceof Node && this.el.contains(event.target);
        // TODO: Move this logic in the state machine
        if (this.expanded && !clickedOnSelectOrChildren) {
            this.stateService.send('BLUR');
        }
    }
    selectedOptionChanged(event) {
        this.stateService.send({ type: 'OPTION_CLICKED', value: event.detail });
    }
    focus() { this.stateService.send('FOCUS'); }
    blur() { this.stateService.send('BLUR'); }
    render() {
        if (this.hasLoaded) {
            this.updateStyles();
        }
        return (h(Host, Object.assign({ class: this.expanded ? 'expanded ' : '' }, this.focusedAttributes()),
            h("div", { class: "wcs-select-content" },
                h("label", { class: "wcs-select-text" }, this.hasValue
                    ? this.displayText
                    : this.placeholder),
                h(SelectArrow, { up: this.expanded })),
            h("div", { class: "wcs-select-options" },
                h("slot", { name: "wcs-select-option" }))));
    }
    updateStyles() {
        // Make the options container width the same width as everything.
        const borderSize = 1;
        // TODO: Consider using a mutation observer to rerender the size each time ?
        // Be cautious as it may cause infinite loop with render ?
        this.optionsEl.setAttribute('style', `width: calc(${Math.ceil(this.el.getBoundingClientRect().width)}px - ${2 * borderSize}px);`);
    }
    focusedAttributes() {
        return !this.disabled ? { tabIndex: 0 } : {};
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
            "reflect": true
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
            "reflect": true
        },
        "disabled": {
            "type": "boolean",
            "mutable": true,
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
        "multiple": {
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
                "text": "If `true`, the user can select multiple values at once."
            },
            "attribute": "multiple",
            "reflect": true,
            "defaultValue": "false"
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
    static get methods() { return {
        "open": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Open the component.",
                "tags": []
            }
        },
        "close": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Close the component.",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get listeners() { return [{
            "name": "mousedown",
            "method": "onMouseDown",
            "target": undefined,
            "capture": false,
            "passive": true
        }, {
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
        }, {
            "name": "focus",
            "method": "focus",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "blur",
            "method": "blur",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
