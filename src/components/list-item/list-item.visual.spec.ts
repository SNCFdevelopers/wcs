import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

const DEFAULT_SLOT = `
    <span slot="title">Titre</span>
    <span slot="description">Description</span>
    <wcs-list-item-properties slot="properties">
        <wcs-list-item-property slot="property">Propriété 1</wcs-list-item-property>
    </wcs-list-item-properties>
    <wcs-button slot="actions">Action</wcs-button>
`;

test.describe('wcs-list-item · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-list-item>${DEFAULT_SLOT}</wcs-list-item>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('activated', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-list-item activated>${DEFAULT_SLOT}</wcs-list-item>
        `);

        await expect(page).toHaveScreenshot('activated.png', { fullPage: true });
    });
});
