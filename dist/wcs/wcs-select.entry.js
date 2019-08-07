import { h, r as registerInstance, c as createEvent, e as getContext, d as getElement } from './chunk-2b7d6005.js';
import { M as MDCRipple } from './chunk-578c3979.js';

const SelectArrow = ({ up }) => (h("svg", { style: { marginLeft: 'auto' }, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
    h("style", { type: "text/css" }, `
            .arrow-group {
                transform-origin: 50% 50%;
                transition: transform 175ms ease-in-out;
            }
            .up {
                transform: scaleY(1);
            }
            .down {
                transform: scaleY(-1);
            }
        `),
    h("g", { fill: "none", class: (up ? 'up' : 'down') + ' arrow-group' },
        h("path", { class: "arrow", fill: "black", d: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" }),
        h("path", { d: "M0 0h24v24H0z", fill: "none" }))));

/**
 * Select component, use in conjuction with wcs-select-option.
 *
 * @example ```hmtl
 *  <wcs-select>
 *      <wcs-select-option value="1">One</wcs-select-option>
 *  </wcs-select>```
 * @todo Complete keyboard navigation.
 */
class Select {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** Wether the select is expanded */
        this.expanded = false;
        /** Wether the component is fully loaded in the DOM. */
        this.hasLoaded = false;
        /** If `true`, the user cannot interact with the select. */
        this.disabled = false;
        // XXX: We use fat arrow to have a reference to the function and
        // being able to unregister it later on.
        this.handleExpandedKeyEvents = (keyEvent) => {
            if (keyEvent.code === 'Escape') {
                this.unExpand();
            }
            else if (keyEvent.code === 'Tab') {
                this.unExpand();
                // XXX: so we preserve default select behavior, that is:
                // When expanded, pressing tab only unexpand and does not blur
                keyEvent.preventDefault();
            }
            else if (keyEvent.code === 'ArrowDown') {
                keyEvent.preventDefault();
                // Select next value
            }
            else if (keyEvent.code === 'ArrowUp') {
                // Select previous value
                keyEvent.preventDefault();
            }
        };
        this.focus = () => {
            this.wrapperEl.focus();
            this.wcsFocus.emit();
            this.wrapperEl.addEventListener('keydown', this.handleFocusedKeyEvents);
        };
        this.handleFocusedKeyEvents = (keyEvent) => {
            if (keyEvent.code === 'Escape') {
                this.blur();
            }
            else if (keyEvent.code === 'Space') {
                this.expand();
                // Focus on selected or first value.
                // XXX: so the page doesn't scroll down.
                keyEvent.preventDefault();
                this.wrapperEl.removeEventListener('keydown', this.handleFocusedKeyEvents);
            }
        };
        this.blur = () => {
            this.wrapperEl.blur();
            this.wcsBlur.emit();
            this.wrapperEl.removeEventListener('keydown', this.handleFocusedKeyEvents);
        };
        this.wcsChange = createEvent(this, "wcsChange", 7);
        this.wcsFocus = createEvent(this, "wcsFocus", 7);
        this.wcsBlur = createEvent(this, "wcsBlur", 7);
        this.window = getContext(this, "window");
    }
    componentDidLoad() {
        this.optionsEl = this.el.shadowRoot.querySelector('.wcs-select-options');
        this.contentEl = this.el.shadowRoot.querySelector('.wcs-select-content');
        this.wrapperEl = this.el.shadowRoot.querySelector('.wcs-select-wrapper');
        if (this.optionsEl.querySelector('slot') === null) {
            this.el.querySelectorAll('wcs-select-option')
                .forEach(option => {
                this.el.removeChild(option);
                this.optionsEl.appendChild(option);
            });
        }
        this.expandOnClick();
        this.addRippleEffect();
        this.wrapperEl.addEventListener('focus', this.focus);
        this.wrapperEl.addEventListener('blur', this.blur);
        this.hasLoaded = true;
    }
    componentDidUnload() {
        // XXX: to be sure we have no dangling listeners.
        this.window.removeEventListener('keydown', this.handleExpandedKeyEvents);
        this.wrapperEl.removeEventListener('focus', this.focus);
        this.wrapperEl.addEventListener('blur', this.blur);
    }
    expandOnClick() {
        this.el.addEventListener('mousedown', () => {
            if (!this.disabled) {
                if (this.expanded) {
                    this.unExpand();
                }
                else {
                    this.expand();
                }
            }
        });
    }
    expand() {
        this.window.addEventListener('keydown', this.handleExpandedKeyEvents);
        // TODO: add focus on options and focus the first.
        this.expanded = true;
    }
    unExpand() {
        this.expanded = false;
        this.window.removeEventListener('keydown', this.handleExpandedKeyEvents);
    }
    addRippleEffect() {
        // XXX: Unwrapped dependency over MDCRipple...
        const ripple = new MDCRipple(this.contentEl);
        ripple.unbounded = true;
    }
    onWindowClickEvent(event) {
        if (this.expanded
            && (event.target !== this.el
                && !(event.target instanceof Node && this.el.contains(event.target)))) {
            this.unExpand();
        }
    }
    selectedOptionChanged(event) {
        this.value = event.detail.value;
        this.displayText = event.detail.displayText;
        this.wcsChange.emit({ value: event.detail.value });
    }
    wrapperClasses() {
        return (this.expanded ? 'expanded ' : '')
            + (this.hasValue ? ' has-value ' : '')
            + (this.disabled ? ' disabled ' : '')
            + 'wcs-select-wrapper';
    }
    get hasValue() {
        return this.displayText !== undefined;
    }
    updateStyles() {
        // Make the options container width the same width as everything.
        const padding = 1.25; // XXX: This doesn't use the css variable.
        const borderSize = 1;
        this.optionsEl.setAttribute('style', `width: calc(${Math.ceil(this.el.getBoundingClientRect().width)}px - ${2 * padding}rem - ${2 * borderSize}px);`);
        this.setMarginTopOnNotFirstOption();
    }
    focusedAttributes() {
        return !this.disabled ? { tabIndex: 0 } : {};
    }
    // XXX: Investigate if there is no way to do it with pure CSS.
    // It poses problem due to slot not allowing deep styling.
    setMarginTopOnNotFirstOption() {
        const slot = this.optionsEl.querySelector('slot');
        let options;
        if (slot && slot.assignedElements) {
            options = this.optionsEl.querySelector('slot').assignedElements();
        }
        else {
            options = this.optionsEl.querySelectorAll('wcs-select-option');
        }
        options.forEach((opt, key) => {
            if (key !== 0) {
                opt.setAttribute('style', `padding-top: 0.875rem;`);
            }
        });
    }
    render() {
        if (this.hasLoaded) {
            this.updateStyles();
        }
        return (h("div", Object.assign({ class: this.wrapperClasses() }, this.focusedAttributes()), h("div", { class: "wcs-select-content" }, h("label", { class: "wcs-select-text" }, this.hasValue
            ? this.displayText
            : this.placeholder), h(SelectArrow, { up: this.expanded })), h("div", { class: "wcs-select-options" }, h("slot", { name: "wcs-select-option" }))));
    }
    get el() { return getElement(this); }
    static get style() { return ".wcs-background-primary {\n  background-color: #0088ce;\n}\n\n.wcs-color-primary {\n  color: #fff;\n}\n\n.wcs-background-primary-hover {\n  background-color: #0088ce;\n}\n.wcs-background-primary-hover:hover {\n  background-color: #00a1f4;\n  border-color: #02a9ff;\n}\n\n.wcs-background-secondary {\n  background-color: #4d4f53;\n}\n\n.wcs-color-secondary {\n  color: #fff;\n}\n\n.wcs-background-secondary-hover {\n  background-color: #4d4f53;\n}\n.wcs-background-secondary-hover:hover {\n  background-color: #5f6267;\n  border-color: #66686d;\n}\n\n.wcs-background-success {\n  background-color: #82be00;\n}\n\n.wcs-color-success {\n  color: #212529;\n}\n\n.wcs-background-success-hover {\n  background-color: #82be00;\n}\n.wcs-background-success-hover:hover {\n  background-color: #9ce400;\n  border-color: #a5f100;\n}\n\n.wcs-background-info {\n  background-color: #009aa6;\n}\n\n.wcs-color-info {\n  color: #fff;\n}\n\n.wcs-background-info-hover {\n  background-color: #009aa6;\n}\n.wcs-background-info-hover:hover {\n  background-color: #00bdcc;\n  border-color: #00c9d9;\n}\n\n.wcs-background-danger {\n  background-color: #cd0037;\n}\n\n.wcs-color-danger {\n  color: #fff;\n}\n\n.wcs-background-danger-hover {\n  background-color: #cd0037;\n}\n.wcs-background-danger-hover:hover {\n  background-color: #f30041;\n  border-color: #ff0145;\n}\n\n.wcs-background-warning {\n  background-color: #ffb612;\n}\n\n.wcs-color-warning {\n  color: #212529;\n}\n\n.wcs-background-warning-hover {\n  background-color: #ffb612;\n}\n.wcs-background-warning-hover:hover {\n  background-color: #ffc238;\n  border-color: #ffc645;\n}\n\n.wcs-background-light {\n  background-color: #f2f2f2;\n}\n\n.wcs-color-light {\n  color: #212529;\n}\n\n.wcs-background-light-hover {\n  background-color: #f2f2f2;\n}\n.wcs-background-light-hover:hover {\n  background-color: white;\n  border-color: white;\n}\n\n.wcs-background-dark {\n  background-color: #343a40;\n}\n\n.wcs-color-dark {\n  color: #fff;\n}\n\n.wcs-background-dark-hover {\n  background-color: #343a40;\n}\n.wcs-background-dark-hover:hover {\n  background-color: #454d55;\n  border-color: #4b545c;\n}\n\n\@-webkit-keyframes mdc-ripple-fg-radius-in {\n  from {\n    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);\n    transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);\n  }\n  to {\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n  }\n}\n\n\@keyframes mdc-ripple-fg-radius-in {\n  from {\n    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);\n    transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);\n  }\n  to {\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n  }\n}\n\@-webkit-keyframes mdc-ripple-fg-opacity-in {\n  from {\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    opacity: 0;\n  }\n  to {\n    opacity: var(--mdc-ripple-fg-opacity, 0);\n  }\n}\n\@keyframes mdc-ripple-fg-opacity-in {\n  from {\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    opacity: 0;\n  }\n  to {\n    opacity: var(--mdc-ripple-fg-opacity, 0);\n  }\n}\n\@-webkit-keyframes mdc-ripple-fg-opacity-out {\n  from {\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    opacity: var(--mdc-ripple-fg-opacity, 0);\n  }\n  to {\n    opacity: 0;\n  }\n}\n\@keyframes mdc-ripple-fg-opacity-out {\n  from {\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    opacity: var(--mdc-ripple-fg-opacity, 0);\n  }\n  to {\n    opacity: 0;\n  }\n}\n.mdc-ripple-surface--test-edge-var-bug {\n  --mdc-ripple-surface-test-edge-var: 1px solid #000;\n  visibility: hidden;\n}\n.mdc-ripple-surface--test-edge-var-bug::before {\n  border: var(--mdc-ripple-surface-test-edge-var);\n}\n\n.mdc-ripple-surface {\n  --mdc-ripple-fg-size: 0;\n  --mdc-ripple-left: 0;\n  --mdc-ripple-top: 0;\n  --mdc-ripple-fg-scale: 1;\n  --mdc-ripple-fg-translate-end: 0;\n  --mdc-ripple-fg-translate-start: 0;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  will-change: transform, opacity;\n  position: relative;\n  outline: none;\n  overflow: hidden;\n}\n.mdc-ripple-surface::before, .mdc-ripple-surface::after {\n  position: absolute;\n  border-radius: 50%;\n  opacity: 0;\n  pointer-events: none;\n  content: \"\";\n}\n.mdc-ripple-surface::before {\n  -webkit-transition: opacity 15ms linear, background-color 15ms linear;\n  transition: opacity 15ms linear, background-color 15ms linear;\n  z-index: 1;\n}\n.mdc-ripple-surface.mdc-ripple-upgraded::before {\n  -webkit-transform: scale(var(--mdc-ripple-fg-scale, 1));\n  transform: scale(var(--mdc-ripple-fg-scale, 1));\n}\n.mdc-ripple-surface.mdc-ripple-upgraded::after {\n  top: 0;\n  /* \@noflip */\n  left: 0;\n  -webkit-transform: scale(0);\n  transform: scale(0);\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n}\n.mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after {\n  top: var(--mdc-ripple-top, 0);\n  /* \@noflip */\n  left: var(--mdc-ripple-left, 0);\n}\n.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation::after {\n  -webkit-animation: mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards;\n  animation: mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards;\n}\n.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation::after {\n  -webkit-animation: mdc-ripple-fg-opacity-out 150ms;\n  animation: mdc-ripple-fg-opacity-out 150ms;\n  -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n  transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n}\n.mdc-ripple-surface::before, .mdc-ripple-surface::after {\n  background-color: #000;\n}\n.mdc-ripple-surface:hover::before {\n  opacity: 0.04;\n}\n.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus::before, .mdc-ripple-surface.mdc-ripple-upgraded--background-focused::before {\n  -webkit-transition-duration: 75ms;\n  transition-duration: 75ms;\n  opacity: 0.12;\n}\n.mdc-ripple-surface:not(.mdc-ripple-upgraded)::after {\n  -webkit-transition: opacity 150ms linear;\n  transition: opacity 150ms linear;\n}\n.mdc-ripple-surface:not(.mdc-ripple-upgraded):active::after {\n  -webkit-transition-duration: 75ms;\n  transition-duration: 75ms;\n  opacity: 0.12;\n}\n.mdc-ripple-surface.mdc-ripple-upgraded {\n  --mdc-ripple-fg-opacity: 0.12;\n}\n.mdc-ripple-surface::before, .mdc-ripple-surface::after {\n  top: calc(50% - 100%);\n  /* \@noflip */\n  left: calc(50% - 100%);\n  width: 200%;\n  height: 200%;\n}\n.mdc-ripple-surface.mdc-ripple-upgraded::after {\n  width: var(--mdc-ripple-fg-size, 100%);\n  height: var(--mdc-ripple-fg-size, 100%);\n}\n.mdc-ripple-surface[data-mdc-ripple-is-unbounded] {\n  overflow: visible;\n}\n.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::before, .mdc-ripple-surface[data-mdc-ripple-is-unbounded]::after {\n  top: calc(50% - 50%);\n  /* \@noflip */\n  left: calc(50% - 50%);\n  width: 100%;\n  height: 100%;\n}\n.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::before, .mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after {\n  top: var(--mdc-ripple-top, calc(50% - 50%));\n  /* \@noflip */\n  left: var(--mdc-ripple-left, calc(50% - 50%));\n  width: var(--mdc-ripple-fg-size, 100%);\n  height: var(--mdc-ripple-fg-size, 100%);\n}\n.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after {\n  width: var(--mdc-ripple-fg-size, 100%);\n  height: var(--mdc-ripple-fg-size, 100%);\n}\n.mdc-ripple-surface--primary::before, .mdc-ripple-surface--primary::after {\n  background-color: #6200ee;\n}\n\@supports not (-ms-ime-align: auto) {\n  .mdc-ripple-surface--primary::before, .mdc-ripple-surface--primary::after {\n    /* \@alternate */\n    background-color: var(--mdc-theme-primary, #6200ee);\n  }\n}\n.mdc-ripple-surface--primary:hover::before {\n  opacity: 0.04;\n}\n.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus::before, .mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused::before {\n  -webkit-transition-duration: 75ms;\n  transition-duration: 75ms;\n  opacity: 0.12;\n}\n.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded)::after {\n  -webkit-transition: opacity 150ms linear;\n  transition: opacity 150ms linear;\n}\n.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active::after {\n  -webkit-transition-duration: 75ms;\n  transition-duration: 75ms;\n  opacity: 0.12;\n}\n.mdc-ripple-surface--primary.mdc-ripple-upgraded {\n  --mdc-ripple-fg-opacity: 0.12;\n}\n.mdc-ripple-surface--accent::before, .mdc-ripple-surface--accent::after {\n  background-color: #018786;\n}\n\@supports not (-ms-ime-align: auto) {\n  .mdc-ripple-surface--accent::before, .mdc-ripple-surface--accent::after {\n    /* \@alternate */\n    background-color: var(--mdc-theme-secondary, #018786);\n  }\n}\n.mdc-ripple-surface--accent:hover::before {\n  opacity: 0.04;\n}\n.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus::before, .mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused::before {\n  -webkit-transition-duration: 75ms;\n  transition-duration: 75ms;\n  opacity: 0.12;\n}\n.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded)::after {\n  -webkit-transition: opacity 150ms linear;\n  transition: opacity 150ms linear;\n}\n.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active::after {\n  -webkit-transition-duration: 75ms;\n  transition-duration: 75ms;\n  opacity: 0.12;\n}\n.mdc-ripple-surface--accent.mdc-ripple-upgraded {\n  --mdc-ripple-fg-opacity: 0.12;\n}\n\n.wcs-select-text {\n  padding: 0.65625rem 1.25rem;\n  font-weight: 500;\n  cursor: pointer;\n  color: #747678;\n  -webkit-transition: color 175ms ease-in-out;\n  transition: color 175ms ease-in-out;\n}\n\n.wcs-select-content {\n  --mdc-ripple-fg-size: 0;\n  --mdc-ripple-left: 0;\n  --mdc-ripple-top: 0;\n  --mdc-ripple-fg-scale: 1;\n  --mdc-ripple-fg-translate-end: 0;\n  --mdc-ripple-fg-translate-start: 0;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  will-change: transform, opacity;\n  overflow: hidden;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  padding-right: var(--wcs-text-padding);\n  background-color: #f2f2f2;\n  border-radius: var(--wcs-border-radius);\n  border: transparent solid 1px;\n  font-size: 1rem;\n  line-height: 1.5;\n  cursor: pointer;\n}\n.wcs-select-content::before, .wcs-select-content::after {\n  position: absolute;\n  border-radius: 50%;\n  opacity: 0;\n  pointer-events: none;\n  content: \"\";\n}\n.wcs-select-content::before {\n  -webkit-transition: opacity 15ms linear, background-color 15ms linear;\n  transition: opacity 15ms linear, background-color 15ms linear;\n  z-index: 1;\n}\n.wcs-select-content.mdc-ripple-upgraded::before {\n  -webkit-transform: scale(var(--mdc-ripple-fg-scale, 1));\n  transform: scale(var(--mdc-ripple-fg-scale, 1));\n}\n.wcs-select-content.mdc-ripple-upgraded::after {\n  top: 0;\n  /* \@noflip */\n  left: 0;\n  -webkit-transform: scale(0);\n  transform: scale(0);\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n}\n.wcs-select-content.mdc-ripple-upgraded--unbounded::after {\n  top: var(--mdc-ripple-top, 0);\n  /* \@noflip */\n  left: var(--mdc-ripple-left, 0);\n}\n.wcs-select-content.mdc-ripple-upgraded--foreground-activation::after {\n  -webkit-animation: mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards;\n  animation: mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards;\n}\n.wcs-select-content.mdc-ripple-upgraded--foreground-deactivation::after {\n  -webkit-animation: mdc-ripple-fg-opacity-out 150ms;\n  animation: mdc-ripple-fg-opacity-out 150ms;\n  -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n  transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n}\n.wcs-select-content::before, .wcs-select-content::after {\n  top: calc(50% - 100%);\n  /* \@noflip */\n  left: calc(50% - 100%);\n  width: 200%;\n  height: 200%;\n}\n.wcs-select-content.mdc-ripple-upgraded::after {\n  width: var(--mdc-ripple-fg-size, 100%);\n  height: var(--mdc-ripple-fg-size, 100%);\n}\n.wcs-select-content::before, .wcs-select-content::after {\n  background-color: #999;\n}\n.wcs-select-content:hover::before {\n  opacity: 0.1;\n}\n.wcs-select-content:not(.mdc-ripple-upgraded):focus::before, .wcs-select-content.mdc-ripple-upgraded--background-focused::before {\n  -webkit-transition-duration: 75ms;\n  transition-duration: 75ms;\n  opacity: 0.2;\n}\n.wcs-select-content:not(.mdc-ripple-upgraded)::after {\n  -webkit-transition: opacity 150ms linear;\n  transition: opacity 150ms linear;\n}\n.wcs-select-content:not(.mdc-ripple-upgraded):active::after {\n  -webkit-transition-duration: 75ms;\n  transition-duration: 75ms;\n  opacity: 0.3;\n}\n.wcs-select-content.mdc-ripple-upgraded {\n  --mdc-ripple-fg-opacity: 0.3;\n}\n.wcs-select-content:hover {\n  border: #d7d7d7 solid 1px;\n}\n\n.wcs-select-options {\n  display: none;\n  position: absolute;\n  z-index: 1;\n  padding: var(--wcs-padding);\n  margin: 0;\n  max-height: 22.5rem;\n  overflow-y: auto;\n  background-color: white;\n  color: #747678;\n  border-left: #d7d7d7 solid 1px;\n  border-right: #d7d7d7 solid 1px;\n  border-bottom: #d7d7d7 solid 1px;\n  border-bottom-right-radius: var(--wcs-border-radius);\n  border-bottom-left-radius: var(--wcs-border-radius);\n}\n\n.expanded .wcs-select-options {\n  display: block;\n}\n.expanded .wcs-select-content {\n  border-top: #d7d7d7 solid 1px;\n  border-right: #d7d7d7 solid 1px;\n  border-left: #d7d7d7 solid 1px;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n  border-bottom: solid 1px transparent;\n}\n\n.wcs-select-wrapper {\n  position: relative;\n  outline: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.wcs-select-wrapper:not(.expanded):focus .wcs-select-content {\n  border: #0088ce solid 1px;\n}\n\n.has-value .wcs-select-text {\n  color: #0088ce;\n}\n\n.disabled .wcs-select-content,\n.disabled .wcs-select-text {\n  cursor: default;\n  pointer-events: none;\n}\n.disabled .wcs-select-text {\n  color: #b9b9b9;\n}\n.disabled .arrow {\n  fill: #747678;\n}\n\n.wcs-select-options::slotted(wcs-select-option) > [value=\"1\"] {\n  display: none;\n}"; }
}

export { Select as wcs_select };
