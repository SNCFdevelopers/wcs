import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

const WRAPPER_STYLE = 'width: 320px; padding: 16px; background: #ffffff;';

test.describe('wcs-select-option · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="${WRAPPER_STYLE}">
                <wcs-select-option>Intitulé de l'option</wcs-select-option>
            </div>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('disabled', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="${WRAPPER_STYLE}">
                <wcs-select-option disabled>Intitulé de l'option</wcs-select-option>
            </div>
        `);

        await expect(page).toHaveScreenshot('disabled.png', { fullPage: true });
    });

    test('selected', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="${WRAPPER_STYLE}">
                <wcs-select-option selected>Intitulé de l'option</wcs-select-option>
            </div>
        `);

        await expect(page).toHaveScreenshot('selected.png', { fullPage: true });
    });

    test('selected-disabled', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="${WRAPPER_STYLE}">
                <wcs-select-option selected disabled>Intitulé de l'option</wcs-select-option>
            </div>
        `);

        await expect(page).toHaveScreenshot('selected-disabled.png', { fullPage: true });
    });

    test('multiple', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="${WRAPPER_STYLE}">
                <wcs-select-option multiple>Intitulé de l'option</wcs-select-option>
            </div>
        `);

        await expect(page).toHaveScreenshot('multiple.png', { fullPage: true });
    });

    test('multiple-selected', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="${WRAPPER_STYLE}">
                <wcs-select-option multiple selected>Intitulé de l'option</wcs-select-option>
            </div>
        `);

        await expect(page).toHaveScreenshot('multiple-selected.png', { fullPage: true });
    });

    test('multiple-selected-disabled', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="${WRAPPER_STYLE}">
                <wcs-select-option multiple selected disabled>Intitulé de l'option</wcs-select-option>
            </div>
        `);

        await expect(page).toHaveScreenshot('multiple-selected-disabled.png', { fullPage: true });
    });
});
