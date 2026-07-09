import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-action-bar · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-action-bar>
                Titre de la page
                <wcs-button slot="actions">Action</wcs-button>
            </wcs-action-bar>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('gutter', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-action-bar gutter>
                Titre de la page
                <wcs-button slot="actions">Action</wcs-button>
            </wcs-action-bar>
        `);

        await expect(page).toHaveScreenshot('gutter.png', { fullPage: true });
    });

    test('with-tabs', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-action-bar>
                Titre de la page
                <wcs-button slot="actions">Action</wcs-button>
                <wcs-tabs slot="tabs">
                    <wcs-tab header="Tab 1"></wcs-tab>
                    <wcs-tab header="Tab 2"></wcs-tab>
                </wcs-tabs>
            </wcs-action-bar>
        `);

        await expect(page).toHaveScreenshot('with-tabs.png', { fullPage: true });
    });
});
