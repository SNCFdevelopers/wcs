import { setWcsContent } from '../../utils/playwright/test';
import { test, E2EPage } from "@stencil/playwright";

import { expect } from "@playwright/test";

test.describe('Checkbox component', () => {
    test.describe('Events', () => {
        test('should emit a wcsChange event when clicked on wcs-checkbox', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-checkbox name="checkbox-id">
                    Checkbox
                </wcs-checkbox>
            `);

            const checkbox = page.locator('wcs-checkbox');
            const wcsChangeEventSpy = await checkbox.spyOnEvent('wcsChange');

            // When
            await checkbox.click();
            await page.waitForChanges();

            // Then
            expect(wcsChangeEventSpy).toHaveReceivedEventTimes(1);
            expect(wcsChangeEventSpy).toHaveReceivedEventDetail({ checked: true });
        });

        test('should emit a wcsChange event when space pressed on wcs-checkbox', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-checkbox name="checkbox-id">
                    Checkbox
                </wcs-checkbox>
            `);

            const checkbox = page.locator('wcs-checkbox');
            const wcsChangeEventSpy = await checkbox.spyOnEvent('wcsChange');

            // When
            await checkbox.press('Space');

            // Then
            expect(wcsChangeEventSpy).toHaveReceivedEventTimes(1);
            expect(wcsChangeEventSpy).toHaveReceivedEventDetail({ checked: true });
        });
    });
});
