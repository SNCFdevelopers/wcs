import MDCRipple from '@material/ripple';
import { SelectArrow } from './select-arrow';
export class Select {
    constructor() {
        this.expanded = false;
        this.hasLoaded = false;
        this.disabled = false;
        this.handleExpandedKeyEvents = (keyEvent) => {
            if (keyEvent.code === 'Escape') {
                this.unExpand();
            }
            else if (keyEvent.code === 'Tab') {
                this.unExpand();
                keyEvent.preventDefault();
            }
            else if (keyEvent.code === 'ArrowDown') {
                keyEvent.preventDefault();
            }
            else if (keyEvent.code === 'ArrowUp') {
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
        this.expandOnClick();
        this.addRippleEffect();
        this.wrapperEl.addEventListener('focus', this.focus);
        this.wrapperEl.addEventListener('blur', this.blur);
        this.hasLoaded = true;
    }
    componentDidUnload() {
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
        this.expanded = true;
    }
    unExpand() {
        this.expanded = false;
        this.window.removeEventListener('keydown', this.handleExpandedKeyEvents);
    }
    addRippleEffect() {
        const ripple = new MDCRipple.MDCRipple(this.contentEl);
        ripple.unbound = true;
    }
    onWindowClickEvent(event) {
        if (this.expanded
            && event.target !== this.el) {
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
        const padding = 1.25;
        const borderSize = 1;
        this.optionsEl.setAttribute('style', `width: calc(${Math.ceil(this.el.getBoundingClientRect().width)}px - ${2 * padding}rem - ${2 * borderSize}px);`);
        this.setMarginTopOnNotFirstOption();
    }
    focusedAttributes() {
        return !this.disabled ? { tabIndex: 0 } : {};
    }
    setMarginTopOnNotFirstOption() {
        this.optionsEl.querySelector('slot')
            .assignedElements()
            .forEach((opt, key) => {
            if (key !== 0) {
                opt.setAttribute('style', `margin-top: 0.875rem;`);
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
    static get properties() { return {
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "displayText": {
            "state": true
        },
        "el": {
            "elementRef": true
        },
        "expanded": {
            "state": true
        },
        "focused": {
            "state": true
        },
        "hasLoaded": {
            "state": true
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder",
            "mutable": true
        },
        "value": {
            "type": "Any",
            "attr": "value",
            "mutable": true
        },
        "window": {
            "context": "window"
        }
    }; }
    static get events() { return [{
            "name": "wcsChange",
            "method": "wcsChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "wcsFocus",
            "method": "wcsFocus",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "wcsBlur",
            "method": "wcsBlur",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "window:click",
            "method": "onWindowClickEvent"
        }, {
            "name": "wcsSelectOptionClick",
            "method": "selectedOptionChanged"
        }]; }
    static get style() { return "/**style-placeholder:wcs-select:**/"; }
}
