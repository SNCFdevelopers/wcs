import MDCRipple from '@material/ripple';
import { hasShadowDom } from '../../utils/helpers';
export class Button {
    constructor() {
        this.type = 'button';
        this.color = 'primary';
        this.disabled = false;
        this.ripple = false;
        this.mode = 'normal';
    }
    onClick(ev) {
        if (this.type !== 'button' && hasShadowDom(this.el)) {
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
        this.addRippleEffect();
    }
    addRippleEffect() {
        const ripple = new MDCRipple.MDCRipple(this.element.shadowRoot.querySelector('.wcs-inner-button'));
        ripple.unbound = true;
    }
    static get is() { return "wcs-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled",
            "reflectToAttr": true
        },
        "el": {
            "elementRef": true
        },
        "element": {
            "elementRef": true
        },
        "href": {
            "type": String,
            "attr": "href"
        },
        "mode": {
            "type": String,
            "attr": "mode",
            "reflectToAttr": true
        },
        "ripple": {
            "type": Boolean,
            "attr": "ripple"
        },
        "type": {
            "type": String,
            "attr": "type",
            "mutable": true
        },
        "win": {
            "context": "window"
        }
    }; }
    static get listeners() { return [{
            "name": "click",
            "method": "onClick"
        }]; }
    static get style() { return "/**style-placeholder:wcs-button:**/"; }
}
