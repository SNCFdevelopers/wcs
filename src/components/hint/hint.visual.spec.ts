import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-hint · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-hint>Indication utile</wcs-hint>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('small', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-hint small>Indication utile</wcs-hint>
        `);

        await expect(page).toHaveScreenshot('small.png', { fullPage: true });
    });
});
