import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-spinner · visual spec', () => {
    test('mode-border', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-spinner mode="border"></wcs-spinner>
        `);

        await expect(page).toHaveScreenshot('mode-border.png', { fullPage: true });
    });

    test('mode-growing', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-spinner mode="growing"></wcs-spinner>
        `);

        await expect(page).toHaveScreenshot('mode-growing.png', { fullPage: true });
    });
});
