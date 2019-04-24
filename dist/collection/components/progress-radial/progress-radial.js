export class ProgressRadial {
    constructor() {
        this.size = 120;
        this.showLabel = false;
        this.value = 0;
    }
    render() {
        const { size, halfSize } = { size: this.size, halfSize: this.size / 2 };
        return (h("div", { class: "progress-circle", "data-component": "radial-progress" },
            h("svg", { class: "progress-circle-figure", "data-role": "figure", width: this.size, height: this.size, viewBox: `0 0 ${size} ${size}`, style: this.getSvgStyle() },
                h("circle", { class: "progress-circle-meter", cx: halfSize, cy: halfSize, r: "54", "stroke-width": "12" }),
                h("circle", { class: "progress-circle-value", cx: halfSize, cy: halfSize, r: "54", "stroke-width": "12" })),
            this.showLabel &&
                h("div", { class: "progress-circle-label", "data-role": "label" },
                    h("span", null,
                        h("span", { "data-role": "labelvalue" }, this.value),
                        h("sup", null, "%"))),
            h("input", { "data-role": "control", class: "sr-only", type: "range", value: this.value })));
    }
    getSvgStyle() {
        return {
            'stroke-dasharray': 339.292,
            'stroke-dashoffset': 339.292 - (this.value / 100) * 339.292
        };
    }
    static get is() { return "wcs-progress-radial"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "showLabel": {
            "type": Boolean,
            "attr": "show-label"
        },
        "size": {
            "type": Number,
            "attr": "size"
        },
        "value": {
            "type": Number,
            "attr": "value"
        }
    }; }
    static get style() { return "/**style-placeholder:wcs-progress-radial:**/"; }
}
