import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-tab · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-tab header="Tab 1" item-key="1">
                Contenu de l'onglet
            </wcs-tab>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });
});
