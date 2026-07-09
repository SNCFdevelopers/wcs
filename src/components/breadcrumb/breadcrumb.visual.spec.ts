import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-breadcrumb · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-breadcrumb>
                <wcs-breadcrumb-item>Accueil</wcs-breadcrumb-item>
                <wcs-breadcrumb-item>Catégorie</wcs-breadcrumb-item>
                <wcs-breadcrumb-item aria-current="page">Page actuelle</wcs-breadcrumb-item>
            </wcs-breadcrumb>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('collapsed', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-breadcrumb max-items="3" items-before-collapse="1" items-after-collapse="1">
                <wcs-breadcrumb-item>Accueil</wcs-breadcrumb-item>
                <wcs-breadcrumb-item>Catégorie 1</wcs-breadcrumb-item>
                <wcs-breadcrumb-item>Catégorie 2</wcs-breadcrumb-item>
                <wcs-breadcrumb-item>Catégorie 3</wcs-breadcrumb-item>
                <wcs-breadcrumb-item>Catégorie 4</wcs-breadcrumb-item>
                <wcs-breadcrumb-item aria-current="page">Page actuelle</wcs-breadcrumb-item>
            </wcs-breadcrumb>
        `);

        await expect(page).toHaveScreenshot('collapsed.png', { fullPage: true });
    });
});
