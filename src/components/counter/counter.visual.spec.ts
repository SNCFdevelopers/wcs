import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-counter · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-counter label="Passengers" value="2"></wcs-counter>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('size-l', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-counter label="Passengers" value="2" size="l"></wcs-counter>
        `);

        await expect(page).toHaveScreenshot('size-l.png', { fullPage: true });
    });

    test('disabled', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-counter label="Passengers" value="2" disabled></wcs-counter>
        `);

        await expect(page).toHaveScreenshot('disabled.png', { fullPage: true });
    });
});
