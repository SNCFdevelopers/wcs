import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

const TWO_CATEGORIES = `
    <wcs-com-nav-category label="Category 1">
        <wcs-com-nav-item><a href="#">Item 1</a></wcs-com-nav-item>
        <wcs-com-nav-item><a href="#">Item 2</a></wcs-com-nav-item>
    </wcs-com-nav-category>
    <wcs-com-nav-category label="Category 2">
        <wcs-com-nav-item><a href="#">Item 3</a></wcs-com-nav-item>
        <wcs-com-nav-item><a href="#">Item 4</a></wcs-com-nav-item>
    </wcs-com-nav-category>
`;

test.describe('wcs-com-nav-submenu · visual spec', () => {
    test('default-closed', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-com-nav-submenu label="Menu" panel-title="Panel title" panel-description="Panel description">${TWO_CATEGORIES}</wcs-com-nav-submenu>
        `);

        await expect(page).toHaveScreenshot('default-closed.png', { fullPage: true });
    });

    test('open', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-com-nav-submenu label="Menu" panel-title="Panel title" panel-description="Panel description">${TWO_CATEGORIES}</wcs-com-nav-submenu>
        `);

        await page.locator('wcs-com-nav-submenu').getByRole('button').click();
        await page.waitForChanges();

        await expect(page).toHaveScreenshot('open.png', { fullPage: true });
    });
});
