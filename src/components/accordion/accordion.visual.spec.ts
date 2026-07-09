import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

const THREE_PANELS = `
    <wcs-accordion-panel>
        <wcs-accordion-header>Panneau 1</wcs-accordion-header>
        <wcs-accordion-content>Contenu du panneau 1</wcs-accordion-content>
    </wcs-accordion-panel>
    <wcs-accordion-panel>
        <wcs-accordion-header>Panneau 2</wcs-accordion-header>
        <wcs-accordion-content>Contenu du panneau 2</wcs-accordion-content>
    </wcs-accordion-panel>
    <wcs-accordion-panel>
        <wcs-accordion-header>Panneau 3</wcs-accordion-header>
        <wcs-accordion-content>Contenu du panneau 3</wcs-accordion-content>
    </wcs-accordion-panel>
`;

test.describe('wcs-accordion · visual spec', () => {
    test('default-closed', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 480px; padding: 24px;">
                <wcs-accordion>${THREE_PANELS}</wcs-accordion>
            </div>
        `);

        await expect(page).toHaveScreenshot('default-closed.png', { fullPage: true });
    });

    test('first-panel-open', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 480px; padding: 24px;">
                <wcs-accordion>${THREE_PANELS}</wcs-accordion>
            </div>
        `);

        await page.locator('wcs-accordion-panel').first().click();
        await page.waitForChanges();

        await expect(page).toHaveScreenshot('first-panel-open.png', { fullPage: true });
    });

    test('hide-action-text-false', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 480px; padding: 24px;">
                <wcs-accordion hide-action-text="false">${THREE_PANELS}</wcs-accordion>
            </div>
        `);

        await page.locator('wcs-accordion-panel').first().click();
        await page.waitForChanges();

        await expect(page).toHaveScreenshot('hide-action-text-false.png', { fullPage: true });
    });

    test('highlight', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 480px; padding: 24px;">
                <wcs-accordion highlight>${THREE_PANELS}</wcs-accordion>
            </div>
        `);

        await page.locator('wcs-accordion-panel').first().click();
        await page.waitForChanges();

        await expect(page).toHaveScreenshot('highlight.png', { fullPage: true });
    });

    test('multi-expandable-all-open', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 480px; padding: 24px;">
                <wcs-accordion multi-expandable>${THREE_PANELS}</wcs-accordion>
            </div>
        `);

        const panels = page.locator('wcs-accordion-panel');
        const count = await panels.count();
        for (let i = 0; i < count; i++) {
            await panels.nth(i).click();
            await page.waitForChanges();
        }

        await expect(page).toHaveScreenshot('multi-expandable-all-open.png', { fullPage: true });
    });

    test('single-expandable-keeps-last-open', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 480px; padding: 24px;">
                <wcs-accordion>${THREE_PANELS}</wcs-accordion>
            </div>
        `);

        const panels = page.locator('wcs-accordion-panel');
        const count = await panels.count();
        for (let i = 0; i < count; i++) {
            await panels.nth(i).click();
            await page.waitForChanges();
        }

        await expect(page).toHaveScreenshot('single-expandable-keeps-last-open.png', { fullPage: true });
    });
});
