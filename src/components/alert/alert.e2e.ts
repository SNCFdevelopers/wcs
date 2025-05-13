import { newE2EPage } from '@stencil/core/testing';
import { setWcsContent } from '../../utils/tests';

const WAITING_DELAY_BEFORE_ASSERTIONS = 1_000;

describe('alert', () => {
    it('should display title and subtitle content', async () => {
        // Given
        const page = await newE2EPage();
        await setWcsContent(page, `
            <wcs-alert>
                <span slot="title">Test Title</span>
                <span slot="subtitle">Test Subtitle</span>
            </wcs-alert>
        `);

        // Then
        const title = await page.find('wcs-alert > [slot="title"]');
        const subtitle = await page.find('wcs-alert > [slot="subtitle"]');
        expect(title.textContent).toBe('Test Title');
        expect(subtitle.textContent).toBe('Test Subtitle');
        // We don't use isVisible() because the item is still in the user DOM and the slot style don't seem to be taken
        // into account with the isVisible() method
    });

    it('should emit wcsAlertDismiss event when close button is clicked', async () => {
        // Given
        const page = await newE2EPage();
        await setWcsContent(page, `
            <wcs-alert>
                <span slot="title">Test Title</span>
                <span slot="subtitle">Test Subtitle</span>
            </wcs-alert>
        `);
        const alert = await page.find('wcs-alert');
        const alertDismiss = await alert.spyOnEvent('wcsAlertDismiss');
        const closeButton = await page.find('wcs-alert >>> .close-button');

        // When
        await closeButton.click();
        await page.waitForChanges();

        // Then
        expect(alertDismiss).toHaveReceivedEventTimes(1);
        expect(await alert.getProperty('show')).toBe(false);
    });

    it('should auto-dismiss after timeout', async () => {
        // Given
        const timeout = 500;
        const page = await newE2EPage();
        await setWcsContent(page, `
            <wcs-alert timeout="${timeout}">
                <span slot="title">Test Title</span>
                <span slot="subtitle">Test Subtitle</span>
            </wcs-alert>
        `);
        const alert = await page.find('wcs-alert');
        const alertDismiss = await alert.spyOnEvent('wcsAlertDismiss');

        // Wait longer than the specified timeout to account for processing time
        await new Promise(resolve => setTimeout(resolve, timeout + WAITING_DELAY_BEFORE_ASSERTIONS));
        await page.waitForChanges();

        // Then
        expect(alertDismiss).toHaveReceivedEventTimes(1);
        expect(await alert.getProperty('show')).toBe(false);
    });

    it('should not auto-dismiss if timeout is 0', async () => {
        // Given
        const page = await newE2EPage();
        await setWcsContent(page, `
            <wcs-alert timeout="0">
                <span slot="title">Test Title</span>
                <span slot="subtitle">Test Subtitle</span>
            </wcs-alert>
        `);
        const alert = await page.find('wcs-alert');
        const alertDismiss = await alert.spyOnEvent('wcsAlertDismiss');

        // Wait for some time to ensure the alert doesn't auto-dismiss
        await new Promise(resolve => setTimeout(resolve, WAITING_DELAY_BEFORE_ASSERTIONS));
        await page.waitForChanges();

        // Then
        expect(alertDismiss).toHaveReceivedEventTimes(0)
        expect(await alert.getProperty('show')).toBe(true);
    });

    it('should display progress bar when showProgressBar is true', async () => {
        // Given
        const page = await newE2EPage();
        await setWcsContent(page, `
            <wcs-alert show-progress-bar>
                <span slot="title">Test Title</span>
                <span slot="subtitle">Test Subtitle</span>
            </wcs-alert>
        `);

        // Then
        const progressBar = await page.find('wcs-alert >>> .progress-bar:not(.hidden)');
        expect(progressBar).not.toBeNull();
    });

    it('should not display progress bar when showProgressBar is false', async () => {
        // Given
        const page = await newE2EPage();
        await setWcsContent(page, `
            <wcs-alert>
                <span slot="title">Test Title</span>
                <span slot="subtitle">Test Subtitle</span>
            </wcs-alert>
        `);

        // Then
        const progressBar = await page.find('wcs-alert >>> .progress-bar.hidden');
        expect(progressBar).not.toBeNull();
    });

    it('should not auto-dismiss when mouse is hovering', async () => {
        // Given
        const timeout = 500;
        const page = await newE2EPage();
        await setWcsContent(page, `
            <wcs-alert timeout="${timeout}">
                <span slot="title">Test Title</span>
                <span slot="subtitle">Test Subtitle</span>
            </wcs-alert>
        `);
        const alert = await page.find('wcs-alert');

        // Simulate mouse hover
        await alert.triggerEvent('mouseover');
        await page.waitForChanges();
        const alertDismiss = await alert.spyOnEvent('wcsAlertDismiss');

        // Wait longer than the component timeout
        await new Promise(resolve => setTimeout(resolve, timeout + WAITING_DELAY_BEFORE_ASSERTIONS));
        await page.waitForChanges();

        // Then - The alert should still be visible while mouse is hovering
        expect(alertDismiss).not.toHaveReceivedEvent();
        expect(await alert.getProperty('show')).toBe(true);

        // When - Mouse leaves
        await alert.triggerEvent('mouseout');
        await page.waitForChanges();

        // Wait for the dismiss to happen after mouseout
        await new Promise(resolve => setTimeout(resolve, WAITING_DELAY_BEFORE_ASSERTIONS));
        await page.waitForChanges();

        // Then - The alert should dismiss
        expect(alertDismiss).toHaveReceivedEventTimes(1);
        expect(await alert.getProperty('show')).toBe(false);
    });
});
