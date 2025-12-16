import { Locator, expect } from "@playwright/test";
import { test, E2EPage } from '@stencil/playwright';
import { setWcsContent } from "../../utils/playwright/test";

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
        expect(changeSpy).toHaveReceivedEventDetail({ value: '1' });

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
        test("Musn't close when we select a value", async ({ page }: { page: E2EPage }) => {
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
            expect(changeSpy).toHaveNthReceivedEventDetail(1, { value: ['1', '2'] });
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
            expect(changeSpy).toHaveNthReceivedEventDetail(2, { value: ['2'] });
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
            expect(changeSpy).toHaveNthReceivedEventDetail(1, { value: ['1', '2'] });
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
            expect(changeSpy).toHaveFirstReceivedEventDetail({ value: 'option2' });
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
            expect(changeSpy).toHaveFirstReceivedEventDetail({ value: 'option3' });
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
            expect(changeSpy).toHaveFirstReceivedEventDetail({ value: 'option2' });
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

        test('focuses last selected option when opening with keyboard after programmatic value change', async ({ page }: { page: E2EPage }) => {
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
        test('close the overlay on Escape key pressed and focus select control', async ({ page }: { page: E2EPage }) => {
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

        test('close the overlay on Alt + ArrowUp keys pressed and focus select control', async ({ page }: { page: E2EPage }) => {
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
            expect(changeSpy).toHaveFirstReceivedEventDetail({ value: 'option2' });
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
        test('move focus into the first enabled option on Down Arrow key pressed', async ({ page }: { page: E2EPage }) => {
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

        test('focuses last selected option when opening with keyboard after programmatic value change', async ({ page }: { page: E2EPage }) => {
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
        expect(changeSpy).toHaveFirstReceivedEventDetail({ value: '1' });
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

    test('[Autocomplete] filter is cleared when the select value is set to a falsy value', async ({ page }: { page: E2EPage }) => {
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
        test('open listbox and move focus into the first enabled option on Arrow Down pressed', async ({ page }: { page: E2EPage }) => {
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

        test('Close overlay when an highlighted option is selected with Enter keypress', async ({ page }: { page: E2EPage }) => {
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

        test('focus textbox, filter listbox, remove visual focus from listbox when any printable character', async ({ page }: { page: E2EPage }) => {
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

        test('focus textbox, move cursor to the start of the text when Home pressed', async ({ page }: { page: E2EPage }) => {
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

        test('focus textbox, move cursor to the end of the text when End pressed', async ({ page }: { page: E2EPage }) => {
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

    test('Should handle asynchronous options loading with an initial value and update the label', async ({ page }: { page: E2EPage }) => {
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

    test('[Multiple] Should handle asynchronous options loading with an initial value and update the label', async ({ page }: { page: E2EPage }) => {
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
});
