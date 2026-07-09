import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-error · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-error>Ce champ est requis</wcs-error>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });
});
