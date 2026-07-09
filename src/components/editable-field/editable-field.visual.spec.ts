import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-editable-field · visual spec', () => {
    test('type-input', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-editable-field label="Name" value="John" type="input">
                <wcs-input></wcs-input>
            </wcs-editable-field>
        `);

        await expect(page).toHaveScreenshot('type-input.png', { fullPage: true });
    });

    test('type-textarea', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-editable-field label="Description" type="textarea" value="Some text">
                <wcs-textarea></wcs-textarea>
            </wcs-editable-field>
        `);

        await expect(page).toHaveScreenshot('type-textarea.png', { fullPage: true });
    });

    test('type-select', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-editable-field label="Choice" type="select" value="a">
                <wcs-select>
                    <wcs-select-option value="a">Option A</wcs-select-option>
                    <wcs-select-option value="b">Option B</wcs-select-option>
                </wcs-select>
            </wcs-editable-field>
        `);

        await expect(page).toHaveScreenshot('type-select.png', { fullPage: true });
    });

    test('readonly', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-editable-field label="Name" value="John" readonly>
                <wcs-input></wcs-input>
            </wcs-editable-field>
        `);

        await expect(page).toHaveScreenshot('readonly.png', { fullPage: true });
    });

    test('size-l', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-editable-field label="Name" value="John" size="l">
                <wcs-input></wcs-input>
            </wcs-editable-field>
        `);

        await expect(page).toHaveScreenshot('size-l.png', { fullPage: true });
    });
});
