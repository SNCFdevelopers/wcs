import { setWcsContent } from '../../utils/playwright/test';
import { test, E2EPage } from "@stencil/playwright";

import { expect } from "@playwright/test";

test.describe('Label component', () => {
    test('Should wrap text correctly', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-label>Label loooooooooooooooooooooooooooooooooong text</wcs-label>
        `);
        page.setViewportSize({ width: 300, height: 300 });

        const label = page.locator('label');

        // Then
        const box = await label.boundingBox();
        expect(box.height).toBeGreaterThan(0);
        // Assuming that the line height is around 20px, if the text is wrapped, the height should be greater than 20px
        expect(box.height).toBeGreaterThan(20);
    });

    test('Should keep same height with and without icon', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-form-field id="form-field-with-icon">
                <wcs-label>
                    Enter your name
                    <wcs-mat-icon id="icon-help" icon="help" family="filled" size="s"></wcs-mat-icon>
                </wcs-label>
                <wcs-input placeholder="John Doe"></wcs-input>
            </wcs-form-field>

            <wcs-form-field id="form-field-without-icon">
                <wcs-label>Enter your name</wcs-label>
                <wcs-input placeholder="John Doe"></wcs-input>
            </wcs-form-field>
        `);
        const formFieldWithIcon = page.locator('#form-field-with-icon');
        const formFieldWithoutIcon = page.locator('#form-field-without-icon');

        // Then
        const formFieldBoundingBoxWithIcon = await formFieldWithIcon.boundingBox();
        const formFieldBoundingBoxWithoutIcon = await formFieldWithoutIcon.boundingBox();
        expect(formFieldBoundingBoxWithIcon.height).toEqual(formFieldBoundingBoxWithoutIcon.height);
    });
});