import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

const FOUR_ITEMS = `
    <wcs-nav-item><a href="#" class="active">Item</a></wcs-nav-item>
    <wcs-nav-item><a href="#">Item</a></wcs-nav-item>
    <wcs-nav-item><a href="#">Item</a></wcs-nav-item>
    <wcs-nav-item slot="bottom"><a href="#">Bottom item</a></wcs-nav-item>
`;

test.describe('wcs-nav · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <style>
                wcs-nav {
                    height: 100vh;
                }
            </style>
            <wcs-nav>
                ${FOUR_ITEMS}
            </wcs-nav>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('mobile', async ({ page }: { page: E2EPage }) => {
        await page.setViewportSize({ width: 480, height: 800 });

        await setWcsContent(page, `
            <wcs-nav>
                ${FOUR_ITEMS}
            </wcs-nav>
        `);

        await expect(page).toHaveScreenshot('mobile.png', { fullPage: true });
    });
});
