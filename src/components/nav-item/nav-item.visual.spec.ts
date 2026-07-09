import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-nav-item · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 240px; padding: 16px;">
                <wcs-nav-item><a href="#">Lien</a></wcs-nav-item>
            </div>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });
});
