import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-form-field · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-form-field>
                <wcs-label>Nom</wcs-label>
                <wcs-input placeholder="Entrer votre nom"></wcs-input>
                <wcs-hint>Indication</wcs-hint>
            </wcs-form-field>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('error', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-form-field is-error>
                <wcs-label>Nom</wcs-label>
                <wcs-input placeholder="Entrer votre nom"></wcs-input>
                <wcs-error>Champ requis</wcs-error>
            </wcs-form-field>
        `);

        await expect(page).toHaveScreenshot('error.png', { fullPage: true });
    });
});
