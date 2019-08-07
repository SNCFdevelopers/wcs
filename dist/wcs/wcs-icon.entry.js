import { r as registerInstance, h } from './chunk-2b7d6005.js';

class Icon {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        const cssClass = {
            class: {
                [`icons-${this.icon}`]: true,
                [`icons-size-${this.size}`]: true
            }
        };
        return (h("i", Object.assign({}, cssClass)));
    }
}

export { Icon as wcs_icon };
