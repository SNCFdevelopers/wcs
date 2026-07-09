import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-com-nav-item · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-com-nav-item>
                <a href="#">Lien</a>
            </wcs-com-nav-item>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });
});
