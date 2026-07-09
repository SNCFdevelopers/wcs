import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-mat-icon · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-mat-icon icon="home"></wcs-mat-icon>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('family-outlined', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-mat-icon icon="home" family="outlined"></wcs-mat-icon>
        `);

        await expect(page).toHaveScreenshot('family-outlined.png', { fullPage: true });
    });

    test('size-l', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-mat-icon icon="home" size="l"></wcs-mat-icon>
        `);

        await expect(page).toHaveScreenshot('size-l.png', { fullPage: true });
    });
});
