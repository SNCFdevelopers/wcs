import { setWcsContent } from '../../utils/playwright/test';
import { test, E2EPage } from "@stencil/playwright";

import { expect } from "@playwright/test";

test.describe('wcs-editable-field', () => {
    test('renders with input element and default props', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-editable-field label="Test Input" value="Initial value" type="input" id="test">
                <wcs-input></wcs-input>
            </wcs-editable-field>
        `);

        const displayContainer = page.locator('wcs-editable-field .display-container');
        await expect(displayContainer).toContainText('Initial value');

        const label = page.locator('wcs-editable-field .label');
        await expect(label).toHaveText('Test Input');
    });

    test('transitions from DISPLAY to EDIT state when clicked', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-editable-field label="Test Input" value="Initial value" type="input" id="test">
                <wcs-input></wcs-input>
            </wcs-editable-field>
        `);

        const displayContainer = page.locator('wcs-editable-field .display-container');
        await displayContainer.click();

        const editContainer = page.locator('wcs-editable-field .edit-container:not(.display-none)');
        await expect(editContainer).toBeVisible();
    });

    test('properly handles validation', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-editable-field id="validate-test" label="Test Validation" value="Valid" error-msg="Value is invalid" type="input">
                <wcs-input></wcs-input>
            </wcs-editable-field>
        `);

        // Set up validation function
        await page.evaluate(() => {
            const el = document.querySelector('wcs-editable-field') as any;
            el.validateFn = (val: string) => val === 'Valid';
        });

        // Go to edit mode
        const displayContainer = page.locator('wcs-editable-field .display-container');
        await displayContainer.click();

        // Input invalid value
        const wcsInput = page.locator('wcs-input');
        const nativeInput = page.locator('wcs-input input');
        await nativeInput.fill('Invalid');

        // Trigger validation (simulate Enter key)
        await wcsInput.press('Enter');
        await page.waitForChanges();

        // Check error message is displayed
        const errorElement = page.locator('wcs-editable-field wcs-error');
        await expect(errorElement).toBeVisible();
        await expect(errorElement).toHaveText('Value is invalid');
    });

    test('emits wcsChange event with correct data', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-editable-field label="Test Events" value="Old value" type="input" id="event-test">
                <wcs-input id="test-input"></wcs-input>
            </wcs-editable-field>
        `);

        const changeSpy = await page.spyOnEvent('wcsChange');

        // Go to edit mode
        const displayContainer = page.locator('wcs-editable-field .display-container');
        await displayContainer.click();
        await page.waitForChanges();

        const input = page.locator('wcs-input');
        await input.press('Backspace'); // Clear value (backspace is easier than selecting all)
        await input.pressSequentially('New value'); // send input event
        await page.waitForChanges();

        // Submit the form by pressing Enter
        await input.press('Enter');
        await page.waitForChanges();

        // Note: Functions defined in the event's detail object (successHandler and errorHandler)
        // are not cloned by the DOM's structured clone algorithm.
        // This means that when the event is emitted, these functions will not be present in the
        // event.detail object when accessed in E2E tests, even though they exist in the browser.

        expect(changeSpy).toHaveNthReceivedEventDetail(0, {
            newValue: 'New value',
            successHandler: undefined,
            errorHandler: undefined
        });
    });

    test('respects readonly property', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-editable-field label="Read Only Field" value="Readonly value" readonly="true" type="input" id="test">
                <wcs-input></wcs-input>
            </wcs-editable-field>
        `);

        // Check readonly icon is displayed
        const readonlyIcon = page.locator('wcs-editable-field .readonly-icon');
        await expect(readonlyIcon).toBeVisible();

        // Try clicking
        const displayContainer = page.locator('wcs-editable-field .display-container');
        await displayContainer.click();

        // Should still be in display mode
        const editContainer = page.locator('wcs-editable-field .edit-container:not(.display-none)');
        await expect(editContainer).toHaveCount(0);
    });

    test('works correctly with textarea', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-editable-field label="Textarea Test" type="textarea" value="Multiline\nText" id="test">
                <wcs-textarea></wcs-textarea>
            </wcs-editable-field>
        `);

        // Check it renders correctly
        const displayContainer = page.locator('wcs-editable-field .display-container');
        await expect(displayContainer).toContainText('Multiline\nText');

        // Go to edit mode
        await displayContainer.click();

        // Should need Ctrl+Enter to submit with textarea
        const textarea = page.locator('wcs-textarea');
        await textarea.press('Enter'); // This should NOT submit

        // Should still be in edit mode
        const editContainerVisible = page.locator('wcs-editable-field .edit-container:not(.display-none)');
        await expect(editContainerVisible).toBeVisible();
    });

    test('works correctly with select', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-editable-field label="Select Test" type="select" value="option1" id="test">
                <wcs-select>
                    <wcs-select-option value="option1">Option 1</wcs-select-option>
                    <wcs-select-option value="option2">Option 2</wcs-select-option>
                </wcs-select>
            </wcs-editable-field>
        `);

        // Go to edit mode
        const displayContainer = page.locator('wcs-editable-field .display-container');
        await displayContainer.click();

        // We get the select element
        const select = page.locator('wcs-select');
        await select.focus();
        await select.press('ArrowDown');

        // press CTRL + ENTER (combined) to validate
        await page.keyboard.down('Control');
        await page.keyboard.press('Enter');
        await page.keyboard.up('Control');
        await page.waitForChanges();

        // Should be in load state after change
        const loadContainer = page.locator('wcs-editable-field .load-container:not(.display-none)');
        await expect(loadContainer).toBeVisible();
    });

    test('properly handles custom formatting function', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-editable-field id="format-test" label="Formatting Test" value="test value" type="input">
                <wcs-input></wcs-input>
            </wcs-editable-field>
        `);

        // Set custom formatter
        await page.evaluate(() => {
            const el = document.querySelector('wcs-editable-field') as any;
            el.formatFn = (val: string) => val ? val.toUpperCase() : '';
        });

        // Check formatted output
        const displayContainer = page.locator('wcs-editable-field .display-container');
        await expect(displayContainer).toContainText('TEST VALUE');
    });

    test('displays correct input value after external value change', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-editable-field label="Test" value="old" type="input">
                <wcs-input></wcs-input>
            </wcs-editable-field>
        `);

        await page.evaluate(() => {
            (document.querySelector('wcs-editable-field') as any).value = 'new';
        });
        await page.waitForChanges();

        const displayValue = page.locator('wcs-editable-field .display-container span');
        await expect(displayValue).toHaveText('new');
    });

    test('syncs input value when entering edit mode after external value change', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-editable-field label="Test" value="old" type="input">
                <wcs-input></wcs-input>
            </wcs-editable-field>
        `);

        await page.evaluate(() => {
            (document.querySelector('wcs-editable-field') as any).value = 'new';
        });
        await page.waitForChanges();

        await page.locator('wcs-editable-field .display-container').click();
        await page.waitForChanges();

        const inputValue = await page.locator('wcs-input').evaluate((el: HTMLWcsInputElement) => el.value);
        expect(inputValue).toBe('new');
    });

    test('displays correct textarea value after external value change', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-editable-field label="Test" value="old" type="textarea">
                <wcs-textarea></wcs-textarea>
            </wcs-editable-field>
        `);

        await page.evaluate(() => {
            (document.querySelector('wcs-editable-field') as any).value = 'new';
        });
        await page.waitForChanges();

        const displayValue = page.locator('wcs-editable-field .display-container span');
        await expect(displayValue).toHaveText('new');
    });

    test('syncs textarea value when entering edit mode after external value change', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-editable-field label="Test" value="old" type="textarea">
                <wcs-textarea></wcs-textarea>
            </wcs-editable-field>
        `);

        await page.evaluate(() => {
            (document.querySelector('wcs-editable-field') as any).value = 'new';
        });
        await page.waitForChanges();

        await page.locator('wcs-editable-field .display-container').click();
        await page.waitForChanges();

        const textareaValue = await page.locator('wcs-textarea').evaluate((el: HTMLWcsTextareaElement) => el.value);
        expect(textareaValue).toBe('new');
    });

    test('displays correct select value after external value change', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-editable-field label="Test" value="1" type="select">
                <wcs-select>
                    <wcs-select-option value="1">Option 1</wcs-select-option>
                    <wcs-select-option value="2">Option 2</wcs-select-option>
                </wcs-select>
            </wcs-editable-field>
        `);

        await page.evaluate(() => {
            (document.querySelector('wcs-editable-field') as any).value = '2';
        });
        await page.waitForChanges();

        const displayValue = page.locator('wcs-editable-field .display-container span');
        await expect(displayValue).toHaveText('2');
    });

    test('syncs select value when entering edit mode after external value change', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-editable-field label="Test" value="1" type="select">
                <wcs-select>
                    <wcs-select-option value="1">Option 1</wcs-select-option>
                    <wcs-select-option value="2">Option 2</wcs-select-option>
                </wcs-select>
            </wcs-editable-field>
        `);

        await page.evaluate(() => {
            (document.querySelector('wcs-editable-field') as any).value = '2';
        });
        await page.waitForChanges();

        await page.locator('wcs-editable-field .display-container').click();
        await page.waitForChanges();

        const selectValue = await page.locator('wcs-select').evaluate((el: HTMLWcsSelectElement) => el.value);
        expect(selectValue).toBe('2');
    });
});
