import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-progress-bar · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 320px; padding: 16px;">
                <wcs-progress-bar value="40"></wcs-progress-bar>
            </div>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('show-label', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 320px; padding: 16px;">
                <wcs-progress-bar value="40" show-label></wcs-progress-bar>
            </div>
        `);

        await expect(page).toHaveScreenshot('show-label.png', { fullPage: true });
    });

    test('size-s', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 320px; padding: 16px;">
                <wcs-progress-bar value="40" size="s"></wcs-progress-bar>
            </div>
        `);

        await expect(page).toHaveScreenshot('size-s.png', { fullPage: true });
    });
});
