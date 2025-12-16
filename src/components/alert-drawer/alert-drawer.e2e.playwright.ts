import { setWcsContent } from '../../utils/playwright/test';
import { test, E2EPage } from "@stencil/playwright";
import { expect } from "@playwright/test";
const WAITING_DELAY_BEFORE_ASSERTIONS = 1_000;

test.describe('alert-drawer', () => {
    test('should show an alert when using show() method', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-alert-drawer position="bottom-right"></wcs-alert-drawer>
        `);

        const alertDrawer = page.locator('wcs-alert-drawer');

        // When
        await alertDrawer.evaluate((el: any) => el.show({
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            intent: 'success',
            showProgressBar: false,
            timeout: 0
        }));
        await page.waitForChanges();

        // Then
        const alert = alertDrawer.locator('wcs-alert');
        await expect(alert).toHaveCount(1);

        const title = alertDrawer.locator('wcs-alert > [slot="title"]');
        const subtitle = alertDrawer.locator('wcs-alert > [slot="subtitle"]');
        await expect(title).toHaveText('Test Title');
        await expect(subtitle).toHaveText('Test Subtitle');
    });

    test('should close the alert after timeout', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-alert-drawer></wcs-alert-drawer>
        `);

        const alertDrawer = page.locator('wcs-alert-drawer');

        // When
        await alertDrawer.evaluate((el: any) => el.show({
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            intent: 'success',
            showProgressBar: false,
            timeout: 100 // Short timeout for testing
        }));

        // Wait for the alert to be removed
        await page.waitForTimeout(WAITING_DELAY_BEFORE_ASSERTIONS); // Wait a bit longer than the timeout
        await page.waitForChanges();

        // Then
        const alert = alertDrawer.locator('wcs-alert');
        await expect(alert).toHaveCount(0);
    });

    test('should show progress bar when showProgressBar is true', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-alert-drawer></wcs-alert-drawer>
        `);

        const alertDrawer = page.locator('wcs-alert-drawer');

        // When
        await alertDrawer.evaluate((el: any) => el.show({
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            intent: 'success',
            showProgressBar: true,
            timeout: 5000
        }));
        await page.waitForChanges();

        // Then
        const progressBar = alertDrawer.locator('wcs-alert').locator('.progress-bar');
        await expect(progressBar).toBeVisible();
    });

    test('should have correct ARIA attributes for accessibility', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-alert-drawer></wcs-alert-drawer>
        `);

        const alertDrawer = page.locator('wcs-alert-drawer');

        // Then
        await expect(alertDrawer).toHaveAttribute('role', 'region');
        await expect(alertDrawer).toHaveAttribute('aria-live', 'polite');
        await expect(alertDrawer).toHaveAttribute('aria-atomic', 'true');
    });

    test('should handle multiple alerts', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-alert-drawer></wcs-alert-drawer>
        `);

        const alertDrawer = page.locator('wcs-alert-drawer');

        // When
        await alertDrawer.evaluate((el: any) => el.show({
            title: 'First Alert',
            subtitle: 'First Subtitle',
            intent: 'success',
            showProgressBar: false,
            timeout: 0
        }));
        await alertDrawer.evaluate((el: any) => el.show({
            title: 'Second Alert',
            subtitle: 'Second Subtitle',
            intent: 'warning',
            showProgressBar: false,
            timeout: 0
        }));
        await page.waitForChanges();

        // Then
        const alerts = alertDrawer.locator('wcs-alert');
        await expect(alerts).toHaveCount(2);
    });
});
