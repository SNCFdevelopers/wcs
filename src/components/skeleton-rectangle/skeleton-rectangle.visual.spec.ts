import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-skeleton-rectangle · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-skeleton-rectangle height="120px" width="240px"></wcs-skeleton-rectangle>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('rounded', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-skeleton-rectangle height="120px" width="240px" rounded></wcs-skeleton-rectangle>
        `);

        await expect(page).toHaveScreenshot('rounded.png', { fullPage: true });
    });

    test('animation-pulse', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-skeleton-rectangle height="120px" width="240px" animation="pulse"></wcs-skeleton-rectangle>
        `);

        await expect(page).toHaveScreenshot('animation-pulse.png', { fullPage: true });
    });
});
