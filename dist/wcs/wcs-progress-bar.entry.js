import { r as registerInstance, h } from './chunk-2b7d6005.js';

/**
 * Component displaying progress as a bar.
 */
class ProgressBar {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Whether the component display the small version
         */
        this.small = false;
        /**
         * Whether it displays a label indicating the percentage of progress above the bar.
         */
        this.showLabel = false;
        /**
         * The actual value of the progress.
         * Ranging from 0 to 100.
         */
        this.value = 0;
    }
    render() {
        const style = {
            width: this.value + '%'
        };
        return (h("div", { class: this.rootClasses() }, h("div", { class: "progress-bar", style: style }, this.showLabel &&
            h("span", { class: "progress-label" }, this.value, h("sup", null, "%")))));
    }
    rootClasses() {
        let classes = 'progress';
        if (this.small)
            classes += ' small';
        if (this.showLabel)
            classes += ' has-label';
        // FIXME: Temporary fix so the label doesn't appear before the bar.
        if (this.value === 0)
            classes += ' value-zero';
        return classes;
    }
    static get style() { return ".progress {\n  display: -ms-flexbox;\n  display: flex;\n  height: 0.625rem;\n  font-size: 0.75rem;\n  color: #4d4f53;\n  background-color: #fff;\n  background-image: -webkit-gradient(linear, left top, right top, color-stop(50%, #e1ded9), color-stop(50%, transparent));\n  background-image: linear-gradient(90deg, #e1ded9 50%, transparent 50%);\n  background-size: 0.25rem 0.625rem;\n  border-radius: 0.3125rem;\n}\n.progress.has-label {\n  margin-top: 2.375rem;\n}\n.progress.small {\n  height: 0.3125rem;\n  overflow: hidden;\n  background-color: #fff;\n  background-image: none;\n  background-size: auto;\n  border-radius: 0.15625rem;\n}\n.progress.value-zero > .progress-bar > .progress-label {\n  right: unset;\n}\n\n.progress-bar {\n  position: relative;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-pack: center;\n  justify-content: center;\n  color: #4d4f53;\n  text-align: center;\n  background-color: #0088ce;\n  border-radius: 0.3125rem;\n  -webkit-transition: width 0.375s ease-out;\n  transition: width 0.375s ease-out;\n}\n\n.progress-label {\n  position: absolute;\n  right: 0;\n  bottom: calc(100% + 0.5rem);\n  font-size: 1.5rem;\n  font-weight: 500;\n}\n.progress-label sup {\n  font-size: 0.875rem;\n  top: -0.5em;\n  position: relative;\n  line-height: 0;\n  vertical-align: baseline;\n}"; }
}

export { ProgressBar as wcs_progress_bar };
