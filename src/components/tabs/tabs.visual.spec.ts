import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

const THREE_TABS = `
    <wcs-tab header="Tab 1" item-key="1">Contenu 1</wcs-tab>
    <wcs-tab header="Tab 2" item-key="2">Contenu 2</wcs-tab>
    <wcs-tab header="Tab 3" item-key="3">Contenu 3</wcs-tab>
`;

test.describe('wcs-tabs · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-tabs selected-index="0">${THREE_TABS}</wcs-tabs>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('align-center', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-tabs align="center">${THREE_TABS}</wcs-tabs>
        `);

        await expect(page).toHaveScreenshot('align-center.png', { fullPage: true });
    });

    test('align-end', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-tabs align="end">${THREE_TABS}</wcs-tabs>
        `);

        await expect(page).toHaveScreenshot('align-end.png', { fullPage: true });
    });

    test('gutter', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-tabs gutter>${THREE_TABS}</wcs-tabs>
        `);

        await expect(page).toHaveScreenshot('gutter.png', { fullPage: true });
    });

    test('headers-only', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-tabs headers-only>${THREE_TABS}</wcs-tabs>
        `);

        await expect(page).toHaveScreenshot('headers-only.png', { fullPage: true });
    });

    test('mobile', async ({ page }: { page: E2EPage }) => {
        await page.setViewportSize({ width: 480, height: 800 });

        await setWcsContent(page, `
            <wcs-tabs>${THREE_TABS}</wcs-tabs>
        `);

        const mobileButton = page.locator('wcs-tabs').locator('#mobile-button');
        await mobileButton.click();
        await page.waitForChanges();

        await expect(page).toHaveScreenshot('mobile.png', { fullPage: true });
    });
});
