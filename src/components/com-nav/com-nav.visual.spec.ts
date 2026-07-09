import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

const THREE_ITEMS = `
    <wcs-com-nav-item><a href="#">Item 1</a></wcs-com-nav-item>
    <wcs-com-nav-item><a href="#">Item 2</a></wcs-com-nav-item>
    <wcs-com-nav-item><a href="#">Item 3</a></wcs-com-nav-item>
`;

test.describe('wcs-com-nav · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-com-nav app-name="My App">${THREE_ITEMS}</wcs-com-nav>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('mobile', async ({ page }: { page: E2EPage }) => {
        await page.setViewportSize({ width: 480, height: 800 });

        await setWcsContent(page, `
            <wcs-com-nav app-name="My App">${THREE_ITEMS}</wcs-com-nav>
        `);

        await expect(page).toHaveScreenshot('mobile.png', { fullPage: true });
    });
});
