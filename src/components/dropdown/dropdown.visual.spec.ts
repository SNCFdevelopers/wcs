import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

const THREE_ITEMS = `
    <span slot="placeholder">Choisir</span>
    <wcs-dropdown-item slot="item">Item 1</wcs-dropdown-item>
    <wcs-dropdown-item slot="item">Item 2</wcs-dropdown-item>
    <wcs-dropdown-item slot="item">Item 3</wcs-dropdown-item>
`;

test.describe('wcs-dropdown · visual spec', () => {
    test('default-closed', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-dropdown>${THREE_ITEMS}</wcs-dropdown>
        `);

        await expect(page).toHaveScreenshot('default-closed.png', { fullPage: true });
    });

    test('open', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-dropdown>${THREE_ITEMS}</wcs-dropdown>
        `);

        const dropdown = page.locator('wcs-dropdown');
        await dropdown.locator('wcs-button').click();
        await page.waitForChanges();

        await expect(page).toHaveScreenshot('open.png', { fullPage: true });
    });

    test('disabled', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-dropdown disabled>${THREE_ITEMS}</wcs-dropdown>
        `);

        await expect(page).toHaveScreenshot('disabled.png', { fullPage: true });
    });

    test('no-arrow', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-dropdown no-arrow>${THREE_ITEMS}</wcs-dropdown>
        `);

        await expect(page).toHaveScreenshot('no-arrow.png', { fullPage: true });
    });

    test('mode-clear', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-dropdown mode="clear">${THREE_ITEMS}</wcs-dropdown>
        `);

        await expect(page).toHaveScreenshot('mode-clear.png', { fullPage: true });
    });

    test('size-l', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-dropdown size="l">${THREE_ITEMS}</wcs-dropdown>
        `);

        await expect(page).toHaveScreenshot('size-l.png', { fullPage: true });
    });
});
