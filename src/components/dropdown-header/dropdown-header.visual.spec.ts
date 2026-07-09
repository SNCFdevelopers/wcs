import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-dropdown-header · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-dropdown-header>Groupe</wcs-dropdown-header>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });
});
