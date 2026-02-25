import { E2EPage } from '@stencil/playwright';

/**
 * @see stencil.config.ts expose dev web server
 * @param page
 * @param content
 */
export async function setWcsContent(page: E2EPage, content: string) {
    await page.setContent(content);
    await page.evaluate(() => {
        document.body.classList.add('sncf-holding');
    })
    await page.addStyleTag({
        url: '/design-tokens/sncf-holding.css',
    });
    await page.addStyleTag({
        url: '/build/wcs.css',
    });
    await page.addStyleTag({
        url: '/test.css',
    });
    await page.waitForChanges();
}
