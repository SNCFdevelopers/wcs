export class Badge {
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
    static get style() { return "/**style-placeholder:wcs-badge:**/"; }
}
