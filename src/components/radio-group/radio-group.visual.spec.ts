import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

const THREE_RADIOS = `
    <wcs-radio label="Option 1" value="1"></wcs-radio>
    <wcs-radio label="Option 2" value="2"></wcs-radio>
    <wcs-radio label="Option 3" value="3"></wcs-radio>
`;

const THREE_RADIOS_WITH_DISABLED = `
    <wcs-radio label="Option 1" value="1"></wcs-radio>
    <wcs-radio label="Option 2" value="2"></wcs-radio>
    <wcs-radio label="Option 3" value="3" disabled></wcs-radio>
`;

test.describe('wcs-radio-group · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 240px; padding: 16px;">
                <wcs-radio-group value="2">${THREE_RADIOS}</wcs-radio-group>
            </div>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('mode-option', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 240px; padding: 16px;">
                <wcs-radio-group mode="option" value="2">${THREE_RADIOS}</wcs-radio-group>
            </div>
        `);

        await expect(page).toHaveScreenshot('mode-option.png', { fullPage: true });
    });

    test('mode-horizontal', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 480px; padding: 16px;">
                <wcs-radio-group mode="horizontal" value="2">${THREE_RADIOS}</wcs-radio-group>
            </div>
        `);

        await expect(page).toHaveScreenshot('mode-horizontal.png', { fullPage: true });
    });

    test('with-disabled-radio', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 240px; padding: 16px;">
                <wcs-radio-group value="2">${THREE_RADIOS_WITH_DISABLED}</wcs-radio-group>
            </div>
        `);

        await expect(page).toHaveScreenshot('with-disabled-radio.png', { fullPage: true });
    });
});
