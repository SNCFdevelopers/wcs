export class ProgressBar {
    constructor() {
        this.small = false;
        this.showLabel = false;
        this.value = 0;
    }
    render() {
        const style = {
            width: this.value + '%'
        };
        return (h("div", { class: this.rootClasses() },
            h("div", { class: "progress-bar", style: style }, this.showLabel &&
                h("span", { class: "progress-label" },
                    this.value,
                    h("sup", null, "%")))));
    }
    rootClasses() {
        let classes = 'progress';
        if (this.small)
            classes += ' small';
        if (this.showLabel)
            classes += ' has-label';
        if (this.value === 0)
            classes += ' value-zero';
        return classes;
    }
    static get is() { return "wcs-progress-bar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "showLabel": {
            "type": Boolean,
            "attr": "show-label",
            "mutable": true
        },
        "small": {
            "type": Boolean,
            "attr": "small",
            "mutable": true
        },
        "value": {
            "type": Number,
            "attr": "value",
            "mutable": true
        }
    }; }
    static get style() { return "/**style-placeholder:wcs-progress-bar:**/"; }
}
