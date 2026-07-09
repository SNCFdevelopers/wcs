import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-input · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-input placeholder="Enter text"></wcs-input>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('state-error', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-input state="error" value="invalid"></wcs-input>
        `);

        await expect(page).toHaveScreenshot('state-error.png', { fullPage: true });
    });

    test('disabled', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-input disabled value="Disabled"></wcs-input>
        `);

        await expect(page).toHaveScreenshot('disabled.png', { fullPage: true });
    });

    test('readonly', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-input readonly value="Readonly"></wcs-input>
        `);

        await expect(page).toHaveScreenshot('readonly.png', { fullPage: true });
    });

    test('size-s', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-input size="s"></wcs-input>
        `);

        await expect(page).toHaveScreenshot('size-s.png', { fullPage: true });
    });

    test('size-l', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-input size="l"></wcs-input>
        `);

        await expect(page).toHaveScreenshot('size-l.png', { fullPage: true });
    });

    test('type-password', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-input type="password" value="secret"></wcs-input>
        `);

        await expect(page).toHaveScreenshot('type-password.png', { fullPage: true });
    });

    test('with-icon', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-input icon="search"></wcs-input>
        `);

        await expect(page).toHaveScreenshot('with-icon.png', { fullPage: true });
    });

    test('with-prefix-suffix', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-input prefix-label="€" suffix-label="/mois"></wcs-input>
        `);

        await expect(page).toHaveScreenshot('with-prefix-suffix.png', { fullPage: true });
    });
});
