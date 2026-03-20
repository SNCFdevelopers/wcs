import { setWcsContent } from '../../utils/playwright/test';
import { test, E2EPage } from "@stencil/playwright";

import { expect } from "@playwright/test";

test.describe('Radio Group', () => {
    test('should navigate to the first not disabled radio when pressing tab key', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-input></wcs-input>
            <wcs-radio-group>
                <wcs-radio disabled id="radio-1" value="1"></wcs-radio>
                <wcs-radio id="radio-2" value="2"></wcs-radio>
                <wcs-radio id="radio-3" value="3"></wcs-radio>
            </wcs-radio-group>
        `);

        const firstTabbableItem = page.locator('wcs-input');
        await firstTabbableItem.focus();
        const secondRadio = page.locator('#radio-2');

        // When
        await page.keyboard.press('Tab');

        // Then
        await expect(secondRadio).toBeFocused();
    });

    test('should not make unselected radios focusable when a radio is clicked', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-input></wcs-input>
            <wcs-radio-group>
                <wcs-radio disabled id="radio-1" value="1"></wcs-radio>
                <wcs-radio id="radio-2" value="2"></wcs-radio>
                <wcs-radio id="radio-3" value="3"></wcs-radio>
            </wcs-radio-group>
        `);

        const input = page.locator('wcs-input');
        const radio3 = page.locator('#radio-3');

        // When
        await radio3.click();
        await input.focus();

        // Then
        await page.keyboard.press('Tab');
        await expect(radio3).toBeFocused();
    });

    test('should checked the first radio when pressing space key', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-input></wcs-input>
            <wcs-radio-group>
                <wcs-radio id="radio-1" value="1"></wcs-radio>
                <wcs-radio id="radio-2" value="2"></wcs-radio>
                <wcs-radio id="radio-3" value="3"></wcs-radio>
            </wcs-radio-group>
        `);

        const firstTabbableItem = page.locator('wcs-input');
        await firstTabbableItem.focus();
        const firstRadio = page.locator('#radio-1');
        await page.keyboard.press('Tab');

        // When
        await page.keyboard.press('Space');

        // Then
        await expect(firstRadio).toBeFocused(); // Ensure focus is on the first radio
        const firstRadioNativeInput = page.locator('#radio-1 input');
        await expect(firstRadioNativeInput).toHaveAttribute('aria-checked', 'true');
    });

    test('should navigate to the checked radio when pressing tab key', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-input></wcs-input>
            <wcs-radio-group value="3">
                <wcs-radio disabled id="radio-1" value="1"></wcs-radio>
                <wcs-radio id="radio-2" value="2"></wcs-radio>
                <wcs-radio id="radio-3" value="3"></wcs-radio>
            </wcs-radio-group>
        `);

        const firstTabbableItem = page.locator('wcs-input');
        await firstTabbableItem.focus();
        const thirdRadio = page.locator('#radio-3');

        // When
        await page.keyboard.press('Tab');

        // Then
        await expect(thirdRadio).toBeFocused();
    });

    test.describe('When pressing arrow down key', () => {
        test('should checked the next radio not disabled when we are on the first radio and next radio is here', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-radio-group>
                    <wcs-radio id="radio-1" value="1"></wcs-radio>
                    <wcs-radio disabled id="radio-2" value="2"></wcs-radio>
                    <wcs-radio id="radio-3" value="3"></wcs-radio>
                </wcs-radio-group>
            `);

            const firstRadio = page.locator('#radio-1');
            await firstRadio.focus();
            const thirdRadioNativeInput = page.locator('#radio-3 input');
            const thirdRadio = page.locator('#radio-3');

            // When
            await page.keyboard.press('ArrowDown');

            // Then
            await expect(thirdRadio).toBeFocused(); // Ensure focus is on the third radio
            await expect(thirdRadioNativeInput).toHaveAttribute('aria-checked', 'true');
        });

        test('should checked the first not disabled radio when we are on the last radio', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-radio-group>
                    <wcs-radio disabled id="radio-1" value="1"></wcs-radio>
                    <wcs-radio id="radio-2" value="2"></wcs-radio>
                    <wcs-radio id="radio-3" value="3"></wcs-radio>
                </wcs-radio-group>
            `);

            const lastRadio = page.locator('#radio-3');
            // Click to select, then focus explicitly for WebKit compatibility
            await lastRadio.click();
            await lastRadio.focus();
            await expect(lastRadio).toBeFocused();
            const secondRadio = page.locator('#radio-2');
            const secondRadioNativeInputInput = page.locator('#radio-2 input');

            // When
            await page.keyboard.press('ArrowDown');

            // Then
            await expect(secondRadio).toBeFocused(); // Ensure focus is on the second radio
            await expect(secondRadioNativeInputInput).toHaveAttribute('aria-checked', 'true');
        });
    });

    test.describe('Events handling', () => {
        test('should fire wcsRadioClick when we click on an unchecked radio', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-radio-group>
                    <wcs-radio id="radio-1" value="1"></wcs-radio>
                    <wcs-radio id="radio-2" value="2"></wcs-radio>
                    <wcs-radio id="radio-3" value="3"></wcs-radio>
                </wcs-radio-group>
            `);

            const radioClickSpy = await page.spyOnEvent('wcsRadioClick');

            const radio2 = page.locator('#radio-2');

            // When
            await radio2.click();
            await page.waitForChanges();

            // Then
            expect(radioClickSpy).toHaveReceivedEventTimes(1);
        });

        test('should fire wcsChange when we click or move to an unchecked radio', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-radio-group>
                    <wcs-radio id="radio-1" value="1"></wcs-radio>
                    <wcs-radio id="radio-2" value="2"></wcs-radio>
                    <wcs-radio id="radio-3" value="3"></wcs-radio>
                </wcs-radio-group>
            `);

            const changeSpy = await page.spyOnEvent('wcsChange');

            const radio2 = page.locator('#radio-2');

            // When: Clicking on an unchecked radio
            await radio2.click();
            await page.waitForChanges();

            // Then
            expect(changeSpy).toHaveReceivedEventTimes(1);

            // When: Moving focus to another unchecked radio with keyboard
            await radio2.focus();
            await page.keyboard.press('ArrowDown'); // Move to the next radio
            await page.waitForChanges();

            // Then
            const radio3 = page.locator('#radio-3');
            await expect(radio3).toBeFocused(); // Ensure focus is on the third radio (next radio after radio2)
            expect(changeSpy).toHaveReceivedEventTimes(2);
        });

        test('should fire wcsBlur and wcsFocus from the radios', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-radio-group>
                    <wcs-radio id="radio-1" value="1"></wcs-radio>
                    <wcs-radio id="radio-2" value="2"></wcs-radio>
                    <wcs-radio id="radio-3" value="3"></wcs-radio>
                </wcs-radio-group>
            `);

            const blurSpy = await page.spyOnEvent('wcsBlur');
            const focusSpy = await page.spyOnEvent('wcsFocus');

            const radio = page.locator('#radio-1');

            // When: Focusing on the first radio
            await radio.focus();
            await page.waitForChanges();

            // Then: Expect wcsFocus to be fired
            expect(focusSpy).toHaveReceivedEventTimes(1);

            // When: Moving to the next radio
            await page.keyboard.press('ArrowDown');
            await page.waitForChanges();

            // When: Moving focus to another radio
            await page.keyboard.press('Tab');

            // Then
            expect(blurSpy).toHaveReceivedEvent();
            expect(focusSpy).toHaveReceivedEventTimes(2);
        });
    });

    test.describe('When pressing arrow up key', () => {
        test('should checked the previous radio when we are on the last radio and previous radio is here', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-radio-group>
                    <wcs-radio id="radio-1" value="1"></wcs-radio>
                    <wcs-radio id="radio-2" value="2"></wcs-radio>
                    <wcs-radio id="radio-3" value="3"></wcs-radio>
                </wcs-radio-group>
            `);

            const lastRadio = page.locator('#radio-3');
            await lastRadio.focus();

            // When
            await page.keyboard.press('ArrowUp');

            // Then
            const secondRadioInput = page.locator('#radio-2 input');
            await expect(secondRadioInput).toHaveAttribute('aria-checked', 'true');
        });

        test('should checked the last radio when we are on the first radio', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-radio-group>
                    <wcs-radio id="radio-1" value="1"></wcs-radio>
                    <wcs-radio id="radio-2" value="2"></wcs-radio>
                    <wcs-radio id="radio-3" value="3"></wcs-radio>
                </wcs-radio-group>
            `);

            const firstRadio = page.locator('#radio-1');
            await firstRadio.focus();

            // When
            await page.keyboard.press('ArrowUp');

            // Then
            const lastRadioInput = page.locator('#radio-3 input');
            await expect(lastRadioInput).toHaveAttribute('aria-checked', 'true');
        });
    });

    test.describe('Behavior in window with scroll', () => {
        [
            { mode: 'radio' },
            { mode: 'horizontal' },
            { mode: 'option' }
        ].forEach(({ mode }) => {
                test(`should preserve the window scroll position when clicking a radio inside a scrollable container - mode: ${mode}`, async ({ page }: { page: E2EPage }) => {
                // Given
                await setWcsContent(page, `
                    <div id="scroll-container" style="height: 100vh; overflow-y: auto;">
                        <div style="margin-top: 150vh;">
                            <wcs-radio-group mode="${mode}">
                                <wcs-radio id="radio-1" value="1">Radio 1</wcs-radio>
                                <wcs-radio id="radio-2" value="2">Radio 2</wcs-radio>
                                <wcs-radio id="radio-3" value="3">Radio 3</wcs-radio>
                            </wcs-radio-group>
                        </div>
                        <div style="margin-top: 200vh;">Other content</div>
                    </div>
            `);
                const body = page.locator('body');
                const radio2 = page.locator('#radio-2');
                await radio2.scrollIntoViewIfNeeded();

                // When
                await radio2.click();

                // Then
                const scrollY = await body.evaluate(() => window.scrollY);
                expect(scrollY).toBe(0);
            });
        });
    });
});
