import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-skeleton-text · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-skeleton-text height="body"></wcs-skeleton-text>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('heading-h1', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-skeleton-text height="h1"></wcs-skeleton-text>
        `);

        await expect(page).toHaveScreenshot('heading-h1.png', { fullPage: true });
    });
});
