import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-tooltip · visual spec', () => {
    test('position-top', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <span id="tooltiped">Survolez-moi</span>
            <wcs-tooltip for="tooltiped" position="top">Texte du tooltip</wcs-tooltip>
        `);

        await page.locator('#tooltiped').hover();
        await page.waitForSelector('.tippy-box', { state: 'visible', timeout: 5000 });

        await expect(page).toHaveScreenshot('position-top.png', { fullPage: true });
    });

    test('position-bottom', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <span id="tooltiped">Survolez-moi</span>
            <wcs-tooltip for="tooltiped" position="bottom">Texte du tooltip</wcs-tooltip>
        `);

        await page.locator('#tooltiped').hover();
        await page.waitForSelector('.tippy-box', { state: 'visible', timeout: 5000 });

        await expect(page).toHaveScreenshot('position-bottom.png', { fullPage: true });
    });

    test('position-right', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <span id="tooltiped">Survolez-moi</span>
            <wcs-tooltip for="tooltiped" position="right">Texte du tooltip</wcs-tooltip>
        `);

        await page.locator('#tooltiped').hover();
        await page.waitForSelector('.tippy-box', { state: 'visible', timeout: 5000 });

        await expect(page).toHaveScreenshot('position-right.png', { fullPage: true });
    });

    test('position-left', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <span id="tooltiped">Survolez-moi</span>
            <wcs-tooltip for="tooltiped" position="left">Texte du tooltip</wcs-tooltip>
        `);

        await page.locator('#tooltiped').hover();
        await page.waitForSelector('.tippy-box', { state: 'visible', timeout: 5000 });

        await expect(page).toHaveScreenshot('position-left.png', { fullPage: true });
    });
});
