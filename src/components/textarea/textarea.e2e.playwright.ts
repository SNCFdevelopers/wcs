import { setWcsContent } from '../../utils/playwright/test';
import { test, E2EPage } from "@stencil/playwright";

import { expect } from "@playwright/test";

test.describe('Textarea component', () => {
    test('Should fire wcsInput event once when user typing one char', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-textarea name="wcs-textarea-1" />
        `);

        const inputSpy = await page.spyOnEvent('wcsInput');

        const textarea = page.locator('wcs-textarea');

        // When
        await textarea.click();
        await textarea.press('B');
        await page.waitForChanges();

        // Then
        expect(inputSpy).toHaveReceivedEventTimes(1);
    });

    test('Should fire wcsInput event multiple times when user typing multiple chars', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-textarea name="wcs-textarea-1" />
        `);

        const inputSpy = await page.spyOnEvent('wcsInput');

        const textarea = page.locator('wcs-textarea');

        // When
        await textarea.click();
        await textarea.press('B');
        await page.waitForChanges();
        await textarea.press('o');
        await page.waitForChanges();
        await textarea.press('n');
        await page.waitForChanges();
        await textarea.press('j');
        await page.waitForChanges();
        await textarea.press('o');
        await page.waitForChanges();
        await textarea.press('u');
        await page.waitForChanges();
        await textarea.press('r');
        await page.waitForChanges();

        // Then
        expect(inputSpy).toHaveReceivedEventTimes(7);
    });

    test('Should fire wcsChange event when user commit change with blur (tab)', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-textarea name="wcs-textarea-1"></wcs-textarea>
            <button>Focus</button>
        `);

        const changeSpy = await page.spyOnEvent('wcsChange');

        const textarea = page.locator('wcs-textarea');
        const button = page.locator('button');

        // When
        await textarea.click();
        await textarea.pressSequentially('Blur');
        await button.focus(); // blur native textArea
        await page.waitForChanges();

        // Then - wait for the event to be received
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(changeSpy).toHaveReceivedEventDetail({ value: 'Blur' });
    });

    test('Should fire wcsChange event when user commit change with blur (click)', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-textarea name="wcs-textarea-1"></wcs-textarea>
            <button>Focus</button>
        `);

        const changeSpy = await page.spyOnEvent('wcsChange');

        const textarea = page.locator('wcs-textarea');
        const button = page.locator('button');

        // When
        await textarea.click();
        await textarea.press('B');
        await textarea.press('l');
        await textarea.press('u');
        await textarea.press('r');
        await button.focus();
        await page.waitForChanges();

        // Then
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(changeSpy).toHaveReceivedEventDetail({ value: 'Blur' });
    });

    test('Should not fire wcsChange event when value is programmatically set', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-textarea name="wcs-textarea-1" />
        `);

        const changeSpy = await page.spyOnEvent('wcsChange');

        const textarea = page.locator('wcs-textarea');

        // When
        await textarea.evaluate((el: any) => el.value = 'Programmatically set value');
        await page.waitForChanges();

        // Then
        expect(changeSpy).toHaveReceivedEventTimes(0);
    });

    test('Should not fire wcsInput event when value is programmatically set', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-textarea name="wcs-textarea-1" />
        `);

        const inputSpy = await page.spyOnEvent('wcsInput');

        const textarea = page.locator('wcs-textarea');

        // When
        await textarea.evaluate((el: any) => el.value = 'Programmatically set value');
        await page.waitForChanges();

        // Then
        expect(inputSpy).toHaveReceivedEventTimes(0);
    });

    test('Should have a default value when value attribute is set', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-textarea name="wcs-textarea-1" value="Default value" />
        `);

        const textarea = page.locator('wcs-textarea');

        // Then
        await expect(textarea).toHaveJSProperty('value', 'Default value');
        await expect(page.locator('wcs-textarea textarea')).toHaveJSProperty('value', 'Default value');
    });

    test('Should have a default value when value property is set', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-textarea name="wcs-textarea-1" />
        `);

        const textarea = page.locator('wcs-textarea');

        // When
        await textarea.evaluate((el: any) => el.value = 'Default value');

        // Then
        await expect(textarea).toHaveJSProperty('value', 'Default value');
        await expect(page.locator('wcs-textarea textarea')).toHaveJSProperty('value', 'Default value');
    });
});
