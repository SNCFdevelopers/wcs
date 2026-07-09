import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-alert · visual spec', () => {
    test('intent-success', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-alert intent="success" show>
                <span slot="title">Titre</span>
                <span slot="subtitle">Sous-titre</span>
            </wcs-alert>
        `);

        await expect(page).toHaveScreenshot('intent-success.png', { fullPage: true });
    });

    test('intent-information', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-alert intent="information" show>
                <span slot="title">Titre</span>
                <span slot="subtitle">Sous-titre</span>
            </wcs-alert>
        `);

        await expect(page).toHaveScreenshot('intent-information.png', { fullPage: true });
    });

    test('intent-error', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-alert intent="error" show>
                <span slot="title">Titre</span>
                <span slot="subtitle">Sous-titre</span>
            </wcs-alert>
        `);

        await expect(page).toHaveScreenshot('intent-error.png', { fullPage: true });
    });

    test('intent-warning', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-alert intent="warning" show>
                <span slot="title">Titre</span>
                <span slot="subtitle">Sous-titre</span>
            </wcs-alert>
        `);

        await expect(page).toHaveScreenshot('intent-warning.png', { fullPage: true });
    });

    test('show-progress-bar', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-alert show show-progress-bar>
                <span slot="title">Titre</span>
                <span slot="subtitle">Sous-titre</span>
            </wcs-alert>
        `);

        await expect(page).toHaveScreenshot('show-progress-bar.png', { fullPage: true });
    });
});
