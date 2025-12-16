import { setWcsContent } from '../../utils/playwright/test';
import { test, E2EPage } from "@stencil/playwright";

import { expect } from "@playwright/test";

test.describe('Switch component', () => {
    test.describe('Events', () => {
        test('should emit a wcsChange event when clicked on wcs-switch', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-switch name="switch-id">
                    Switch
                </wcs-switch>
            `);

            const switchElement = page.locator('wcs-switch');

            const changeSpy = await page.spyOnEvent('wcsChange');

            // When
            await switchElement.click();
            await page.waitForChanges();

            // Then
            expect(changeSpy).toHaveReceivedEventTimes(1);
            expect(changeSpy).toHaveReceivedEventDetail({ checked: true });
        });

        test('should emit a wcsChange event when space pressed on wcs-switch', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-switch name="switch-id">
                    Switch
                </wcs-switch>
            `);

            const switchElement = page.locator('wcs-switch');

            const changeSpy = await page.spyOnEvent('wcsChange');

            // When
            await switchElement.press('Space');
            await page.waitForChanges();

            // Then
            expect(changeSpy).toHaveReceivedEventTimes(1);
            expect(changeSpy).toHaveReceivedEventDetail({ checked: true });
        });
    });
});
