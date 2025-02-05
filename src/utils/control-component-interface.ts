/**
 * For form controls components which have a label within like a wcs-switch or wcs-checkbox
 */
export interface ControlComponentWithLabel {
    /**
     * Get the label text
     */
    getLabel(): Promise<string>;
}

export function isControlComponentWithLabel(el: any): el is ControlComponentWithLabel {
    if (typeof el !== 'object' || el === null || el === undefined) return false;
    return 'getLabel' in el;
}

/**

 * Extracts the text content from nodes assigned to a slot in a Web Component's Shadow DOM.
 *
 * @param element - The Web Component HTMLElement containing a Shadow DOM with slots
 * @param slotName - Optional name of the slot to target (if not provided, targets the default slot)
 * @returns The combined text content of all nodes assigned to the specified slot, with normalized whitespace
 *
 * @throws Will not throw errors, but returns empty string if the element has no Shadow DOM,
 *         no matching slot, or no assigned nodes
 */
export function getSlottedContentText(element: HTMLElement, slotName?: string): string {
    if (!element.shadowRoot) {
        return '';
    }

    const slotSelector = typeof slotName === 'string' ? `slot[name="${slotName}"]` : 'slot:not([name])';

    const slotElement = element.shadowRoot.querySelector(slotSelector);
    if (!slotElement) {
        return '';
    }

    const assignedNodes = (slotElement as HTMLSlotElement).assignedNodes({flatten: true});
    if (!assignedNodes.length) {
        return '';
    }

    return assignedNodes
        .map(node => node.textContent || '')
        .filter(text => text.trim() !== '') // we skip empty text nodes
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
}
