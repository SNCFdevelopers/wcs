export class Sidebar {
    hostData() {
        return {
            'slot': 'sidebar'
        };
    }
    render() {
        return (h("nav", null,
            h("slot", { name: "link" })));
    }
    static get is() { return "wcs-sidebar"; }
    static get encapsulation() { return "shadow"; }
    static get style() { return "/**style-placeholder:wcs-sidebar:**/"; }
}
