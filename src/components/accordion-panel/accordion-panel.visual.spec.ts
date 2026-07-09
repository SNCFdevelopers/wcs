import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-accordion-panel · visual spec', () => {
    test('default-closed', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 480px; padding: 24px;">
                <wcs-accordion-panel>
                    <wcs-accordion-header>Panneau</wcs-accordion-header>
                    <wcs-accordion-content>Contenu du panneau</wcs-accordion-content>
                </wcs-accordion-panel>
            </div>
        `);

        await expect(page).toHaveScreenshot('default-closed.png', { fullPage: true });
    });

    test('open', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 480px; padding: 24px;">
                <wcs-accordion-panel>
                    <wcs-accordion-header>Panneau</wcs-accordion-header>
                    <wcs-accordion-content>Contenu du panneau</wcs-accordion-content>
                </wcs-accordion-panel>
            </div>
        `);

        await page.locator('wcs-accordion-panel').click();
        await page.waitForChanges();

        await expect(page).toHaveScreenshot('open.png', { fullPage: true });
    });

    test('hide-action-text-false', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 480px; padding: 24px;">
                <wcs-accordion-panel hide-action-text="false">
                    <wcs-accordion-header>Panneau</wcs-accordion-header>
                    <wcs-accordion-content>Contenu du panneau</wcs-accordion-content>
                </wcs-accordion-panel>
            </div>
        `);

        await page.locator('wcs-accordion-panel').click();
        await page.waitForChanges();

        await expect(page).toHaveScreenshot('hide-action-text-false.png', { fullPage: true });
    });

    test('highlight', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 480px; padding: 24px;">
                <wcs-accordion-panel highlight>
                    <wcs-accordion-header>Panneau</wcs-accordion-header>
                    <wcs-accordion-content>Contenu du panneau</wcs-accordion-content>
                </wcs-accordion-panel>
            </div>
        `);

        await page.locator('wcs-accordion-panel').click();
        await page.waitForChanges();

        await expect(page).toHaveScreenshot('highlight.png', { fullPage: true });
    });
});
