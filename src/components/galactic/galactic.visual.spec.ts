import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-galactic · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-galactic text="My App">
                <wcs-galactic-menu text="Menu"></wcs-galactic-menu>
            </wcs-galactic>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });
});
