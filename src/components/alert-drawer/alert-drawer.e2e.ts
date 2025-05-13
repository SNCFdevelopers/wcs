import { newE2EPage } from '@stencil/core/testing';
import { setWcsContent } from '../../utils/tests';

const WAITING_DELAY_BEFORE_ASSERTIONS = 1_000;

describe('alert-drawer', () => {
    it('should show an alert when using show() method', async () => {
        // Given
        const page = await newE2EPage();
        await setWcsContent(page, `
            <wcs-alert-drawer position="bottom-right"></wcs-alert-drawer>
        `);
        const alertDrawer = await page.find('wcs-alert-drawer');

        // When
        await alertDrawer.callMethod('show', {
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            intent: 'success',
            showProgressBar: false,
            timeout: 0
        });
        await page.waitForChanges();

        // Then
        const alert = await page.find('wcs-alert-drawer >>> wcs-alert');
        expect(alert).not.toBeNull();
        const title = await page.find('wcs-alert-drawer >>> wcs-alert > [slot="title"]');
        const subtitle = await page.find('wcs-alert-drawer >>> wcs-alert > [slot="subtitle"]');
        expect(title.textContent).toBe('Test Title');
        expect(subtitle.textContent).toBe('Test Subtitle');
    });

    it('should close the alert after timeout', async () => {
        // Given
        const page = await newE2EPage();
        await setWcsContent(page, `
            <wcs-alert-drawer></wcs-alert-drawer>
        `);
        const alertDrawer = await page.find('wcs-alert-drawer');

        // When
        await alertDrawer.callMethod('show', {
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            intent: 'success',
            showProgressBar: false,
            timeout: 100 // Short timeout for testing
        });
        await page.waitForChanges();

        // Wait for the alert to be removed
        await new Promise(resolve => setTimeout(resolve, WAITING_DELAY_BEFORE_ASSERTIONS)); // Wait a bit longer than the timeout

        // Then
        const alert = await page.find('wcs-alert-drawer >>> wcs-alert');
        expect(alert).toBeNull();
    });

    it('should show progress bar when showProgressBar is true', async () => {
        // Given
        const page = await newE2EPage();
        await setWcsContent(page, `
            <wcs-alert-drawer></wcs-alert-drawer>
        `);
        const alertDrawer = await page.find('wcs-alert-drawer');

        // When
        await alertDrawer.callMethod('show', {
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            intent: 'success',
            showProgressBar: true,
            timeout: 5000
        });
        await page.waitForChanges();

        // Then
        const progressBar = await page.find('wcs-alert-drawer >>> wcs-alert >>> .progress-bar');
        expect(progressBar).not.toBeNull();
    });

    it('should have correct ARIA attributes for accessibility', async () => {
        // Given
        const page = await newE2EPage();
        await setWcsContent(page, `
            <wcs-alert-drawer></wcs-alert-drawer>
        `);
        const alertDrawer = await page.find('wcs-alert-drawer');

        // Then
        expect(alertDrawer.getAttribute('role')).toBe('region');
        expect(alertDrawer.getAttribute('aria-live')).toBe('polite');
        expect(alertDrawer.getAttribute('aria-atomic')).toBe('true');
    });

    it('should handle multiple alerts', async () => {
        // Given
        const page = await newE2EPage();
        await setWcsContent(page, `
            <wcs-alert-drawer></wcs-alert-drawer>
        `);
        const alertDrawer = await page.find('wcs-alert-drawer');

        // When
        await alertDrawer.callMethod('show', {
            title: 'First Alert',
            subtitle: 'First Subtitle',
            intent: 'success',
            showProgressBar: false,
            timeout: 0
        });
        await alertDrawer.callMethod('show', {
            title: 'Second Alert',
            subtitle: 'Second Subtitle',
            intent: 'warning',
            showProgressBar: false,
            timeout: 0
        });
        await page.waitForChanges();

        // Then
        const alerts = await page.findAll('wcs-alert-drawer >>> wcs-alert');
        expect(alerts.length).toBe(2);
    });
});
