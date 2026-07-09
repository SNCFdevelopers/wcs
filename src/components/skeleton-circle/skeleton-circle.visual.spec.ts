import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-skeleton-circle · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 160px; padding: 16px;">
                <wcs-skeleton-circle radius="50"></wcs-skeleton-circle>
            </div>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('animation-pulse', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 160px; padding: 16px;">
                <wcs-skeleton-circle radius="50" animation="pulse"></wcs-skeleton-circle>
            </div>
        `);

        await expect(page).toHaveScreenshot('animation-pulse.png', { fullPage: true });
    });

    test('animation-none', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 160px; padding: 16px;">
                <wcs-skeleton-circle radius="50" animation="none"></wcs-skeleton-circle>
            </div>
        `);

        await expect(page).toHaveScreenshot('animation-none.png', { fullPage: true });
    });
});
