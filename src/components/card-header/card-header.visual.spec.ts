import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-card-header · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-card-header>Titre de la carte</wcs-card-header>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('with-badge', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-card-header>
                Titre de la carte
                <wcs-badge slot="badges">Nouveau</wcs-badge>
            </wcs-card-header>
        `);

        await expect(page).toHaveScreenshot('with-badge.png', { fullPage: true });
    });

    test('with-actions', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-card-header>
                Titre de la carte
                <wcs-button slot="actions">Voir</wcs-button>
            </wcs-card-header>
        `);

        await expect(page).toHaveScreenshot('with-actions.png', { fullPage: true });
    });
});
