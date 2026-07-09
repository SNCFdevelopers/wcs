import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-badge · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-badge>Badge text</wcs-badge>
            <wcs-badge class="wcs-primary">Primary</wcs-badge>
            <wcs-badge class="wcs-secondary">Secondary</wcs-badge>
            <wcs-badge class="wcs-success">Success</wcs-badge>
            <wcs-badge class="wcs-critical">Critical</wcs-badge>
            <wcs-badge class="wcs-warning">Warning</wcs-badge>
            <wcs-badge class="wcs-info">Info</wcs-badge>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('shape-rounded', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-badge shape="rounded">Badge text</wcs-badge>
            <wcs-badge shape="rounded" class="wcs-primary">Primary</wcs-badge>
            <wcs-badge shape="rounded" class="wcs-secondary">Secondary</wcs-badge>
            <wcs-badge shape="rounded" class="wcs-success">Success</wcs-badge>
            <wcs-badge shape="rounded" class="wcs-critical">Critical</wcs-badge>
            <wcs-badge shape="rounded" class="wcs-warning">Warning</wcs-badge>
            <wcs-badge shape="rounded" class="wcs-info">Info</wcs-badge>
        `);

        await expect(page).toHaveScreenshot('shape-rounded.png', { fullPage: true });
    });

    test('color-lighter', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-badge color="lighter">Badge text</wcs-badge>
            <wcs-badge color="lighter" class="wcs-primary">Primary</wcs-badge>
            <wcs-badge color="lighter" class="wcs-secondary">Secondary</wcs-badge>
            <wcs-badge color="lighter" class="wcs-success">Success</wcs-badge>
            <wcs-badge color="lighter" class="wcs-critical">Critical</wcs-badge>
            <wcs-badge color="lighter" class="wcs-warning">Warning</wcs-badge>
            <wcs-badge color="lighter" class="wcs-info">Info</wcs-badge>
        `);

        await expect(page).toHaveScreenshot('color-lighter.png', { fullPage: true });
    });

    test('size-s', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-badge size="s">Badge text</wcs-badge>
        `);

        await expect(page).toHaveScreenshot('size-s.png', { fullPage: true });
    });

    test('size-l', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-badge size="l">Badge text</wcs-badge>
        `);

        await expect(page).toHaveScreenshot('size-l.png', { fullPage: true });
    });
});
