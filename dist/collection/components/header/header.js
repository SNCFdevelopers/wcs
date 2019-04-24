export class Header {
    hostData() {
        return {
            'slot': 'header'
        };
    }
    render() {
        return (h("header", null,
            h("slot", { name: "logo" }),
            h("slot", { name: "title" })));
    }
    static get is() { return "wcs-header"; }
    static get encapsulation() { return "shadow"; }
    static get style() { return "/**style-placeholder:wcs-header:**/"; }
}
