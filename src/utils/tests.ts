import { AXNode } from 'puppeteer';

export const findFocusedNode = (node: AXNode): AXNode => {
    if (node.focused) {
        return node;
    }

    for (const child of node.children || []) {
        const focusedNode = findFocusedNode(child);
        if (focusedNode) {
            return focusedNode;
        }
    }
}
