import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

const NAV_ITEMS = `
    <wcs-com-nav-item><a href="#">Item 1</a></wcs-com-nav-item>
    <wcs-com-nav-item><a href="#">Item 2</a></wcs-com-nav-item>
    <wcs-com-nav-item><a href="#">Item 3</a></wcs-com-nav-item>
`;

test.describe('wcs-com-nav-category · visual spec', () => {
    test('default-closed', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-com-nav-category label="Category">${NAV_ITEMS}</wcs-com-nav-category>
        `);

        await expect(page).toHaveScreenshot('default-closed.png', { fullPage: true });
    });

    test('open', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-com-nav-category label="Category">${NAV_ITEMS}</wcs-com-nav-category>
        `);

        await page.locator('wcs-com-nav-category').getByRole('button').click();
        await page.waitForChanges();

        await expect(page).toHaveScreenshot('open.png', { fullPage: true });
    });
});
