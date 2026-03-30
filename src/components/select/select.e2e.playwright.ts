import { Locator, expect } from '@playwright/test';
import { test, E2EPage } from '@stencil/playwright';
import { setWcsContent } from '../../utils/playwright/test';

async function focusAutocompleteInput(select: Locator) {
    await select.click();
    await select.click();
}

test.describe('Select component', () => {
    test('Expands when clicked', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-select>
                <wcs-select-option value="1">One</wcs-select-option>
            </wcs-select>
        `);
        const select = page.locator('wcs-select');

        // When
        await select.click();

        // Then
        await expect(select).toHaveClass(/expanded/);
    });

    test('Expands using the open method', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
          <wcs-select>
            <wcs-select-option value="1">One</wcs-select-option>
          </wcs-select>
        `);
        const select = page.locator('wcs-select');

        // When
        await select.evaluate((el: any) => el.open());

        // Then
        await expect(select).toHaveClass(/expanded/);
    });

    test('Closes using the open method', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
          <wcs-select>
            <wcs-select-option value="1">One</wcs-select-option>
          </wcs-select>
        `);
        const select = page.locator('wcs-select');

        // When
        await select.click();
        await select.evaluate((el: any) => el.close());

        // Then
        await expect(select).not.toHaveClass(/expanded/);
    });

    test('Closes when user click outside', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
          <wcs-select>
            <wcs-select-option value="1">One</wcs-select-option>
          </wcs-select>
          <div class="outside" style="margin-top: 300px; width: 100px; height: 100px;"></div>
        `);
        const select = page.locator('wcs-select');
        const outside = page.locator('div.outside');

        // When
        await select.click();
        await outside.click();

        // Then
        await expect(select).not.toHaveClass(/expanded/);
    });

    test('Closes when user click on another select', async ({ page }: { page: E2EPage }) => {
        // Given
        await page.setViewportSize({ width: 1024, height: 1600 });
        await setWcsContent(page, `
            <div style="display: flex">
                <wcs-select id="select-1">
                    <wcs-select-option value="1">One</wcs-select-option>
                    <wcs-select-option value="2">Two</wcs-select-option>
                    <wcs-select-option value="3">Three</wcs-select-option>
                </wcs-select>
                <wcs-select id="select-2">
                    <wcs-select-option value="1">One</wcs-select-option>
                    <wcs-select-option value="2">Two</wcs-select-option>
                    <wcs-select-option value="3">Three</wcs-select-option>
                </wcs-select>
            </div>
        `);
        const select1 = page.locator('#select-1');
        const select2 = page.locator('#select-2');

        // When
        await select1.click();

        // Then
        await expect(select1).toHaveClass(/expanded/);

        await select2.click(); // select another select component in page
        await expect(select1).not.toHaveClass(/expanded/);
        await expect(select2).toHaveClass(/expanded/);
    });

    test('Let us select a value and fire event correctly', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
          <wcs-select>
            <wcs-select-option value="1">One</wcs-select-option>
          </wcs-select>
        `);
        const select = page.locator('wcs-select');
        const firstOption = page.locator('wcs-select > wcs-select-option');

        const changeSpy = await page.spyOnEvent('wcsChange');

        // When
        await select.click();
        await expect(select).toHaveClass(/expanded/);
        await firstOption.click();
        await page.waitForChanges();

        // Then
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(changeSpy.lastEvent.detail.value).toBe('1');

        // Vérifier le label dans le shadow DOM
        const label = select.locator('label').first();
        await expect(label).toHaveText('One');
    });

    test.describe('select event', () => {
        test('should not emit event if we set the value in js', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select value="1">
                    <wcs-select-option value="1">One</wcs-select-option>
                    <wcs-select-option value="2">Two</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            const changeSpy = await page.spyOnEvent('wcsChange');

            // When
            await select.evaluate((el: any) => el.value = '2');
            await page.waitForChanges();

            // Then
            expect(changeSpy).toHaveReceivedEventTimes(0);
        });
    });

    test.describe('setSelectedValue', () => {
        test('Let user change selected value programmatically', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select>
                    <wcs-select-option value="1">One</wcs-select-option>
                    <wcs-select-option value="2">Two</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // When
            await select.evaluate((el: any) => el.value = '2');

            // Then
            const label = page.locator('label').first();
            await expect(label).toHaveText('Two');
        });

        test('Let user change selected values programmatically', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select multiple>
                    <wcs-select-option value="1">One</wcs-select-option>
                    <wcs-select-option value="2">Two</wcs-select-option>
                    <wcs-select-option value="3">Three</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // When
            await select.evaluate((el: any) => el.value = ['2', '3']);
            await page.waitForTimeout(50);

            // Then
            const label = page.locator('label').first();
            await expect(label).toHaveText('Two, Three');
        });
    });

    test('Is focusable', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
          <wcs-select>
            <wcs-select-option value="1">One</wcs-select-option>
          </wcs-select>
        `);
        const select = page.locator('wcs-select');

        // When
        await select.focus();

        // Then
        await expect(select).toBeFocused();
    });

    test.describe('Disabled', () => {
        test('Must not expand when disabled', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select disabled>
                  <wcs-select-option value="1">One</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // When
            await select.click({ force: true });

            // Then
            await expect(select).not.toHaveClass(/expanded/);
        });

        test('Is not focusable when disabled', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select disabled>
                  <wcs-select-option value="1">One</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // When
            await select.focus();

            // Then
            await expect(select).not.toBeFocused();
        });
    });

    test.describe('Multiple', () => {
        test('Musn\'t close when we select a value', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select multiple>
                  <wcs-select-option value="1">One</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');
            const firstOption = page.locator('wcs-select > wcs-select-option');

            // When
            await select.click();
            await expect(select).toHaveClass(/expanded/);
            await firstOption.click();
            await page.waitForChanges();

            // Then
            await expect(select).toHaveClass(/expanded/);
        });

        test('Allows to select multiple values', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select multiple>
                  <wcs-select-option value="1">One</wcs-select-option>
                  <wcs-select-option value="2">Two</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');
            const options = page.locator('wcs-select > wcs-select-option');

            const changeSpy = await page.spyOnEvent('wcsChange');

            // When
            await select.click();
            await expect(select).toHaveClass(/expanded/);
            await options.nth(0).click();
            await page.waitForChanges();
            await options.nth(1).click();
            await page.waitForChanges();

            // Then
            expect(changeSpy).toHaveReceivedEventTimes(2);
            expect(changeSpy.events[1].detail.value).toEqual(['1', '2']);
        });

        test('Allows to unselect a value', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select multiple>
                    <wcs-select-option value="1">One</wcs-select-option>
                    <wcs-select-option value="2">Two</wcs-select-option>
                    <wcs-select-option value="3">Three</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');
            const options = page.locator('wcs-select > wcs-select-option');

            const changeSpy = await page.spyOnEvent('wcsChange');

            // When
            await select.click();
            await expect(select).toHaveClass(/expanded/);
            await options.nth(0).click();
            await page.waitForChanges();
            await options.nth(1).click();
            await page.waitForChanges();
            await options.nth(0).click();
            await page.waitForChanges();

            // Then
            expect(changeSpy).toHaveReceivedEventTimes(3);
            expect(changeSpy.events[2].detail.value).toEqual(['2']);
        });

        test('Displays all values separated by a comma', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select multiple>
                    <wcs-select-option value="1">One</wcs-select-option>
                    <wcs-select-option value="2">Two</wcs-select-option>
                    <wcs-select-option value="3">Three</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');
            const options = page.locator('wcs-select > wcs-select-option');

            // When
            await select.click();
            await expect(select).toHaveClass(/expanded/);
            await options.nth(0).click();
            await options.nth(1).click();
            await options.nth(2).click();

            // Then
            const label = select.locator('label').first();
            await expect(label).toHaveText('One, Two, Three');
        });

        test('Tells the option that they should display as multiple', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select multiple>
                    <wcs-select-option value="1">One</wcs-select-option>
                </wcs-select>
            `);
            const option = page.locator('wcs-select-option').first();

            // Then
            await expect(option).toHaveAttribute('multiple');
        });

        test('Propagate event when values are select', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select multiple>
                    <wcs-select-option value="1">One</wcs-select-option>
                    <wcs-select-option value="2">Two</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');
            const options = page.locator('wcs-select > wcs-select-option');

            const changeSpy = await page.spyOnEvent('wcsChange');

            // When
            await select.click();
            await expect(select).toHaveClass(/expanded/);
            await options.nth(0).click();
            await page.waitForChanges();
            await options.nth(1).click();
            await page.waitForChanges();

            // Then
            expect(changeSpy).toHaveReceivedEventTimes(2);
            expect(changeSpy.events[1].detail.value).toEqual(['1', '2']);
        });
    });

    test.describe('Keyboard navigation when select is closed and not multiple', () => {
        test('select value of first option enabled on Down Arrow key pressed', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select>
                  <wcs-select-option value="option1" disabled>Option 1</wcs-select-option>
                  <wcs-select-option value="option2">Option 2</wcs-select-option>
                  <wcs-select-option value="option3">Option 3</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            const changeSpy = await page.spyOnEvent('wcsChange');

            // When
            await select.focus();
            await page.keyboard.press('ArrowDown');
            await page.waitForChanges();

            // Then
            const label = select.locator('label').first();
            await expect(label).toHaveText('Option 2');
            expect(changeSpy).toHaveReceivedEventTimes(1);
            expect(changeSpy.firstEvent.detail.value).toBe('option2');
        });

        test('select value of last option enabled on PageDown key pressed', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select>
                  <wcs-select-option value="option1" disabled>Option 1</wcs-select-option>
                  <wcs-select-option value="option2">Option 2</wcs-select-option>
                  <wcs-select-option value="option3">Option 3</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            const changeSpy = await page.spyOnEvent('wcsChange');

            // When
            await select.focus();
            await page.keyboard.press('PageDown');
            await page.waitForChanges();

            // Then
            const label = select.locator('label').first();
            await expect(label).toHaveText('Option 3');
            expect(changeSpy).toHaveReceivedEventTimes(1);
            expect(changeSpy.firstEvent.detail.value).toBe('option3');
        });

        test('select value of first option enabled on PageUp key pressed', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select>
                  <wcs-select-option value="option1" disabled>Option 1</wcs-select-option>
                  <wcs-select-option value="option2">Option 2</wcs-select-option>
                  <wcs-select-option value="option3">Option 3</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            const changeSpy = await page.spyOnEvent('wcsChange');

            // When
            await select.focus();
            await page.keyboard.press('PageUp');
            await page.waitForChanges();

            // Then
            const label = select.locator('label').first();
            await expect(label).toHaveText('Option 2');
            expect(changeSpy).toHaveReceivedEventTimes(1);
            expect(changeSpy.firstEvent.detail.value).toBe('option2');
        });

        test('open the overlay on Enter key press', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select>
                  <wcs-select-option value="option1" disabled>Option 1</wcs-select-option>
                  <wcs-select-option value="option2">Option 2</wcs-select-option>
                  <wcs-select-option value="option3">Option 3</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // When
            await select.focus();
            await page.keyboard.press('Enter');

            // Then
            await expect(select).toHaveClass(/expanded/);
        });

        test('open the overlay on Alt + Down Arrow key pressed', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select>
                  <wcs-select-option value="option1" disabled>Option 1</wcs-select-option>
                  <wcs-select-option value="option2">Option 2</wcs-select-option>
                  <wcs-select-option value="option3">Option 3</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // When
            await select.focus();
            await page.keyboard.down('Alt');
            await page.keyboard.press('ArrowDown');
            await page.keyboard.up('Alt');

            // Then
            await expect(select).toHaveClass(/expanded/);
        });

        test('focuses last selected option when opening with keyboard after programmatic value change', async ({ page }: {
            page: E2EPage
        }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select>
                  <wcs-select-option value="option1">Option 1</wcs-select-option>
                  <wcs-select-option value="option2">Option 2</wcs-select-option>
                  <wcs-select-option value="option3">Option 3</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // When
            await select.evaluate((el: any) => el.value = 'option2');
            await page.waitForTimeout(50);
            await select.focus();
            await page.keyboard.press('Enter'); // Open select with keyboard

            // Then
            const focusedOption = page.locator('wcs-select-option:focus');
            await expect(focusedOption).toHaveAttribute('value', 'option2');
        });
    });

    test.describe('Keyboard navigation when select is opened and not multiple', () => {
        test('close the overlay on Escape key pressed and focus select control', async ({ page }: {
            page: E2EPage
        }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select>
                  <wcs-select-option value="option1" disabled>Option 1</wcs-select-option>
                  <wcs-select-option value="option2">Option 2</wcs-select-option>
                  <wcs-select-option value="option3">Option 3</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // Open the overlay
            await select.focus();
            await page.keyboard.press('Enter');
            await expect(select).toHaveClass(/expanded/);

            // When
            await page.keyboard.press('Escape');

            // Then
            await expect(select).not.toHaveClass(/expanded/);
            await expect(select).toBeFocused();
        });

        test('close the overlay on Alt + ArrowUp keys pressed and focus select control', async ({ page }: {
            page: E2EPage
        }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select>
                  <wcs-select-option value="option1" disabled>Option 1</wcs-select-option>
                  <wcs-select-option value="option2">Option 2</wcs-select-option>
                  <wcs-select-option value="option3">Option 3</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // Open the overlay
            await select.focus();
            await page.keyboard.press('Enter');
            await expect(select).toHaveClass(/expanded/);

            // When
            await page.keyboard.down('Alt');
            await page.keyboard.press('ArrowUp');
            await page.keyboard.up('Alt');

            // Then
            await expect(select).not.toHaveClass(/expanded/);
            await expect(select).toBeFocused();
        });

        test('close the overlay on Tab key pressed', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select>
                  <wcs-select-option value="option1" disabled>Option 1</wcs-select-option>
                  <wcs-select-option value="option2">Option 2</wcs-select-option>
                  <wcs-select-option value="option3">Option 3</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // Open the overlay
            await select.focus();
            await page.keyboard.press('Enter');
            await expect(select).toHaveClass(/expanded/);

            // When
            await page.keyboard.press('Tab');

            // Then
            await expect(select).not.toHaveClass(/expanded/);
        });

        test('close the overlay on Tab + Shift keys pressed', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select>
                  <wcs-select-option value="option1" disabled>Option 1</wcs-select-option>
                  <wcs-select-option value="option2">Option 2</wcs-select-option>
                  <wcs-select-option value="option3">Option 3</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // Open the overlay
            await select.focus();
            await page.keyboard.press('Enter');
            await expect(select).toHaveClass(/expanded/);

            // When
            await page.keyboard.down('Shift');
            await page.keyboard.press('Tab');
            await page.keyboard.up('Shift');

            // Then
            await expect(select).not.toHaveClass(/expanded/);
        });

        test('choose the current option on Enter key pressed', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select>
                  <wcs-select-option value="option1" disabled>Option 1</wcs-select-option>
                  <wcs-select-option value="option2">Option 2</wcs-select-option>
                  <wcs-select-option value="option3">Option 3</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            const changeSpy = await page.spyOnEvent('wcsChange');

            // Open the overlay
            await select.focus();
            await page.keyboard.press('Enter');
            await expect(select).toHaveClass(/expanded/);

            // When
            await page.keyboard.press('Enter');
            await page.waitForChanges();

            // Then
            const label = select.locator('label').first();
            await expect(label).toHaveText('Option 2');
            expect(changeSpy).toHaveReceivedEventTimes(1);
            expect(changeSpy.firstEvent.detail.value).toBe('option2');
        });

        test('move focus to next option on Down Arrow key down', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select>
                  <wcs-select-option value="option1" disabled>Option 1</wcs-select-option>
                  <wcs-select-option value="option2">Option 2</wcs-select-option>
                  <wcs-select-option value="option3">Option 3</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            const changeSpy = await page.spyOnEvent('wcsChange');

            // Open the overlay
            await select.focus();
            await page.keyboard.press('Enter');
            await expect(select).toHaveClass(/expanded/);

            // When
            await page.keyboard.press('ArrowDown');

            // Then
            const focusedOption = page.locator('wcs-select-option:focus');
            await expect(focusedOption).toHaveAttribute('value', 'option3');
            await expect(async () => {
                expect(changeSpy).toHaveReceivedEventTimes(0);
            }).toPass();
        });
    });

    test.describe('Keyboard navigation when select is closed and multiple', () => {
        test('move focus into the first enabled option on Down Arrow key pressed', async ({ page }: {
            page: E2EPage
        }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select multiple="">
                  <wcs-select-option value="option1" disabled>Option 1</wcs-select-option>
                  <wcs-select-option value="option2">Option 2</wcs-select-option>
                  <wcs-select-option value="option3">Option 3</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            const changeSpy = await page.spyOnEvent('wcsChange');

            // When
            await select.focus();
            await page.keyboard.press('ArrowDown');

            // Then
            const focusedOption = page.locator('wcs-select-option:focus');
            await expect(focusedOption).toHaveAttribute('value', 'option2');
            await expect(async () => {
                expect(changeSpy).toHaveReceivedEventTimes(0);
            }).toPass();
        });

        test('move focus into the first enabled option on Enter key pressed', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select multiple="">
                  <wcs-select-option value="option1" disabled>Option 1</wcs-select-option>
                  <wcs-select-option value="option2">Option 2</wcs-select-option>
                  <wcs-select-option value="option3">Option 3</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            const changeSpy = await page.spyOnEvent('wcsChange');

            // When
            await select.focus();
            await page.keyboard.press('Enter');

            // Then
            await expect(select).toHaveClass(/expanded/);
            const focusedOption = page.locator('wcs-select-option:focus');
            await expect(focusedOption).toHaveAttribute('value', 'option2');
            await expect(async () => {
                expect(changeSpy).toHaveReceivedEventTimes(0);
            }).toPass();
        });

        test('focuses last selected option when opening with keyboard after programmatic value change', async ({ page }: {
            page: E2EPage
        }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select multiple>
                  <wcs-select-option value="option1">Option 1</wcs-select-option>
                  <wcs-select-option value="option2">Option 2</wcs-select-option>
                  <wcs-select-option value="option3">Option 3</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // When
            await select.evaluate((el: any) => el.value = ['option1', 'option2']);
            await select.focus();
            await page.keyboard.press('Enter'); // Open select with keyboard

            // Then
            await expect(select).toHaveClass(/expanded/);
            const focusedOption = page.locator('wcs-select-option:focus');
            await expect(focusedOption).toHaveAttribute('value', 'option2'); // Should focus the last option in the array
        });
    });

    test.describe('Keyboard navigation when select opened and multiple', () => {
        test('close the overlay on Tab key pressed and not focus an checkbox', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select multiple="">
                  <wcs-select-option value="option1" disabled>Option 1</wcs-select-option>
                  <wcs-select-option value="option2">Option 2</wcs-select-option>
                  <wcs-select-option value="option3">Option 3</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // Open the overlay
            await select.focus();
            await page.keyboard.press('Enter');
            await expect(select).toHaveClass(/expanded/);

            // When
            await page.keyboard.press('Tab');

            // Then
            await expect(select).not.toHaveClass(/expanded/);
        });
    });

    test.describe('Options', () => {
        test('Adds selected attribute to selected option', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select>
                    <wcs-select-option value="1">One</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');
            const option = page.locator('wcs-select > wcs-select-option');

            // When
            await select.click();
            await expect(select).toHaveClass(/expanded/);
            await option.click();

            // Then
            await expect(option).toHaveAttribute('selected');
        });

        test('Removes selected attribute from previously selected options', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select>
                    <wcs-select-option value="1">One</wcs-select-option>
                    <wcs-select-option value="2">Two</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');
            const options = page.locator('wcs-select > wcs-select-option');

            // When
            await select.click();
            await expect(select).toHaveClass(/expanded/);
            await options.nth(0).click();
            await select.click(); // As it is not multiple we need to open it once again
            await expect(select).toHaveClass(/expanded/);
            await options.nth(1).click();

            // Then
            await expect(options.nth(0)).not.toHaveAttribute('selected');
            await expect(options.nth(1)).toHaveAttribute('selected');
        });

        test('Must not let a user select a disabled option', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select>
                    <wcs-select-option value="1" disabled>One</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');
            const option = page.locator('wcs-select > wcs-select-option');

            // When
            await select.click();
            await expect(select).toHaveClass(/expanded/);
            // Use dispatchEvent instead of click since disabled options may not be clickable
            await option.dispatchEvent('click');

            // Then
            await expect(select).not.toHaveAttribute('value');
        });
    });

    test('Propagate wcsSelectChangeEvent when a new value is selected', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-select>
                <wcs-select-option value="1">One</wcs-select-option>
            </wcs-select>
        `);
        const select = page.locator('wcs-select');
        const option = page.locator('wcs-select > wcs-select-option');

        const changeSpy = await page.spyOnEvent('wcsChange');

        // When
        await select.click();
        await expect(select).toHaveClass(/expanded/);
        await option.click();
        await page.waitForChanges();

        // Then
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(changeSpy.firstEvent.detail.value).toBe('1');
    });

    test.describe('Focus management', () => {
        test('after selection, focus is on the correct element', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select>
                  <wcs-select-option value="1">One</wcs-select-option>
                  <wcs-select-option value="2">Two</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // When
            await select.focus();
            await page.keyboard.press('Enter');
            await expect(select).toHaveClass(/expanded/);
            await page.keyboard.press('ArrowDown');

            // Then
            const focusedOption = page.locator('wcs-select-option:focus');
            await expect(focusedOption).toHaveAttribute('value', '2');
        });
    });

    test('[Autocomplete] Input field is focusable', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-select autocomplete="true">
                <wcs-select-option value="1">One</wcs-select-option>
            </wcs-select>
        `);
        const select = page.locator('wcs-select');
        const nativeInput = page.locator('wcs-select input.autocomplete-field');

        // When - Click to focus
        await select.click();

        // Then
        await expect(nativeInput).toBeFocused();
    });

    test('[Autocomplete] filter is cleared when the select value is set to a falsy value', async ({ page }: {
        page: E2EPage
    }) => {
        // Given
        await setWcsContent(page, `
            <wcs-select autocomplete>
                <wcs-select-option value="1">One</wcs-select-option>
                <wcs-select-option value="2">Two</wcs-select-option>
                <wcs-select-option value="3">Three</wcs-select-option>
                <wcs-select-option value="4">Four</wcs-select-option>
            </wcs-select>
        `);
        const select = page.locator('wcs-select');

        // When
        await select.click();
        await page.keyboard.type('One');

        const firstSelectOption = page.locator('wcs-select > wcs-select-option').first();
        await firstSelectOption.click();

        await select.evaluate((el: any) => el.value = '');
        await page.waitForTimeout(50);

        // Then
        await select.click();
        await expect(select).toHaveClass(/expanded/);
        const availableOptions = await page.locator('wcs-select > wcs-select-option:not([hidden])').count();
        expect(availableOptions).toBe(4);
    });

    test('[Autocomplete] should not opened when initial value is set', async ({ page }: { page: E2EPage }) => {
        // Given - When
        await setWcsContent(page, `
            <wcs-select autocomplete value="1">
                <wcs-select-option value="1">One</wcs-select-option>
                <wcs-select-option value="2">Two</wcs-select-option>
                <wcs-select-option value="3">Three</wcs-select-option>
                <wcs-select-option value="4">Four</wcs-select-option>
            </wcs-select>
        `);
        const select = page.locator('wcs-select');

        // Then
        await expect(select).not.toHaveClass(/expanded/);
    });

    test('[Autocomplete] should not opened when set value programmatically', async ({ page }: { page: E2EPage }) => {
        // Given - When
        await setWcsContent(page, `
            <wcs-select autocomplete value="1">
                <wcs-select-option value="1">One</wcs-select-option>
                <wcs-select-option value="2">Two</wcs-select-option>
                <wcs-select-option value="3">Three</wcs-select-option>
                <wcs-select-option value="4">Four</wcs-select-option>
            </wcs-select>
        `);
        const select = page.locator('wcs-select');

        await select.evaluate((el: any) => el.value = '1');
        await page.waitForTimeout(50);

        // Then
        await expect(select).not.toHaveClass(/expanded/);
    });

    test('[Autocomplete] should opened when set value with user interaction', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-select autocomplete>
                <wcs-select-option value="1">One</wcs-select-option>
                <wcs-select-option value="2">Two</wcs-select-option>
                <wcs-select-option value="3">Three</wcs-select-option>
                <wcs-select-option value="4">Four</wcs-select-option>
            </wcs-select>
        `);
        const select = page.locator('wcs-select');

        // When
        await select.click();
        await page.keyboard.type('O');

        // Then
        await expect(select).toHaveClass(/expanded/);
    });

    test.describe('[Autocomplete] Keyboard navigation when select closed', () => {
        test('open listbox and move focus into the first enabled option on Arrow Down pressed', async ({ page }: {
            page: E2EPage
        }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select autocomplete="">
                    <wcs-select-option value="option1" disabled>Option 1</wcs-select-option>
                    <wcs-select-option value="option2">Option 2</wcs-select-option>
                    <wcs-select-option value="option3">Option 3</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // When
            await select.click();
            await page.keyboard.press('ArrowDown');

            // Then
            const visuallyFocusedOption = page.locator('wcs-select-option[highlighted]');
            await expect(visuallyFocusedOption).toHaveCount(1);
            await expect(visuallyFocusedOption).toHaveAttribute('value', 'option2');
            await expect(select).toHaveClass(/expanded/);
        });

        test('open listbox without moveing on Alt + Arrow Down pressed', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select autocomplete="">
                    <wcs-select-option value="option1" disabled>Option 1</wcs-select-option>
                    <wcs-select-option value="option2">Option 2</wcs-select-option>
                    <wcs-select-option value="option3">Option 3</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // When
            await select.click();
            await page.keyboard.down('Alt');
            await page.keyboard.press('ArrowDown');
            await page.keyboard.up('Alt');

            // Then
            await expect(select).toHaveClass(/expanded/);
            const anyVisuallyFocusedOption = page.locator('wcs-select-option[highlighted]');
            await expect(anyVisuallyFocusedOption).toHaveCount(0);
        });

        test('clear textbox on Escape pressed', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select autocomplete="">
                    <wcs-select-option value="option1" disabled>Option 1</wcs-select-option>
                    <wcs-select-option value="option2">Option 2</wcs-select-option>
                    <wcs-select-option value="option3">Option 3</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // When
            await select.click(); // Focus the input (delegate focus)
            await page.keyboard.type('test');
            await page.waitForTimeout(50);
            await page.keyboard.press('Escape'); // Close the listbox
            await page.waitForTimeout(50);
            await expect(select).not.toHaveClass(/expanded/);
            await page.keyboard.press('Escape'); // Clear the textbox
            await page.waitForTimeout(50);

            // Then
            const nativeInput = page.locator('wcs-select input.autocomplete-field');
            await expect(nativeInput).toHaveValue('');
        });
    });

    test.describe('[Autocomplete] Keyboard navigation when select expanded', () => {
        test('close listbox on Escape', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select autocomplete="">
                    <wcs-select-option value="option1" disabled>Apple</wcs-select-option>
                    <wcs-select-option value="option2">Banana</wcs-select-option>
                    <wcs-select-option value="option3">Peach</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // When
            await select.click();
            await expect(select).toHaveClass(/expanded/);
            await page.keyboard.press('Escape');

            // Then
            await expect(select).not.toHaveClass(/expanded/);
        });

        test('stay opened on Enter when no option are highlighted', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select autocomplete="">
                    <wcs-select-option value="option1" disabled>Apple</wcs-select-option>
                    <wcs-select-option value="option2">Banana</wcs-select-option>
                    <wcs-select-option value="option3">Peach</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // When
            await select.click();
            await page.keyboard.press('Enter');

            // Then
            await expect(select).toHaveClass(/expanded/);
        });

        test('Close overlay when an highlighted option is selected with Enter keypress', async ({ page }: {
            page: E2EPage
        }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select autocomplete="">
                    <wcs-select-option value="option1" disabled>Apple</wcs-select-option>
                    <wcs-select-option value="option2">Banana</wcs-select-option>
                    <wcs-select-option value="option3">Peach</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // When
            await select.click();
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('Enter');

            // Then
            await expect(select).not.toHaveClass(/expanded/);
        });

        test('focus last option on Arrow Up', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select autocomplete="">
                    <wcs-select-option value="option1" disabled>Apple</wcs-select-option>
                    <wcs-select-option value="option2">Banana</wcs-select-option>
                    <wcs-select-option value="option3">Peach</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // When
            await focusAutocompleteInput(select);
            await page.keyboard.press('ArrowUp');

            // Then
            const lastDisabledSelectOption = page.locator('wcs-select-option:not([disabled])').last();
            await expect(lastDisabledSelectOption).toHaveAttribute('highlighted', '');
        });

        test('focus first option on Arrow Down', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select autocomplete="">
                    <wcs-select-option value="option1" disabled>Apple</wcs-select-option>
                    <wcs-select-option value="option2">Banana</wcs-select-option>
                    <wcs-select-option value="option3">Peach</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // When
            await select.click();
            await page.keyboard.press('ArrowDown');
            const firstNotDisabledSelectOption = page.locator('wcs-select-option:not([disabled])').first();

            // Then
            await expect(select).toHaveClass(/expanded/);
            await expect(firstNotDisabledSelectOption).toHaveAttribute('highlighted', '');
        });

        test('replace text, close listbox, focus textbox on Enter', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select autocomplete="">
                    <wcs-select-option value="option1" disabled>Apple</wcs-select-option>
                    <wcs-select-option value="option2">Banana</wcs-select-option>
                    <wcs-select-option value="option3">Peach</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // When
            await select.click();
            await page.keyboard.press('ArrowDown');
            await expect(select).toHaveClass(/expanded/);
            const firstNotDisabledSelectOption = page.locator('wcs-select-option:not([disabled])').first();
            await expect(firstNotDisabledSelectOption).toHaveAttribute('highlighted', '');
            await expect(firstNotDisabledSelectOption).toHaveAttribute('value', 'option2');
            await page.keyboard.press('Enter');

            // Then
            await expect(select).not.toHaveClass(/expanded/);

            const nativeInput = page.locator('wcs-select input.autocomplete-field');
            await expect(nativeInput).toHaveValue('Banana');

            // Check input is focused
            await expect(nativeInput).toBeFocused();
        });

        test('cycle to next option when Arrow Down', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select autocomplete="">
                    <wcs-select-option value="option1" disabled>Apple</wcs-select-option>
                    <wcs-select-option value="option2">Banana</wcs-select-option>
                    <wcs-select-option value="option3">Peach</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // When
            await focusAutocompleteInput(select);
            await page.keyboard.press('ArrowDown'); // Going to option2
            await page.keyboard.press('ArrowDown'); // Going to option3
            await page.keyboard.press('ArrowDown'); // Going back to option2

            // Then
            const visuallyFocusedOption = page.locator('wcs-select-option[highlighted]');
            await expect(visuallyFocusedOption).toHaveAttribute('value', 'option2');
        });

        test('cycle to previous option when Arrow Up', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select autocomplete="">
                    <wcs-select-option value="option1" disabled>Apple</wcs-select-option>
                    <wcs-select-option value="option2">Banana</wcs-select-option>
                    <wcs-select-option value="option3">Peach</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // When
            await focusAutocompleteInput(select);
            const inputAutocomplete = select.locator('input.autocomplete-field');
            await expect(inputAutocomplete).toBeFocused();

            await page.keyboard.press('ArrowUp'); // Going to option3
            await page.keyboard.press('ArrowUp'); // Going to option2
            await page.keyboard.press('ArrowUp'); // Going back to option3

            // Then
            const visuallyFocusedOption = page.locator('wcs-select-option[highlighted]');
            await expect(visuallyFocusedOption).toHaveAttribute('value', 'option3');
        });

        test('focus textbox, filter listbox, remove visual focus from listbox when any printable character', async ({ page }: {
            page: E2EPage
        }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select autocomplete="">
                    <wcs-select-option value="option1" disabled>Apple</wcs-select-option>
                    <wcs-select-option value="option2">Banana</wcs-select-option>
                    <wcs-select-option value="option3">Peach</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');
            const inputAutocomplete = select.locator('input.autocomplete-field');

            // When
            await select.click();
            await expect(inputAutocomplete).toBeFocused();
            await page.keyboard.press('a');

            // Then
            // Check input is focused
            await expect(inputAutocomplete).toBeFocused();

            // Check filter is applied (fewer options visible)
            const visibleOptions = await page.locator('wcs-select-option:not([aria-hidden="true"])').count();
            expect(visibleOptions).toBeLessThan(3);

            // Check no option is highlighted
            const visuallyFocusedOption = page.locator('wcs-select-option[highlighted]');
            await expect(visuallyFocusedOption).toHaveCount(0);
        });

        test('close listbox, focus textbox on Escape', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select autocomplete="">
                    <wcs-select-option value="option1" disabled>Apple</wcs-select-option>
                    <wcs-select-option value="option2">Banana</wcs-select-option>
                    <wcs-select-option value="option3">Peach</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');

            // When
            await select.click();
            await expect(select).toHaveClass(/expanded/);
            await page.keyboard.press('Escape');

            // Then
            await expect(select).not.toHaveClass(/expanded/);
            const inputAutocomplete = select.locator('input.autocomplete-field');
            await expect(inputAutocomplete).toBeFocused();
        });

        test('focus textbox, move cursor when Left or Right Arrow', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select autocomplete="">
                    <wcs-select-option value="option1" disabled>Apple</wcs-select-option>
                    <wcs-select-option value="option2">Banana</wcs-select-option>
                    <wcs-select-option value="option3">Peach</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');
            const inputAutocomplete = select.locator('input.autocomplete-field');
            const typedText = 'test';

            // When
            await select.click();
            await expect(select).toHaveClass(/expanded/);
            await page.keyboard.type(typedText);
            await page.keyboard.press('ArrowLeft');
            await page.keyboard.press('ArrowRight');

            // Then
            await expect(inputAutocomplete).toBeFocused();
            const cursorPositionAfter = await select.evaluate((el: any) => {
                const input = el.shadowRoot?.querySelector('input.autocomplete-field') as HTMLInputElement;
                return input?.selectionStart;
            });
            expect(cursorPositionAfter).toBe(typedText.length);
        });

        test('focus textbox, move cursor to the start of the text when Home pressed', async ({ page }: {
            page: E2EPage
        }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select autocomplete="">
                    <wcs-select-option value="option1" disabled>Apple</wcs-select-option>
                    <wcs-select-option value="option2">Banana</wcs-select-option>
                    <wcs-select-option value="option3">Peach</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');
            const inputAutocomplete = select.locator('input.autocomplete-field');
            const typedText = 'test';

            // When
            await select.click();
            await page.keyboard.type(typedText);
            await page.keyboard.press('Home');

            // Then
            await expect(inputAutocomplete).toBeFocused();
            const cursorPositionAfter = await select.evaluate((el: any) => {
                const input = el.shadowRoot?.querySelector('input.autocomplete-field') as HTMLInputElement;
                return input?.selectionStart;
            });
            expect(cursorPositionAfter).toBe(0);
        });

        test('focus textbox, move cursor to the end of the text when End pressed', async ({ page }: {
            page: E2EPage
        }) => {
            // Given
            await setWcsContent(page, `
                <wcs-select autocomplete="">
                    <wcs-select-option value="option1" disabled>Apple</wcs-select-option>
                    <wcs-select-option value="option2">Banana</wcs-select-option>
                    <wcs-select-option value="option3">Peach</wcs-select-option>
                </wcs-select>
            `);
            const select = page.locator('wcs-select');
            const inputAutocomplete = select.locator('input.autocomplete-field');
            const typedText = 'test';

            // When
            await select.click();
            await page.keyboard.press('t');
            await page.keyboard.press('e');
            await page.keyboard.press('s');
            await page.keyboard.press('t');
            await page.keyboard.press('End');

            // Then
            await expect(inputAutocomplete).toBeFocused();
            const cursorPositionAfter = await select.evaluate((el: any) => {
                const input = el.shadowRoot?.querySelector('input.autocomplete-field') as HTMLInputElement;
                return input?.selectionStart;
            });
            expect(cursorPositionAfter).toBe(typedText.length);
        });
    });

    test('Should handle asynchronous options loading with an initial value and update the label', async ({ page }: {
        page: E2EPage
    }) => {
        // Given
        await setWcsContent(page, `
            <wcs-select value="2">
            </wcs-select>
        `);
        const select = page.locator('wcs-select');
        const label = page.locator('label').first();

        // Verify no label initially (element exists but has no text content)
        await expect(label).toHaveText('');

        // When - Add options dynamically
        await select.evaluate((el: any) => {
            el.innerHTML = `
                <wcs-select-option value="1">One</wcs-select-option>
                <wcs-select-option value="2">Two</wcs-select-option>
                <wcs-select-option value="3">Three</wcs-select-option>
                <wcs-select-option value="4">Four</wcs-select-option>
            `;
        });

        // Then - Verify label is updated
        await expect(label).toHaveText('Two');
    });

    test('[Multiple] Should handle asynchronous options loading with an initial value and update the label', async ({ page }: {
        page: E2EPage
    }) => {
        // Given
        await setWcsContent(page, `
            <wcs-select multiple>
            </wcs-select>
        `);
        const select = page.locator('wcs-select');
        const label = page.locator('label').first();

        await select.evaluate((el: any) => el.value = ['2', '3']);

        // Verify no label initially (element exists but has no text content)
        await expect(label).toHaveText('');

        // When - Add options dynamically
        await select.evaluate((el: any) => {
            el.innerHTML = `
                <wcs-select-option value="1">One</wcs-select-option>
                <wcs-select-option value="2">Two</wcs-select-option>
                <wcs-select-option value="3">Three</wcs-select-option>
                <wcs-select-option value="4">Four</wcs-select-option>
            `;
        });

        // Then - Verify label is updated
        await expect(label).toHaveText('Two, Three');
    });

    test('[ServerMode] Should synchronise selected value after slot change', async ({ page }: {
        page: E2EPage
    }) => {
        await setWcsContent(page, `
            <wcs-select autocomplete server-mode value="3">
                <wcs-select-option value="1">One</wcs-select-option>
                <wcs-select-option value="2">Two</wcs-select-option>
                <wcs-select-option value="3">Three</wcs-select-option>
                <wcs-select-option value="4">Four</wcs-select-option>
            </wcs-select>
        `);

        const options: ({ value: any; displayText: string })[] = [
            {
                value: '1',
                displayText: 'One'
            },
            {
                value: '2',
                displayText: 'Two'
            },
            {
                value: '3',
                displayText: 'Three'
            },
            {
                value: '4',
                displayText: 'Four'
            }
        ];

        const select = page.locator('wcs-select');
        const autocompleteInput = page.locator('input.autocomplete-field'); // initially the value is "Three"
        const optionThree = page.locator('wcs-select-option[value="3"]');

        await select.evaluate(
            (
                el: HTMLElement,
                options: ({ value: any; displayText: string })[],
            ) => {
                el.addEventListener('wcsFilterChange', (event: any) => {
                    const htmlSelectOptions = options
                        .filter((o) => o.displayText.toLowerCase().includes(event.detail.value.toLowerCase()))
                        .map((o) => `<wcs-select-option value="${o.value}">${o.displayText}</wcs-select-option>`);

                    el.innerHTML = htmlSelectOptions.join('');
                });
            },
            options,
        );

        await autocompleteInput.press('End'); // place at the end of input
        await autocompleteInput.press('Backspace'); // "Thre"
        await autocompleteInput.press('Backspace'); // "Thr"
        await page.waitForChanges();

        await expect(optionThree).toHaveAttribute('selected');
    });

    test('[ServerMode] Should not reset displayText if options are changes asynchronously', async ({ page }: {
        page: E2EPage
    }) => {
        await setWcsContent(page, `
            <wcs-select autocomplete server-mode>
            </wcs-select>
        `);
        const select = page.locator('wcs-select');
        await select.evaluate((el: any) => el.value = '2');
        await page.waitForChanges();

        const options: ({ value: any; displayText: string })[] = [
            {
                value: '1',
                displayText: 'One'
            },
            {
                value: '2',
                displayText: 'Two'
            },
            {
                value: '3',
                displayText: 'Three'
            },
            {
                value: '4',
                displayText: 'Four'
            }
        ];

        await select.evaluate(
            (
                el: HTMLElement,
                options: ({ value: any; displayText: string })[],
            ) => {
                el.addEventListener('wcsFilterChange', (event: any) => {
                    const htmlSelectOptions = options
                        .filter((o) => o.displayText.toLowerCase().includes(event.detail.value))
                        .map((o) => `<wcs-select-option value="${o.value}">${o.displayText}</wcs-select-option>`);
                    el.innerHTML = htmlSelectOptions.join('');
                });
            },
            options,
        );

        const autocompleteInput = select.locator('input.autocomplete-field');
        // Before options are asynchronously added, the input value should still be empty (no matching option yet)
        await expect(autocompleteInput).toHaveJSProperty('value', '');

        // Add options
        await page.$eval('wcs-select', (el: HTMLElement) => {
            el.innerHTML = `
            <wcs-select-option value="1">One</wcs-select-option>
            <wcs-select-option value="2">Two</wcs-select-option>
            <wcs-select-option value="3">Three</wcs-select-option>
            <wcs-select-option value="4">Four</wcs-select-option>
            `;
        });
        await page.waitForChanges();

        // After async insertion, the component should have propagated the displayText to the input value
        await expect(autocompleteInput).toHaveJSProperty('value', 'Two');

        await autocompleteInput.press('End'); // place at the end of input
        await autocompleteInput.press('Backspace'); // "Tw"
        await autocompleteInput.press('Backspace'); // "T"
        await autocompleteInput.press('Backspace'); // ""
        await autocompleteInput.press('o');
        await autocompleteInput.press('n');

        await page.waitForChanges();

        await select.evaluate((el: any) => el.value = '3');
        await page.waitForChanges();

        await expect(autocompleteInput).toHaveJSProperty('value', 'Three');
    });

    test('[ServerMode][Autocomplete] Emits filter change events while typing and when clearing after selection', async ({ page }: {
        page: E2EPage
    }) => {
        await setWcsContent(page, `
            <wcs-select autocomplete server-mode>
                <wcs-select-option value="ain">Ain</wcs-select-option>
                <wcs-select-option value="aude">Aude</wcs-select-option>
                <wcs-select-option value="ardeche">Ardèche</wcs-select-option>
                <wcs-select-option value="bas-rhin">Bas-Rhin</wcs-select-option>
            </wcs-select>
        `);
        const options: ({ value: any; displayText: string })[] = [
            {
                value: 'ain',
                displayText: 'Ain'
            },
            {
                value: 'aude',
                displayText: 'Aude'
            },
            {
                value: 'ardeche',
                displayText: 'Ardèche'
            },
            {
                value: 'bas-rhin',
                displayText: 'Bas-Rhin'
            }
        ];

        const select = page.locator('wcs-select');

        await select.evaluate((el: any) => el.open());
        await page.waitForChanges();

        await select.evaluate(
            (
                el: HTMLElement,
                options: ({ value: any; displayText: string })[],
            ) => {
                el.addEventListener('wcsFilterChange', (event: any) => {
                    const htmlSelectOptions = options
                        .filter((o) => o.displayText.toLowerCase().includes(event.detail.value.toLowerCase()))
                        .map((o) => `<wcs-select-option value="${o.value}">${o.displayText}</wcs-select-option>`);
                    el.innerHTML = htmlSelectOptions.join('');
                });
            },
            options,
        );

        const filterChangeSpy = await select.spyOnEvent('wcsFilterChange');

        const input = page.locator('input.autocomplete-field');

        // Type 'ain' to filter
        await input.press('a');
        await input.press('i');
        await input.press('n');
        await page.waitForChanges();

        expect(filterChangeSpy).toHaveReceivedEventTimes(3);
        expect(filterChangeSpy).toHaveNthReceivedEventDetail(0, { value: 'a' });
        expect(filterChangeSpy).toHaveNthReceivedEventDetail(1, { value: 'ai' });
        expect(filterChangeSpy).toHaveNthReceivedEventDetail(2, { value: 'ain' });

        // Select Ain: find option and click (should emit a filter event)
        const optionAin = page.locator('wcs-select > wcs-select-option[value="ain"]');
        expect(optionAin).not.toBeNull();
        await optionAin.click();
        await page.waitForChanges();
        // We ensure that we receive 3 typing events + 1 event of selection. It's important for consummers
        // in order to re-fetch the value of the selected option
        expect(filterChangeSpy).toHaveReceivedEventTimes(4);
        // Input value replaced by selected option label
        await expect(input).toHaveJSProperty('value', 'Ain');
        expect(filterChangeSpy).toHaveNthReceivedEventDetail(3, { value: 'Ain' });

        await input.press('Backspace'); // Ai
        await page.waitForChanges();
        expect(filterChangeSpy).toHaveNthReceivedEventDetail(4, { value: 'Ai' });

        await input.press('Backspace'); // A
        await page.waitForChanges();
        expect(filterChangeSpy).toHaveNthReceivedEventDetail(5, { value: 'A' });

        await input.press('Backspace'); // vide
        await page.waitForChanges();
        expect(filterChangeSpy).toHaveNthReceivedEventDetail(6, { value: '' });

        // Field must stay empty (no hydration after manual clear)
        await expect(input).toHaveJSProperty('value', '');
    });

    test('[ServerMode][Autocomplete] Should not override user input with the selected option label when the options list changes', async ({ page }: {
        page: E2EPage
    }) => {
        await setWcsContent(page, `
            <wcs-select autocomplete server-mode>
                <wcs-select-option value="ain">Ain</wcs-select-option>
                <wcs-select-option value="aude">Aude</wcs-select-option>
                <wcs-select-option value="ardeche">Ardèche</wcs-select-option>
                <wcs-select-option value="bas-rhin">Bas-Rhin</wcs-select-option>
            </wcs-select>
        `);

        const options: ({ value: any; displayText: string })[] = [
            {
                value: 'ain',
                displayText: 'Ain'
            },
            {
                value: 'aude',
                displayText: 'Aude'
            },
            {
                value: 'ardeche',
                displayText: 'Ardèche'
            },
            {
                value: 'bas-rhin',
                displayText: 'Bas-Rhin'
            }
        ];

        const select = page.locator('wcs-select');
        await select.evaluate((el: any) => el.value = 'ain');
        await page.waitForChanges();

        await select.evaluate(
            (
                el: HTMLElement,
                options: ({ value: any; displayText: string })[],
            ) => {
                el.addEventListener('wcsFilterChange', (event: any) => {
                    const htmlSelectOptions = options
                        .filter((o) => o.displayText.includes(event.detail.value))
                        .map((o) => `<wcs-select-option value="${o.value}">${o.displayText}</wcs-select-option>`);
                    el.innerHTML = htmlSelectOptions.join('');
                });
            },
            options,
        );

        const input = page.locator('input.autocomplete-field');

        // on sélectionne une valeur => autocomplete = valeur qu'on a sélectionné
        await expect(input).toHaveJSProperty('value', 'Ain');

        await input.press('End'); // place at the end of input
        await input.press('Backspace');
        await input.press('Backspace');
        await page.waitForChanges();

        await expect(input).toHaveJSProperty('value', 'A');
    });

    test('[ServerMode][Autocomplete] should display option label in input when dynamically adding options', async ({ page }: {
        page: E2EPage
    }) => {
        await setWcsContent(page, `
            <wcs-select autocomplete server-mode>
            </wcs-select>
        `);

        const select = page.locator('wcs-select');
        const input = page.locator('input.autocomplete-field');

        await select.evaluate((el: any) => el.value = '1');
        await page.waitForChanges();

        await expect(input).toHaveJSProperty('value', '');

        await page.$eval('wcs-select', (el: HTMLElement) => {
            el.innerHTML = `
                <wcs-select-option value="1">Un</wcs-select-option>
            `;
        });
        await page.waitForChanges();
        await expect(input).toHaveJSProperty('value', 'Un');

        await input.evaluate((el: any) => el.value = 'Trois');

        await select.evaluate((el: any) => el.value = '2');
        await page.waitForChanges();
        await expect(input).toHaveJSProperty('value', '');

        await page.$eval('wcs-select', (el: HTMLElement) => {
            el.innerHTML = `
                <wcs-select-option value="2">Deux</wcs-select-option>
            `;
        });
        await expect(input).toHaveJSProperty('value', 'Deux');
    });

    test('[ServerMode][Autocomplete] should restore selected option label on blur when current value is not in filtered options', async ({ page }: {
        page: E2EPage
    }) => {
        await setWcsContent(
            page,
            `
            <wcs-select autocomplete server-mode value="3">
                <wcs-select-option value="1">Un</wcs-select-option>
                <wcs-select-option value="2">Deux</wcs-select-option>
                <wcs-select-option value="3">Trois</wcs-select-option>
                <wcs-select-option value="4">Quatre</wcs-select-option>
                <wcs-select-option value="5">Cinq</wcs-select-option>
            </wcs-select>
            <button style="margin-top: 600px">Test</button>
        `
        );

        const options: ({ value: number; displayText: string })[] = [
            {
            value: 1,
            displayText: 'Un'
            },
            {
                value: 2,
                displayText: 'Deux'
            },
            {
                value: 3,
                displayText: 'Trois'
            },
            {
                value: 4,
                displayText: 'Quatre'
            },
            {
                value: 5,
                displayText: 'Cinq'
            },
            {
                value: 6,
                displayText: 'Six'
            },
        ];

        const select = page.locator('wcs-select');
        const button = page.locator('button');
        const input = page.locator('input.autocomplete-field');

        await select.evaluate(
            (
                el: HTMLElement,
                options: ({ value: number; displayText: string })[],
            ) => {
                el.addEventListener('wcsFilterChange', (event: any) => {
                    const htmlSelectOptions = options
                        .filter((o) => o.displayText.includes(event.detail.value))
                        .map((o) => `<wcs-select-option value="${o.value}">${o.displayText}</wcs-select-option>`);
                    el.innerHTML = htmlSelectOptions.join('');
                });
            },
            options,
        );

        await expect(input).toHaveJSProperty('value', 'Trois');

        await input.press('End'); // place at the end of input
        await input.press('Backspace'); // Troi
        await input.press('Backspace'); // tro
        await input.press('Backspace'); // tr
        await input.press('Backspace'); // t
        await input.press('Backspace'); //
        await input.press('u'); // u
        await page.waitForChanges();

        await expect(select).toHaveJSProperty('value', '3');
        await expect(input).toHaveJSProperty('value', 'u');

        await button.focus();
        await button.click(); // blur the select
        await expect(input).toHaveJSProperty('value', 'Trois');
    });

    test('[ServerMode][Autocomplete] should clear and restore input label when value is changed and options are updated during component lifecycle', async ({
                                                                                                                                                                page
                                                                                                                                                            }: {
        page: E2EPage;
    }) => {
        await setWcsContent(
            page,
            `
            <wcs-select autocomplete server-mode value="3">
            </wcs-select>
            <button style="margin-top: 600px">Test</button>
        `
        );

        const select = page.locator('wcs-select');
        const button = page.locator('button');
        const input = page.locator('input.autocomplete-field');

        await page.$eval('wcs-select', (el: HTMLElement) => {
            el.innerHTML = `
                <wcs-select-option value="1">Un</wcs-select-option>
                <wcs-select-option value="2">Deux</wcs-select-option>
                <wcs-select-option value="3">Trois</wcs-select-option>
            `;
        });
        await page.waitForChanges();

        await expect(select).toHaveJSProperty('value', '3');
        await expect(input).toHaveJSProperty('value', 'Trois');

        await input.press('End'); // place at the end of input
        await input.press('Backspace'); // Troi
        await input.press('Backspace'); // Tro

        await select.evaluate((el: any) => (el.value = '4'));

        await page.waitForChanges();

        await expect(select).toHaveJSProperty('value', '4');
        await expect(input).toHaveJSProperty('value', '');

        await page.$eval('wcs-select', (el: HTMLElement) => {
            el.innerHTML = `
                <wcs-select-option value="4">Quatre</wcs-select-option>
                <wcs-select-option value="5">Cinq</wcs-select-option>
                <wcs-select-option value="6">Six</wcs-select-option>
            `;
        });

        await page.waitForChanges();

        await expect(select).toHaveJSProperty('value', '4');
        await expect(input).toHaveJSProperty('value', 'Quatre');

        await button.focus();
        await expect(input).toHaveJSProperty('value', 'Quatre');
    });

    test('[ServerMode][Autocomplete] should assign the filter again and emit the filterChange event when the user reselects the current value after filtering', async ({ page }: {
        page: E2EPage;
    }) => {
        const options: ({ value: number; displayText: string })[] = [{
            value: 1,
            displayText: 'Ain'
        },
            {
                value: 2,
                displayText: 'Aisne'
            },
            {
                value: 3,
                displayText: 'Rhône'
            }
        ];

        await setWcsContent(
            page,
            `
            <wcs-select autocomplete server-mode>
                <wcs-select-option value="1">Ain</wcs-select-option>
                <wcs-select-option value="2">Aisne</wcs-select-option>
                <wcs-select-option value="3">Rhône</wcs-select-option>
            </wcs-select>
        `
        );

        const select = page.locator('wcs-select');
        const ainOption = page.locator('wcs-select-option[value="1"]');
        const aisneOption = page.locator('wcs-select-option[value="2"]');
        const rhoneOption = page.locator('wcs-select-option[value="3"]');
        const input = page.locator('input.autocomplete-field');

        await select.evaluate(
            (
                el: HTMLElement,
                options: ({ value: number; displayText: string })[],
            ) => {
                el.addEventListener('wcsFilterChange', (event: any) => {
                    const htmlSelectOptions = options
                        .filter((o) => o.displayText.includes(event.detail.value))
                        .map((o) => `<wcs-select-option value="${o.value}">${o.displayText}</wcs-select-option>`);
                    el.innerHTML = htmlSelectOptions.join('');
                });
            },
            options,
        );

        await select.click(); // open
        await aisneOption.click();

        await expect(select).toHaveJSProperty('value', '2');
        await expect(input).toHaveJSProperty('value', 'Aisne');

        await select.click(); // the select juste close because we select options open
        await page.waitForChanges();
        await expect(ainOption).not.toBeVisible();
        await expect(aisneOption).toBeVisible();
        await expect(rhoneOption).not.toBeVisible();

        await input.press('Backspace'); // Aisn
        await input.press('Backspace'); // Ais
        await input.press('Backspace'); // Ai
        await input.press('Backspace'); // A
        await input.press('Backspace'); //

        await expect(ainOption).toBeVisible();
        await expect(aisneOption).toBeVisible();
        await expect(rhoneOption).toBeVisible();

        await aisneOption.click();
        await select.click();
        await page.waitForChanges();

        await expect(ainOption).not.toBeVisible();
        await expect(aisneOption).toBeVisible();
        await expect(rhoneOption).not.toBeVisible();
    });

    test('[ServerMode][Autocomplete] should reset autocompleteValue to value when blurring', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(
            page,
            `
            <wcs-select autocomplete server-mode>
                <wcs-select-option value="1">Ain</wcs-select-option>
                <wcs-select-option value="2">Aisne</wcs-select-option>
                <wcs-select-option value="3">Rhône</wcs-select-option>
            </wcs-select>

            <button id="element-to-blur" style="margin: 500px">Blur me</button>
        `
        );
        const options: ({ value: number; displayText: string })[] = [{
            value: 1,
            displayText: 'Ain'
        },
            {
                value: 2,
                displayText: 'Aisne'
            },
            {
                value: 3,
                displayText: 'Rhône'
            }
        ];

        const select = page.locator('wcs-select');
        const ainOption = page.locator('wcs-select-option[value="1"]');
        const aisneOption = page.locator('wcs-select-option[value="2"]');
        const rhoneOption = page.locator('wcs-select-option[value="3"]');
        const input = page.locator('input.autocomplete-field');
        const blurButton = page.locator('#element-to-blur');

        await select.evaluate(
            (
                el: HTMLElement,
                options: ({ value: number; displayText: string })[],
            ) => {
                el.addEventListener('wcsFilterChange', (event: any) => {
                    const htmlSelectOptions = options
                        .filter((o) => o.displayText.includes(event.detail.value))
                        .map((o) => `<wcs-select-option value="${o.value}">${o.displayText}</wcs-select-option>`);
                    el.innerHTML = htmlSelectOptions.join('');
                });
            },
            options,
        );

        await select.click(); // open
        await aisneOption.click();
        await page.waitForChanges();

        await expect(select).toHaveJSProperty('value', '2');
        await expect(input).toHaveJSProperty('value', 'Aisne');

        await select.click(); // the select juste close because we select options open
        await page.waitForChanges();
        await expect(ainOption).not.toBeVisible();
        await expect(aisneOption).toBeVisible();
        await expect(rhoneOption).not.toBeVisible();

        await input.press('Backspace'); // Aisn
        await input.press('Backspace'); // Ais
        await input.press('Backspace'); // Ai
        await input.press('Backspace'); // A
        await input.press('Backspace'); //

        await expect(ainOption).toBeVisible();
        await expect(aisneOption).toBeVisible();
        await expect(rhoneOption).toBeVisible();

        await blurButton.click();

        await expect(select).toHaveJSProperty('value', '2');
        await expect(input).toHaveJSProperty('value', 'Aisne');

        await select.click();

        await expect(ainOption).not.toBeVisible();
        await expect(aisneOption).toBeVisible();
        await expect(rhoneOption).not.toBeVisible();
    });
});
