import { setWcsContent } from '../../utils/playwright/test';
import { test, E2EPage } from "@stencil/playwright";

import { expect } from "@playwright/test";

test.describe('Input component', () => {
    test('Should fire wcsInput event once when user typing one char', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-input name="wcs-input-1" />
        `);

        const inputSpy = await page.spyOnEvent('wcsInput');
        const input = page.locator('wcs-input');

        // When
        await input.click();
        await input.press('B');
        await page.waitForChanges();

        // Then
        expect(inputSpy).toHaveReceivedEventTimes(1);
    });

    test('Should fire wcsInput event multiple times when user typing multiple chars', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-input name="wcs-input-1" />
        `);

        const inputSpy = await page.spyOnEvent('wcsInput');
        const input = page.locator('wcs-input');

        // When
        await input.click();
        await input.press('B');
        await page.waitForChanges();
        await input.press('o');
        await page.waitForChanges();
        await input.press('n');
        await page.waitForChanges();
        await input.press('j');
        await page.waitForChanges();
        await input.press('o');
        await page.waitForChanges();
        await input.press('u');
        await page.waitForChanges();
        await input.press('r');
        await page.waitForChanges();

        // Then
        expect(inputSpy).toHaveReceivedEventTimes(7);
    });

    test('Should fire wcsChange event when user commit change with blur (tab)', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-input name="wcs-input-1"></wcs-input>
            <button>Focus</button>
        `);

        const changeSpy = await page.spyOnEvent('wcsChange');
        const input = page.locator('wcs-input');
        const button = page.locator('button');

        // When
        await input.click();
        await expect(input).toBeFocused();
        await input.press('B');
        await input.press('l');
        await input.press('u');
        await input.press('r');
        await button.focus();
        await page.waitForChanges();

        // Then
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(changeSpy).toHaveReceivedEventDetail({ value: 'Blur' });
    });

    test('Should fire wcsChange event when user commit change with blur (click)', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-input name="wcs-input-1"></wcs-input>
            <button>Focus</button>
        `);

        const changeSpy = await page.spyOnEvent('wcsChange');
        const input = page.locator('wcs-input');
        const button = page.locator('button');

        // When
        await input.click();
        await input.press('B');
        await input.press('l');
        await input.press('u');
        await input.press('r');
        await button.focus();
        await page.waitForChanges();

        // Then
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(changeSpy).toHaveReceivedEventDetail({ value: 'Blur' });
    });

    test('Should fire wcsChange event when user commit change with enter', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-input name="wcs-input-1" />
        `);

        const changeSpy = await page.spyOnEvent('wcsChange');
        const input = page.locator('wcs-input');

        // When
        await input.click();
        await input.press('E');
        await input.press('n');
        await input.press('t');
        await input.press('e');
        await input.press('r');
        await input.press('Enter');
        await page.waitForChanges();

        // Then
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(changeSpy).toHaveReceivedEventDetail({ value: 'Enter' });
    });

    test('Should not fire wcsChange event when value is programmatically set', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-input name="wcs-input-1" />
        `);

        const changeSpy = await page.spyOnEvent('wcsChange');
        const input = page.locator('wcs-input');

        // When
        await input.evaluate((el: any) => el.value = 'Programmatically set value');
        await page.waitForChanges();

        // Then
        expect(changeSpy).toHaveReceivedEventTimes(0);
    });

    test('Should not fire wcsInput event when value is programmatically set', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-input name="wcs-input-1" />
        `);

        const inputSpy = await page.spyOnEvent('wcsInput');
        const input = page.locator('wcs-input');

        // When
        await input.evaluate((el: any) => el.value = 'Programmatically set value');
        await page.waitForChanges();

        // Then
        expect(inputSpy).toHaveReceivedEventTimes(0);
    });

    test('Should have a default value when value attribute is set', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-input name="wcs-input-1" value="Default value" />
        `);

        const input = page.locator('wcs-input');

        // Then
        await expect(input).toHaveJSProperty('value', 'Default value');
        await expect(page.locator('wcs-input input')).toHaveJSProperty('value', 'Default value');
    });

    test('Should have a default value when value property is set', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-input name="wcs-input-1" />
        `);

        const input = page.locator('wcs-input');

        // When
        await input.evaluate((el: any) => el.value = 'Default value');

        // Then
        await expect(input).toHaveJSProperty('value', 'Default value');
        await expect(page.locator('wcs-input input')).toHaveJSProperty('value', 'Default value');
    });
});
