import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

const DEFAULT_SLOT = `
    <span slot="title">Titre</span>
    <span slot="subtitle">Sous-titre</span>
`;

test.describe('wcs-message · visual spec', () => {
    test('intent-information', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-message>${DEFAULT_SLOT}</wcs-message>
        `);

        await expect(page).toHaveScreenshot('intent-information.png', { fullPage: true });
    });

    test('intent-success', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-message intent="success">${DEFAULT_SLOT}</wcs-message>
        `);

        await expect(page).toHaveScreenshot('intent-success.png', { fullPage: true });
    });

    test('intent-warning', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-message intent="warning">${DEFAULT_SLOT}</wcs-message>
        `);

        await expect(page).toHaveScreenshot('intent-warning.png', { fullPage: true });
    });

    test('intent-error', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-message intent="error">${DEFAULT_SLOT}</wcs-message>
        `);

        await expect(page).toHaveScreenshot('intent-error.png', { fullPage: true });
    });

    test('background-lighter', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-message background="lighter">${DEFAULT_SLOT}</wcs-message>
        `);

        await expect(page).toHaveScreenshot('background-lighter.png', { fullPage: true });
    });

    test('show-border', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-message show-border>${DEFAULT_SLOT}</wcs-message>
        `);

        await expect(page).toHaveScreenshot('show-border.png', { fullPage: true });
    });

    test('show-close-button', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-message show-close-button>${DEFAULT_SLOT}</wcs-message>
        `);

        await expect(page).toHaveScreenshot('show-close-button.png', { fullPage: true });
    });
});
