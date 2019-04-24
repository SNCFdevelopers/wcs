import { h } from '../wcs.core.js';

class Badge {
    constructor() {
        this.color = 'primary';
    }
    createColorClass(color) {
        return {
            [`wcs-background-${color}`]: true,
            [`wcs-color-${color}`]: true
        };
    }
    hostData() {
        return {
            class: Object.assign({}, this.createColorClass(this.color))
        };
    }
    render() {
        return (h("slot", null));
    }
    static get is() { return "wcs-badge"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color",
            "mutable": true
        }
    }; }
    static get style() { return ".sc-wcs-badge-h{display:inline-block;padding:.313rem 1.5rem;font-size:.875rem;font-weight:500;line-height:1;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.75rem}"; }
}

export { Badge as WcsBadge };
