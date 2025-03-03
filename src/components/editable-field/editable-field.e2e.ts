import { newE2EPage } from '@stencil/core/testing';

describe('wcs-editable-field', () => {
    it('renders with input element and default props', async () => {
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-editable-field label="Test Input" value="Initial value" type="input" id="test">
                <wcs-input></wcs-input>
            </wcs-editable-field>
        `);
        
        const displayContainer = await page.find('wcs-editable-field >>> .display-container');
        expect(displayContainer).not.toBeNull();
        expect(displayContainer.textContent).toContain('Initial value');

        const label = await page.find('wcs-editable-field >>> .label');
        expect(label.textContent).toBe('Test Input');
    });

    it('transitions from DISPLAY to EDIT state when clicked', async () => {
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-editable-field label="Test Input" value="Initial value" type="input" id="test">
                <wcs-input></wcs-input>
            </wcs-editable-field>
        `);
        
        const displayContainer = await page.find('wcs-editable-field >>> .display-container');
        await displayContainer.click();
        
        // Wait for state transition
        await page.waitForChanges();
        
        const editContainer = await page.find('wcs-editable-field >>> .edit-container:not(.display-none)');
        expect(editContainer).not.toBeNull();
    });

    it('properly handles validation', async () => {
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-editable-field id="validate-test" label="Test Validation" value="Valid" error-msg="Value is invalid" type="input">
                <wcs-input></wcs-input>
            </wcs-editable-field>
        `);
        
        // Set up validation function
        await page.$eval('wcs-editable-field', (el) => {
            el.validateFn = (val) => val === 'Valid';
        });
        
        // Go to edit mode
        const displayContainer = await page.find('wcs-editable-field >>> .display-container');
        await displayContainer.click();
        await page.waitForChanges();
        
        // Input invalid value
        const input = await page.find('wcs-input');
        await input.type('Invalid');
        await page.waitForChanges();
        
        // Trigger validation (simulate Enter key)
        await input.press('Enter');
        await page.waitForChanges();
        
        // Check error message is displayed
        const errorElement = await page.find('wcs-editable-field >>> wcs-error');
        expect(errorElement).not.toBeNull();
        expect(errorElement.textContent).toBe('Value is invalid');
    });

    it('emits wcsChange event with correct data', async () => {
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-editable-field label="Test Events" value="Old value" type="input" id="event-test">
                <wcs-input id="test-input"></wcs-input>
            </wcs-editable-field>
        `);
        
        const changeEvent = await page.spyOnEvent('wcsChange');
        
        // Go to edit mode
        const displayContainer = await page.find('wcs-editable-field >>> .display-container');
        await displayContainer.click();
        await page.waitForChanges();
        
        // Input new value
        const input = await page.find('wcs-input');
        await input.press('Backspace'); // Clear value (backspace is easier than selecting all)
        await input.press('Backspace');
        await input.press('Backspace');
        await input.press('Backspace');
        await input.press('Backspace');
        await input.press('Backspace');
        await input.press('Backspace');
        await input.press('Backspace');
        await input.press('Backspace');
        await input.type('New value');
        await page.waitForChanges();
        
        // Submit the form
        await input.press('Enter');
        await page.waitForChanges();
        
        // Note: Functions defined in the event's detail object (successHandler and errorHandler)
        // are not cloned by the DOM's structured clone algorithm.
        // This means that when the event is emitted, these functions will not be present in the
        // event.detail object when accessed in E2E tests, even though they exist in the browser.
        expect(changeEvent).toHaveNthReceivedEventDetail(0, {
            newValue: 'New value'
        });
    });

    it('respects readonly property', async () => {
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-editable-field label="Read Only Field" value="Readonly value" readonly="true" type="input" id="test">
                <wcs-input></wcs-input>
            </wcs-editable-field>
        `);
        
        // Check readonly icon is displayed
        const readonlyIcon = await page.find('wcs-editable-field >>> .readonly-icon');
        expect(readonlyIcon).not.toBeNull();
        
        // Try clicking
        const displayContainer = await page.find('wcs-editable-field >>> .display-container');
        await displayContainer.click();
        await page.waitForChanges();
        
        // Should still be in display mode
        const editContainer = await page.find('wcs-editable-field >>> .edit-container:not(.display-none)');
        expect(editContainer).toBeNull();
    });

    it('works correctly with textarea', async () => {
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-editable-field label="Textarea Test" type="textarea" value="Multiline\nText" id="test">
                <wcs-textarea></wcs-textarea>
            </wcs-editable-field>
        `);
        
        // Check it renders correctly
        const displayContainer = await page.find('wcs-editable-field >>> .display-container');
        expect(displayContainer.textContent).toContain('Multiline\nText');
        
        // Go to edit mode
        await displayContainer.click();
        await page.waitForChanges();
        
        // Should need Ctrl+Enter to submit with textarea
        const textarea = await page.find('wcs-textarea');
        await textarea.press('Enter'); // This should NOT submit
        await page.waitForChanges();
        
        // Should still be in edit mode
        const editContainerVisible = await page.find('wcs-editable-field >>> .edit-container:not(.display-none)');
        expect(editContainerVisible).not.toBeNull();
    });

    it('works correctly with select', async () => {
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-editable-field label="Select Test" type="select" value="option1" id="test">
                <wcs-select>
                    <wcs-select-option value="option1">Option 1</wcs-select-option>
                    <wcs-select-option value="option2">Option 2</wcs-select-option>
                </wcs-select>
            </wcs-editable-field>
        `);
        
        // Go to edit mode
        const displayContainer = await page.find('wcs-editable-field >>> .display-container');
        await displayContainer.click();
        await page.waitForChanges();
        
        // We get the select element
        const select = await page.find('wcs-select');
        await select.focus();
        await select.press('ArrowDown');
        
        // press CTRL + ENTER (combined) to validate
        await page.keyboard.down('Control');
        await page.keyboard.press('Enter');
        await page.keyboard.up('Control');

        await page.waitForChanges();
        
        // Should be in load state after change
        const loadContainer = await page.find('wcs-editable-field >>> .load-container:not(.display-none)');
        expect(loadContainer).not.toBeNull();
    });

    it('properly handles custom formatting function', async () => {
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-editable-field id="format-test" label="Formatting Test" value="test value" type="input">
                <wcs-input></wcs-input>
            </wcs-editable-field>
        `);
        
        // Set custom formatter
        await page.$eval('wcs-editable-field', (el) => {
            el.formatFn = (val) => val ? val.toUpperCase() : '';
        });
        await page.waitForChanges();
        
        // Check formatted output
        const displayContainer = await page.find('wcs-editable-field >>> .display-container');
        expect(displayContainer.textContent).toContain('TEST VALUE');
    });
});