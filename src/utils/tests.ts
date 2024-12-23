import { SerializedAXNode } from 'puppeteer';
import { E2EPage } from "@stencil/core/testing";

export const findFocusedNode = (node: SerializedAXNode): SerializedAXNode => {
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

// Add sncf-holding class to body and add sncf-holding.css to the page after setting the content
export async function setWcsContent(page: E2EPage, content: string) {
    await page.setContent(content);
    await page.evaluate(() => {
        document.body.classList.add('sncf-holding');
    })
    await page.addStyleTag({
        path: './design-tokens/dist/sncf-holding.css',
    });
    await page.waitForChanges();
}
