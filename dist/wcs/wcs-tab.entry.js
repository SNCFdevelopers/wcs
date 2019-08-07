import { r as registerInstance, c as createEvent, h } from './chunk-2b7d6005.js';

/**
 *
 */
class Tab {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * This property should not be used,
         * it is only meant for internal use.
         * @internal
         * @ignore
         */
        this.slot = 'wcs-tab';
        this.wcsTabDidLoad = createEvent(this, "wcsTabDidLoad", 7);
    }
    componentDidLoad() {
        this.wcsTabDidLoad.emit();
    }
    render() {
        return (h("slot", null));
    }
}

export { Tab as wcs_tab };
