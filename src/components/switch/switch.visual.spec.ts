import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-switch · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-switch>Activer les notifications</wcs-switch>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('checked', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-switch checked>Activer les notifications</wcs-switch>
        `);

        await expect(page).toHaveScreenshot('checked.png', { fullPage: true });
    });

    test('disabled', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-switch disabled>Activer les notifications</wcs-switch>
        `);

        await expect(page).toHaveScreenshot('disabled.png', { fullPage: true });
    });

    test('checked-disabled', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-switch checked disabled>Activer les notifications</wcs-switch>
        `);

        await expect(page).toHaveScreenshot('checked-disabled.png', { fullPage: true });
    });

    test('label-alignment-top', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-switch label-alignment="top">Activer les notifications</wcs-switch>
        `);

        await expect(page).toHaveScreenshot('label-alignment-top.png', { fullPage: true });
    });
});
