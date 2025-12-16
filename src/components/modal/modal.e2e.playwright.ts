import { setWcsContent } from '../../utils/playwright/test';
import { test, E2EPage } from "@stencil/playwright";

import { expect } from "@playwright/test";

test.describe('modal', () => {
    test('should trap the focus inside', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-modal show-close-button>
                <wcs-input id="first-input" type="text"></wcs-input>
                <wcs-button id="last-button" disabled class="wcs-primary" type="button">Envoyer</wcs-button>
            </wcs-modal>
        `); // Modal is opened by default in this test

        const modal = page.locator('wcs-modal');
        await modal.evaluate((el: any) => el.show = true);

        const showCloseButton = page.locator('wcs-modal .wcs-modal-header wcs-button');
        const input = page.locator('wcs-modal wcs-input');
        const button = page.locator('wcs-modal wcs-button#last-button');

        // When / Then
        // Focus should be on close button initially
        await expect(showCloseButton).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(input).toBeFocused();

        await page.keyboard.press('Tab');
        // Focus should cycle back to close button since the button is disabled
        await expect(showCloseButton).toBeFocused();

        await page.keyboard.press('Tab'); // input receives the focus
        await expect(input).toBeFocused();

        // Enable the button and wait for focus trap to update
        await button.evaluate((el: any) => el.disabled = false);
        await page.waitForTimeout(300); // Wait for focus trap to recalculate focusable elements

        await page.keyboard.press('Tab');
        await expect(button).toBeFocused();
    });
});
