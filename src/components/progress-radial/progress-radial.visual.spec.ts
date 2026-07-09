import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-progress-radial · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 200px; padding: 16px;">
                <wcs-progress-radial value="40"></wcs-progress-radial>
            </div>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('show-label', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 200px; padding: 16px;">
                <wcs-progress-radial value="40" show-label></wcs-progress-radial>
            </div>
        `);

        await expect(page).toHaveScreenshot('show-label.png', { fullPage: true });
    });

    test('size-large', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 200px; padding: 16px;">
                <wcs-progress-radial value="40" size="160"></wcs-progress-radial>
            </div>
        `);

        await expect(page).toHaveScreenshot('size-large.png', { fullPage: true });
    });
});
