import { h } from "@stencil/core";
import * as MDCRipple from '@material/ripple';
import { hasShadowDom } from '../../utils/helpers';
/**
 * Button component, can also be a link when specifying href.
 */
export class Button {
    constructor() {
        /**
         * Specify the button type.
         */
        this.type = 'button';
        /**
         * Specify the button color.
         */
        this.color = 'primary';
        /**
         * Specify wether the button is disabled or not.
         */
        this.disabled = false;
        /**
         * Specify wether the button should have a ripple effect or not.
         */
        this.ripple = true;
        /**
         * This attribute specifies the size of the button.
         * Setting this attribute will change the height and padding of a button.
         */
        this.mode = 'normal';
        /** Specify wether the button should have background color or not. */
        this.clear = false;
    }
    onClick(ev) {
        if (this.type !== 'button' && hasShadowDom(this.el)) {
            // this button wants to specifically submit a form
            // climb up the dom to see if we're in a <form>
            // and if so, then use JS to submit it
            const form = this.el.closest('form');
            if (form) {
                ev.preventDefault();
                const fakeButton = this.win.document.createElement('button');
                fakeButton.type = this.type;
                fakeButton.style.display = 'none';
                form.appendChild(fakeButton);
                fakeButton.click();
                fakeButton.remove();
            }
        }
    }
    render() {
        const TagType = this.href !== undefined ? 'a' : 'button';
        const attrs = this.href !== undefined
            ? { href: this.href, role: 'button' }
            : { type: this.type };
        return (h(TagType, Object.assign({}, attrs, this.generateClasses(), this.disabled === true ? { disabled: true } : null),
            h("slot", null)));
    }
    generateClasses() {
        return {
            class: Object.assign({ 'wcs-inner-button': true, 'wcs-inner-button-disabled': this.disabled, 'wcs-inner-button-small': this.mode === 'small', 'wcs-inner-button-block': this.mode === 'block', 'wcs-inner-button-icon-only': this.mode === 'icon-only', 'wcs-inner-button-rounded': this.mode === 'round' }, this.createColorClasses(this.color))
        };
    }
    createColorClasses(color) {
        return {
            [`wcs-background-${color}-hover`]: !this.disabled,
            [`wcs-color-${color}`]: !this.disabled
        };
    }
    componentDidLoad() {
        if (this.ripple) {
            this.addRippleEffect();
        }
    }
    addRippleEffect() {
        const ripple = new MDCRipple.MDCRipple(this.el.shadowRoot.querySelector('.wcs-inner-button'));
        ripple.unbounded = false;
    }
    static get is() { return "wcs-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["button.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["button.css"]
    }; }
    static get properties() { return {
        "type": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "ButtonType",
                "resolved": "\"button\" | \"submit\"",
                "references": {
                    "ButtonType": {
                        "location": "import",
                        "path": "./button-interface"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Specify the button type."
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "'button'"
        },
        "href": {
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
                "text": "Set a URL to point to.\r\nIf specified use a `a` tag instead of `btn`."
            },
            "attribute": "href",
            "reflect": false
        },
        "color": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "Color",
                "resolved": "string",
                "references": {
                    "Color": {
                        "location": "import",
                        "path": "../../interface"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Specify the button color."
            },
            "attribute": "color",
            "reflect": false,
            "defaultValue": "'primary'"
        },
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
                "text": "Specify wether the button is disabled or not."
            },
            "attribute": "disabled",
            "reflect": true,
            "defaultValue": "false"
        },
        "ripple": {
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
                "text": "Specify wether the button should have a ripple effect or not."
            },
            "attribute": "ripple",
            "reflect": false,
            "defaultValue": "true"
        },
        "mode": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'normal' | 'small' | 'block' | 'icon-only' | 'round'",
                "resolved": "\"block\" | \"icon-only\" | \"normal\" | \"round\" | \"small\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "This attribute specifies the size of the button.\r\nSetting this attribute will change the height and padding of a button."
            },
            "attribute": "mode",
            "reflect": true,
            "defaultValue": "'normal'"
        },
        "clear": {
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
                "text": "Specify wether the button should have background color or not."
            },
            "attribute": "clear",
            "reflect": true,
            "defaultValue": "false"
        }
    }; }
    static get contextProps() { return [{
            "name": "win",
            "context": "window"
        }]; }
    static get elementRef() { return "el"; }
    static get listeners() { return [{
            "name": "click",
            "method": "onClick",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
