import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-field · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-field>
                <wcs-field-label slot="label">Label</wcs-field-label>
                <wcs-field-content slot="content">Contenu</wcs-field-content>
            </wcs-field>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });
});
