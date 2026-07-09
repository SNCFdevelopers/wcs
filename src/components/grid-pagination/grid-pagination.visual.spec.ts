import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-grid-pagination · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-grid-pagination current-page="2" page-count="5" items-count="100"></wcs-grid-pagination>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('first-page', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-grid-pagination current-page="0" page-count="5" items-count="100"></wcs-grid-pagination>
        `);

        await expect(page).toHaveScreenshot('first-page.png', { fullPage: true });
    });

    test('last-page', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-grid-pagination current-page="4" page-count="5" items-count="100"></wcs-grid-pagination>
        `);

        await expect(page).toHaveScreenshot('last-page.png', { fullPage: true });
    });
});
