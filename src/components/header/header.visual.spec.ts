import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-header · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-header>
                <span slot="logo">Logo</span>
                <span slot="title">Titre</span>
                <span slot="center">Recherche</span>
                <span slot="actions"><wcs-button>Action</wcs-button></span>
            </wcs-header>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });
});
