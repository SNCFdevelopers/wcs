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

    test('Should place required marker right after last word when label wraps', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-form-field style="width: 180px">
                <wcs-label>
                    This label is long enough to wrap on multiple lines and end with
                    <span id="last-word">word</span>
                </wcs-label>
                <wcs-input required></wcs-input>
            </wcs-form-field>
        `);

        const lastWord = page.locator('#last-word');
        const requiredMarker = page.locator('.required-marker');

        // Then
        await expect(requiredMarker).toBeVisible();

        const lastWordBox = await lastWord.boundingBox();
        const requiredMarkerBox = await requiredMarker.boundingBox();

        const horizontalGap = requiredMarkerBox.x - (lastWordBox.x + lastWordBox.width);
        expect(horizontalGap).toBeGreaterThanOrEqual(0);
        expect(horizontalGap).toBeLessThanOrEqual(8 + 2); // assuming a gap of Xpx plus some tolerance

        expect(Math.abs((lastWordBox.y + lastWordBox.height) - (requiredMarkerBox.y + requiredMarkerBox.height))).toBeLessThanOrEqual(2);
    });

    test('Should keep same height with and without required marker', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-form-field id="form-field-with-required">
                <wcs-label>Enter your name</wcs-label>
                <wcs-input required placeholder="John Doe"></wcs-input>
            </wcs-form-field>

            <wcs-form-field id="form-field-without-required">
                <wcs-label>Enter your name</wcs-label>
                <wcs-input placeholder="John Doe"></wcs-input>
            </wcs-form-field>
        `);
        const formFieldWithRequired = page.locator('#form-field-with-required');
        const formFieldWithoutRequired = page.locator('#form-field-without-required');

        // Then
        const formFieldBoundingBoxWithRequired = await formFieldWithRequired.boundingBox();
        const formFieldBoundingBoxWithoutRequired = await formFieldWithoutRequired.boundingBox();
        expect(formFieldBoundingBoxWithRequired.height).toEqual(formFieldBoundingBoxWithoutRequired.height);
    });

    test('Should well update of the required marker when property required is toggled', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-form-field>
                <wcs-label id="label">
                    This label is long enough to wrap on multiple lines and end with
                    <span id="last-word">word</span>
                </wcs-label>
                <wcs-input required></wcs-input>
            </wcs-form-field>
        `);

        const wcsInput = page.locator('wcs-input');
        const requiredMarker = page.locator('.required-marker');

        // Then
        await expect(requiredMarker).toBeVisible();

        // When
        await wcsInput.evaluate((el: any) => el.required = false);

        // Then
        expect(requiredMarker).toHaveCount(0);
    });
});
