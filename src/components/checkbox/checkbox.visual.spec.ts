import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-checkbox · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-checkbox>Accepter les conditions</wcs-checkbox>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('checked', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-checkbox checked>Accepter les conditions</wcs-checkbox>
        `);

        await expect(page).toHaveScreenshot('checked.png', { fullPage: true });
    });

    test('indeterminate', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-checkbox indeterminate>Accepter les conditions</wcs-checkbox>
        `);

        await expect(page).toHaveScreenshot('indeterminate.png', { fullPage: true });
    });

    test('disabled', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-checkbox disabled>Accepter les conditions</wcs-checkbox>
        `);

        await expect(page).toHaveScreenshot('disabled.png', { fullPage: true });
    });

    test('checked-disabled', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-checkbox checked disabled>Accepter les conditions</wcs-checkbox>
        `);

        await expect(page).toHaveScreenshot('checked-disabled.png', { fullPage: true });
    });

    test('label-alignment-top', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-checkbox label-alignment="top">Accepter les conditions</wcs-checkbox>
        `);

        await expect(page).toHaveScreenshot('label-alignment-top.png', { fullPage: true });
    });

    test('label-alignment-bottom', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-checkbox label-alignment="bottom">Accepter les conditions</wcs-checkbox>
        `);

        await expect(page).toHaveScreenshot('label-alignment-bottom.png', { fullPage: true });
    });
});
