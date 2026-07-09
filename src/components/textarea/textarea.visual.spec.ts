import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-textarea · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-textarea placeholder="Enter text"></wcs-textarea>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('state-error', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-textarea state="error" value="invalid"></wcs-textarea>
        `);

        await expect(page).toHaveScreenshot('state-error.png', { fullPage: true });
    });

    test('disabled', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-textarea disabled value="Disabled"></wcs-textarea>
        `);

        await expect(page).toHaveScreenshot('disabled.png', { fullPage: true });
    });

    test('readonly', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-textarea readonly value="Readonly"></wcs-textarea>
        `);

        await expect(page).toHaveScreenshot('readonly.png', { fullPage: true });
    });
});
