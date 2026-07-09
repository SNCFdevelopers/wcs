import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-radio · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 240px; padding: 16px;">
                <wcs-radio label="Option 1" value="1"></wcs-radio>
            </div>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('disabled', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 240px; padding: 16px;">
                <wcs-radio label="Option 1" value="1" disabled></wcs-radio>
            </div>
        `);

        await expect(page).toHaveScreenshot('disabled.png', { fullPage: true });
    });
});
