import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-label · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-label>Nom</wcs-label>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('required', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-label required>Nom</wcs-label>
        `);

        await expect(page).toHaveScreenshot('required.png', { fullPage: true });
    });
});
