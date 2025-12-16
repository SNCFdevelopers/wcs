import { setWcsContent } from '../../utils/playwright/test';
import { test, E2EPage } from "@stencil/playwright";

import { expect } from "@playwright/test";

test.describe('button', () => {
    test('should trigger submit when in a form', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <form>
                <wcs-button class="wcs-primary" type="wcs-submit"></wcs-button>
            </form>
        `);
        const form = page.locator('form');
        await form.evaluate((el) => {
            el.addEventListener('submit', (e) => {
                e.preventDefault(); // avoid page reload
            });
        });

        const submitEventSpy = await form.spyOnEvent('submit');

        // When
        await page.locator('wcs-button').click();
        await page.waitForChanges();

        // Then
        expect(submitEventSpy).toHaveReceivedEventTimes(1);
    });
});
