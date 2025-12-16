import { setWcsContent } from '../../utils/playwright/test';
import { test, E2EPage } from "@stencil/playwright";

import { expect } from "@playwright/test";

test.describe('counter', () => {
    test('should increment the counter when click on plus button', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-counter></wcs-counter>
        `);

        const changeSpy = await page.locator('wcs-counter').spyOnEvent('wcsChange');

        const incrementButton = page.locator('wcs-counter wcs-button').last();

        // When
        await incrementButton.click();
        await page.waitForChanges();

        // Then
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(changeSpy).toHaveReceivedEventDetail({ value: 1 });
    });

    test('should decrement the counter when click on minus button', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-counter></wcs-counter>
        `);

        const changeSpy = await page.locator('wcs-counter').spyOnEvent('wcsChange');

        const decrementButton = page.locator('wcs-counter wcs-button').first();

        // When
        await decrementButton.click();
        await page.waitForChanges();

        // Then
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(changeSpy).toHaveReceivedEventDetail({ value: -1 });
    });

    test('should have 0 as default value', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-counter></wcs-counter>
        `);

        const currentDisplayedValue = page.locator('wcs-counter .current-value');

        // Then
        await expect(currentDisplayedValue).toHaveText('0');
    });

    test('should respect the step attribute', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-counter step="5"></wcs-counter>
        `);

        const changeSpy = await page.locator('wcs-counter').spyOnEvent('wcsChange');

        const incrementButton = page.locator('wcs-counter wcs-button').last();

        // When
        await incrementButton.click();
        await page.waitForChanges();

        // Then
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(changeSpy).toHaveReceivedEventDetail({ value: 5 });
    });

    test('should respect the min attribute', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-counter min="-1" value="0"></wcs-counter>
        `);

        const changeSpy = await page.spyOnEvent('wcsChange');

        const decrementButton = page.locator('wcs-counter wcs-button').first();

        // When
        await decrementButton.click();
        await decrementButton.click();
        await page.waitForChanges();

        // Then - Should only emit once since second click would go below min
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(changeSpy).toHaveReceivedEventDetail({ value: -1 });
    });

    test('should use the min attribute as default value when value is not set', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-counter min="5"></wcs-counter>
        `);

        const currentDisplayedValue = page.locator('wcs-counter .current-value');

        // Then
        await expect(currentDisplayedValue).toHaveText('5');
    });

    test('should respect the max attribute', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-counter max="1"></wcs-counter>
        `);

        const changeSpy = await page.locator('wcs-counter').spyOnEvent('wcsChange');

        const incrementButton = page.locator('wcs-counter wcs-button').last();

        // When
        await incrementButton.click();
        await incrementButton.click();
        await page.waitForChanges();

        // Then - Should only emit once since second click would go above max
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(changeSpy).toHaveReceivedEventDetail({ value: 1 });
    });

    test('should respect the value attribute', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-counter value="5"></wcs-counter>
        `);

        const currentDisplayedValue = page.locator('wcs-counter .current-value');

        // Then
        await expect(currentDisplayedValue).toHaveText('5');
    });

    test('should use the min value as default when min is greater than 0', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-counter min="5"></wcs-counter>
        `);

        const currentDisplayedValue = page.locator('wcs-counter .current-value');

        // Then
        await expect(currentDisplayedValue).toHaveText('5');
    });

    test('should use the min value as default when min is greater than value', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-counter min="5" value="3"></wcs-counter>
        `);

        const currentDisplayedValue = page.locator('wcs-counter .current-value');

        // Then
        await expect(currentDisplayedValue).toHaveText('5');
    });

    test('should fire wcsBlur event when the counter loose focus', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <button id="first">first</button>
            <wcs-counter></wcs-counter>
            <button id="last">last</button>
        `);

        const blurSpy = await page.locator('wcs-counter').spyOnEvent('wcsBlur');

        const firstButton = page.locator('#first');

        // When
        await firstButton.click();
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.waitForChanges();

        // Then
        expect(blurSpy).toHaveReceivedEventTimes(1);
    });

    test('should fire wcsBlur event when the user click on decrement button and leave', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-counter></wcs-counter>
            <button>last</button>
        `);

        const blurSpy = await page.locator('wcs-counter').spyOnEvent('wcsBlur');

        const decrementButton = page.locator('wcs-counter wcs-button').first();
        const button = page.getByRole('button', { name: 'last' });

        // When
        await decrementButton.click();
        await button.click();
        await page.waitForChanges();

        // Then
        expect(blurSpy).toHaveReceivedEventTimes(1);
    });

    test('should fire wcsBlur event when the user click on increment button and leave', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-counter></wcs-counter>
            <button>last</button>
        `);

        const blurSpy = await page.locator('wcs-counter').spyOnEvent('wcsBlur');

        const incrementButton = page.locator('wcs-counter wcs-button').last();
        const button = page.getByRole('button', { name: 'last' });

        // When
        await incrementButton.click();
        await button.click();
        await page.waitForChanges();

        // Then
        expect(blurSpy).toHaveReceivedEventTimes(1);
    });

    test('should not be interactive when disabled', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-counter disabled="true"></wcs-counter>
        `);

        const changeSpy = await page.locator('wcs-counter').spyOnEvent('wcsChange');

        const incrementButton = page.locator('wcs-counter wcs-button').last();

        // When
        await incrementButton.click({ force: true });
        await page.waitForChanges();

        // Then
        expect(changeSpy).toHaveReceivedEventTimes(0);
        await expect(page.locator('wcs-counter')).toHaveJSProperty('value', 0);
        await expect(incrementButton).toHaveJSProperty('disabled', true);
    });
});
