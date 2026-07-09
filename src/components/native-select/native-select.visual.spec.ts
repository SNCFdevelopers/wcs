import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

const THREE_OPTIONS = `
    <select>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
    </select>
`;

test.describe('wcs-native-select · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-native-select>${THREE_OPTIONS}</wcs-native-select>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('size-l', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-native-select size="l">${THREE_OPTIONS}</wcs-native-select>
        `);

        await expect(page).toHaveScreenshot('size-l.png', { fullPage: true });
    });

    test('required', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-native-select required>${THREE_OPTIONS}</wcs-native-select>
        `);

        await expect(page).toHaveScreenshot('required.png', { fullPage: true });
    });

    test('disabled', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-native-select>
                <select disabled>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                </select>
            </wcs-native-select>
        `);

        await expect(page).toHaveScreenshot('disabled.png', { fullPage: true });
    });
});
