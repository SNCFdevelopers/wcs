import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

const THREE_OPTIONS = `
    <wcs-select-option value="option-1">Option 1</wcs-select-option>
    <wcs-select-option value="option-2">Option 2</wcs-select-option>
    <wcs-select-option value="option-3">Option 3</wcs-select-option>
`;

test.describe('wcs-select · visual spec', () => {
    test('default-closed', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 320px; padding: 16px;">
                <wcs-select>${THREE_OPTIONS}</wcs-select>
            </div>
        `);

        await expect(page).toHaveScreenshot('default-closed.png', { fullPage: true });
    });

    test('open', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 320px; padding: 16px;">
                <wcs-select>${THREE_OPTIONS}</wcs-select>
            </div>
        `);

        await page.locator('wcs-select').click();
        await page.waitForChanges();

        await expect(page).toHaveScreenshot('open.png', { fullPage: true });
    });

    test('disabled', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 320px; padding: 16px;">
                <wcs-select disabled>${THREE_OPTIONS}</wcs-select>
            </div>
        `);

        await expect(page).toHaveScreenshot('disabled.png', { fullPage: true });
    });

    test('with-value-selected', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 320px; padding: 16px;">
                <wcs-select value="option-2">${THREE_OPTIONS}</wcs-select>
            </div>
        `);

        await expect(page).toHaveScreenshot('with-value-selected.png', { fullPage: true });
    });

    test('multiple', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 320px; padding: 16px;">
                <wcs-select multiple>${THREE_OPTIONS}</wcs-select>
            </div>
        `);

        await expect(page).toHaveScreenshot('multiple.png', { fullPage: true });
    });

    test('autocomplete', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 320px; padding: 16px;">
                <wcs-select autocomplete>${THREE_OPTIONS}</wcs-select>
            </div>
        `);

        await expect(page).toHaveScreenshot('autocomplete.png', { fullPage: true });
    });

    test('size-l', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 320px; padding: 16px;">
                <wcs-select size="l">${THREE_OPTIONS}</wcs-select>
            </div>
        `);

        await expect(page).toHaveScreenshot('size-l.png', { fullPage: true });
    });
});
