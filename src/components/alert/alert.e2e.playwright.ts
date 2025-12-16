import { setWcsContent } from '../../utils/playwright/test';
import { test, E2EPage } from "@stencil/playwright";
import { expect } from "@playwright/test";
const WAITING_DELAY_BEFORE_ASSERTIONS = 4_000;

test.describe('alert', () => {
    test('should display title and subtitle content', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-alert>
                <span slot="title">Test Title</span>
                <span slot="subtitle">Test Subtitle</span>
            </wcs-alert>
        `);

        // Then
        const title = page.locator('wcs-alert > [slot="title"]');
        const subtitle = page.locator('wcs-alert > [slot="subtitle"]');
        await expect(title).toHaveText('Test Title');
        await expect(subtitle).toHaveText('Test Subtitle');
    });

    test('should emit wcsAlertDismiss event when close button is clicked', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-alert>
                <span slot="title">Test Title</span>
                <span slot="subtitle">Test Subtitle</span>
            </wcs-alert>
        `);

        const alertDismissSpy = await page.spyOnEvent('wcsAlertDismiss');

        const alert = page.locator('wcs-alert');
        const closeButton = alert.locator('.close-button');

        // When
        await closeButton.click();
        await page.waitForChanges();

        // Then
        expect(alertDismissSpy).toHaveReceivedEventTimes(1);
        await expect(alert).toHaveJSProperty('show', false);
    });

    test('should auto-dismiss after timeout', async ({ page }: { page: E2EPage }) => {
        // Given
        const timeout = 500;
        await setWcsContent(page, `
            <wcs-alert timeout="${timeout}">
                <span slot="title">Test Title</span>
                <span slot="subtitle">Test Subtitle</span>
            </wcs-alert>
        `);

        const alertDismissSpy = await page.spyOnEvent('wcsAlertDismiss');

        const alert = page.locator('wcs-alert');

        // Wait longer than the specified timeout to account for processing time
        await page.waitForTimeout(timeout + WAITING_DELAY_BEFORE_ASSERTIONS);
        await page.waitForChanges();

        // Then
        expect(alertDismissSpy).toHaveReceivedEventTimes(1);
        await expect(alert).toHaveJSProperty('show', false);
    });

    test('should not auto-dismiss if timeout is 0', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-alert timeout="0">
                <span slot="title">Test Title</span>
                <span slot="subtitle">Test Subtitle</span>
            </wcs-alert>
        `);

        const alertDismissSpy = await page.spyOnEvent('wcsAlertDismiss');

        const alert = page.locator('wcs-alert');

        // Wait for some time to ensure the alert doesn't auto-dismiss
        await page.waitForTimeout(WAITING_DELAY_BEFORE_ASSERTIONS);
        await page.waitForChanges();

        // Then
        expect(alertDismissSpy).toHaveReceivedEventTimes(0);
        await expect(alert).toHaveJSProperty('show', true);
    });

    test('should display progress bar when showProgressBar is true', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-alert show-progress-bar>
                <span slot="title">Test Title</span>
                <span slot="subtitle">Test Subtitle</span>
            </wcs-alert>
        `);

        // Then
        const progressBar = page.locator('wcs-alert').locator('.progress-bar:not(.hidden)');
        await expect(progressBar).toBeVisible();
    });

    test('should not display progress bar when showProgressBar is false', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-alert>
                <span slot="title">Test Title</span>
                <span slot="subtitle">Test Subtitle</span>
            </wcs-alert>
        `);

        // Then
        const progressBar = page.locator('wcs-alert').locator('.progress-bar.hidden');
        await expect(progressBar).toHaveCount(1);
    });

    test('should not auto-dismiss when mouse is hovering', async ({ page }: { page: E2EPage }) => {
        // Given
        const timeout = 500;
        await setWcsContent(page, `
            <wcs-alert timeout="${timeout}">
                <span slot="title">Test Title</span>
                <span slot="subtitle">Test Subtitle</span>
            </wcs-alert>
        `);

        const alertDismissHover = await page.spyOnEvent('wcsAlertDismiss');

        const alert = page.locator('wcs-alert');

        await expect(alert).toHaveJSProperty('show', true);

        // Simulate mouse hover
        await alert.dispatchEvent('mouseover');

        // Wait longer than the component timeout
        await page.waitForTimeout(timeout + 500);
        await page.waitForChanges();

        // Then - The alert should still be visible while mouse is hovering
        expect(alertDismissHover).toHaveReceivedEventTimes(0);
        await expect(alert).toHaveJSProperty('show', true);

        // When - Mouse leaves using dispatchEvent
        await alert.dispatchEvent('mouseout');
        await page.waitForChanges();

        // Then - The alert should dismiss
        expect(alertDismissHover).toHaveReceivedEventTimes(1);
        await expect(alert).toHaveJSProperty('show', false);
    });
});
