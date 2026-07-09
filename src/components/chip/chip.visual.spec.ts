import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-chip · visual spec', () => {
    test('selectable-default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-chip mode="selectable" value="chip-1" label="Chip"></wcs-chip>
        `);

        await expect(page).toHaveScreenshot('selectable-default.png', { fullPage: true });
    });

    test('selectable-selected', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-chip mode="selectable" selected value="chip-1" label="Chip"></wcs-chip>
        `);

        await expect(page).toHaveScreenshot('selectable-selected.png', { fullPage: true });
    });

    test('selectable-disabled', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-chip mode="selectable" disabled value="chip-1" label="Chip"></wcs-chip>
        `);

        await expect(page).toHaveScreenshot('selectable-disabled.png', { fullPage: true });
    });

    test('dismissible-primary', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-chip mode="dismissible" variant="primary" value="chip-1" label="Chip"></wcs-chip>
        `);

        await expect(page).toHaveScreenshot('dismissible-primary.png', { fullPage: true });
    });

    test('dismissible-secondary', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-chip mode="dismissible" variant="secondary" value="chip-1" label="Chip"></wcs-chip>
        `);

        await expect(page).toHaveScreenshot('dismissible-secondary.png', { fullPage: true });
    });

    test('dismissible-disabled', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-chip mode="dismissible" disabled value="chip-1" label="Chip"></wcs-chip>
        `);

        await expect(page).toHaveScreenshot('dismissible-disabled.png', { fullPage: true });
    });
});
