export class Icon {
    render() {
        const cssClass = {
            class: {
                [`icons-${this.icon}`]: true,
                [`icons-size-${this.size}`]: true
            }
        };
        return (h("i", Object.assign({}, cssClass)));
    }
    static get is() { return "wcs-icon"; }
    static get properties() { return {
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "size": {
            "type": String,
            "attr": "size"
        }
    }; }
}
