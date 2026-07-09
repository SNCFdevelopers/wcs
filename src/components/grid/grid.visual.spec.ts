import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

const COLUMNS = `
    <wcs-grid-column path="name" name="Name"></wcs-grid-column>
    <wcs-grid-column path="city" name="City"></wcs-grid-column>
`;

test.describe('wcs-grid · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-grid>${COLUMNS}</wcs-grid>
        `);

        await page.locator('wcs-grid').evaluate((el: any) => {
            el.data = [{ name: 'Alice', city: 'Paris' }, { name: 'Bob', city: 'Lyon' }, { name: 'Carla', city: 'Nantes' }];
        });
        await page.waitForChanges();

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('loading', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-grid loading>${COLUMNS}</wcs-grid>
        `);

        await page.locator('wcs-grid').evaluate((el: any) => {
            el.data = [{ name: 'Alice', city: 'Paris' }, { name: 'Bob', city: 'Lyon' }, { name: 'Carla', city: 'Nantes' }];
        });
        await page.waitForChanges();

        await expect(page).toHaveScreenshot('loading.png', { fullPage: true });
    });

    test('selection-multiple', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-grid selection-config="multiple">${COLUMNS}</wcs-grid>
        `);

        await page.locator('wcs-grid').evaluate((el: any) => {
            el.data = [{ name: 'Alice', city: 'Paris' }, { name: 'Bob', city: 'Lyon' }, { name: 'Carla', city: 'Nantes' }];
        });
        await page.waitForChanges();

        await page.locator('wcs-grid').locator('wcs-checkbox[part="row-checkbox"]').first().click();
        await page.waitForChanges();

        await expect(page).toHaveScreenshot('selection-multiple.png', { fullPage: true });
    });
});
