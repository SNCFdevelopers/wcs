import { newE2EPage } from '@stencil/core/testing';

describe('Select component', () => {
    it('Expands when clicked', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-select>
                <wcs-select-option value="1">One</wcs-select-option>
            </wcs-select>
        `);
        const select = await page.find('wcs-select');

        // When
        await select.click();

        // Then
        expect(select).toHaveClass('expanded');
    });

    it('Expands using the open method', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-select>
                <wcs-select-option value="1">One</wcs-select-option>
            </wcs-select>
        `);
        const select = await page.find('wcs-select');

        // When
        await select.callMethod('open');
        await page.waitForChanges();

        // Then
        expect(select).toHaveClass('expanded');
    });

    it('Closes using the open method', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-select>
                <wcs-select-option value="1">One</wcs-select-option>
            </wcs-select>
        `);
        const select = await page.find('wcs-select');

        // When
        await select.click();
        await select.callMethod('close');
        await page.waitForChanges();

        // Then
        expect(select).not.toHaveClass('expanded');
    });

    it('Closes when user click outside', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-select>
                <wcs-select-option value="1">One</wcs-select-option>
            </wcs-select>
            <div class="outside"></div>
        `);
        const select = await page.find('wcs-select');

        // When
        await select.click();
        // XXX: Page.click() doesn't work
        await page.$eval('div.outside', (elem: HTMLDivElement) => elem.click());
        await page.waitForChanges();

        // Then
        expect(select).not.toHaveClass('expanded');
    });

    it('Closes when user click on another select', async () => {
        // Given
        const page = await newE2EPage();
        await page.setViewport({width: 1024, height: 1600});
        await page.setContent(`
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
        const select1 = await page.find('#select-1');
        const select2 = await page.find('#select-2');

        // When
        await select1.click();
        await page.waitForChanges();

        // Then
        expect(select1).toHaveClass('expanded');

        await select2.click(); // select another select component in page
        expect(select1).not.toHaveClass('expanded');
        expect(select2).toHaveClass('expanded');
    });

    it('Let us select a value and fire event correctly', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-select>
                <wcs-select-option value="1">One</wcs-select-option>
            </wcs-select>
        `);
        const select = await page.find('wcs-select');
        const firstSelectOption = await page.find('wcs-select > wcs-select-option');
        const label = await page.find('wcs-select >>> label');
        const changeSpy = await select.spyOnEvent('wcsChange');

        // When
        await select.click();
        await firstSelectOption.click();
        await page.waitForChanges();

        // Then
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(changeSpy).toHaveReceivedEventDetail({ value: '1' });
        expect(label.innerText).toBe('One');
    });

    describe('select event', () => {
        it('should not emit event if we set the value in js', async () => {
            // Given
            const page = await newE2EPage({
                html: `
                <wcs-select value="1">
                    <wcs-select-option value="1">One</wcs-select-option>
                    <wcs-select-option value="2">Two</wcs-select-option>
                </wcs-select>
            `
            });
            const select = await page.find('wcs-select');
            const changeSpy = await select.spyOnEvent('wcsChange');

            // When
            await select.setProperty('value', '2');
            await page.waitForChanges();

            // Then
            expect(changeSpy).toHaveReceivedEventTimes(0);
        });
    });

    describe('setSelectedValue', () => {
        it('Let user change selected value programmatically', async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                <wcs-select>
                    <wcs-select-option value="1">One</wcs-select-option>
                    <wcs-select-option value="2">Two</wcs-select-option>
                </wcs-select>
            `);
            const select = await page.find('wcs-select');

            // When
            await select.setProperty('value', '2');
            await page.waitForChanges();

            // Then
            expect(select.shadowRoot.querySelector('.wcs-select-value')).toEqualText("Two");
        });

        it('Let user change selected values programmatically', async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                <wcs-select multiple>
                    <wcs-select-option value="1">One</wcs-select-option>
                    <wcs-select-option value="2">Two</wcs-select-option>
                    <wcs-select-option value="3">Three</wcs-select-option>
                </wcs-select>
            `);
            const select = await page.find('wcs-select');

            // When
            const newValue = ['2', '3'];
            await select.setProperty('value', newValue);
            await page.waitForChanges();

            // Then
            expect(select.shadowRoot.querySelector('.wcs-select-value')).toEqualText("Two, Three");
        });
    });


    it('Is focusable', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-select>
                <wcs-select-option value="1">One</wcs-select-option>
            </wcs-select>
        `);
        const select = await page.find('wcs-select');

        // When
        await select.focus();
        const focusedEl = await page.find('wcs-select:focus');

        // Then
        expect(focusedEl).toBeDefined();
    });

    it('[Autocomplete] Input field is focusable', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-select autocomplete="true">
                <wcs-select-option value="1">One</wcs-select-option>
            </wcs-select>
        `);
        const select = await page.find('wcs-select');

        // When
        await select.focus();
        const focusedEl = await page.find('wcs-select > input.autocomplete-field:focus');

        // Then
        expect(focusedEl).toBeDefined();
    })

    it(`Propagate wcsSelectChangeEvent when a new value is selected`, async () => {
        // Given
        const page = await newE2EPage({
            html: `
                <wcs-select>
                    <wcs-select-option value="1">One</wcs-select-option>
                </wcs-select>
            `
        });
        const select = await page.find('wcs-select');
        const opt = await page.find('wcs-select > wcs-select-option');
        const changeSpy = await select.spyOnEvent('wcsChange');
        // When
        await select.click();
        await opt.click();
        await page.waitForChanges();

        // Then
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(changeSpy).toHaveReceivedEventDetail({ value: '1' });
    });

    xit(`Can have pre-selected option`, async () => {
        // TODO:
    });

    describe('Disabled', () => {
        it('Must not expand when disabled', async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                <wcs-select disabled>
                    <wcs-select-option value="1">One</wcs-select-option>
                </wcs-select>
            `);
            const select = await page.find('wcs-select');

            // When
            await select.click();

            // Then
            expect(select).not.toHaveClass('expanded');
        });

        it('Is not focusable when disabled', async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                <wcs-select disabled>
                    <wcs-select-option value="1">One</wcs-select-option>
                </wcs-select>
            `);
            const select = await page.find('wcs-select');

            // When
            await select.focus();
            const focusedEl = await page.find('wcs-select:focus');

            // Then
            expect(focusedEl).toBeNull();
        });
    });

    describe('Options', () => {
        it('Adds selected attribute to selected option', async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                <wcs-select>
                    <wcs-select-option value="1">One</wcs-select-option>
                </wcs-select>
            `);
            const select = await page.find('wcs-select');
            const option = await page.find('wcs-select > wcs-select-option');

            // When
            await select.click();
            await option.click();
            await page.waitForChanges();

            // Then
            expect(option).toHaveAttribute('selected');
        });

        it(`Removes selected attribute from previously selected options`, async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                <wcs-select>
                    <wcs-select-option value="1">One</wcs-select-option>
                    <wcs-select-option value="2">Two</wcs-select-option>
                </wcs-select>
            `);
            const select = await page.find('wcs-select');
            const [opt1, opt2] = (await page.findAll('wcs-select > wcs-select-option'));

            // When
            await select.click();
            await opt1.click();
            await select.click(); // As it is not multiple we need to open it once again
            await opt2.click();
            await page.waitForChanges();

            // Then
            expect(opt1).not.toHaveAttribute('selected');
            expect(opt2).toHaveAttribute('selected');
        });

        it(`Must not let a user select a disabled option`, async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                <wcs-select>
                    <wcs-select-option value="1" disabled>One</wcs-select-option>
                </wcs-select>
            `);
            const select = await page.find('wcs-select');
            const option = await page.find('wcs-select > wcs-select-option');

            // When
            await select.click();
            await option.click();
            await page.waitForChanges();

            // Then
            expect(select).not.toHaveAttribute('value');
        });
    });

    describe('Multiple', () => {
        it(`Musn't close when we select a value`, async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                <wcs-select multiple>
                    <wcs-select-option value="1">One</wcs-select-option>
                </wcs-select>
            `);
            const select = await page.find('wcs-select');
            const firstSelectOption = await page.find('wcs-select > wcs-select-option');

            // When
            await select.click();
            await firstSelectOption.click();
            await page.waitForChanges();

            // Then
            expect(select).toHaveClass('expanded');
        });

        it(`Allows to select multiple values`, async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                <wcs-select multiple>
                    <wcs-select-option value="1">One</wcs-select-option>
                    <wcs-select-option value="2">Two</wcs-select-option>
                </wcs-select>
            `);
            const select = await page.find('wcs-select');
            const changeSpy = await select.spyOnEvent('wcsChange');
            const [opt1, opt2] = (await page.findAll('wcs-select > wcs-select-option'));

            // When
            await select.click();
            await opt1.click();
            await opt2.click();
            await page.waitForChanges();

            // Then
            expect(changeSpy).toHaveReceivedEventTimes(2);
            expect(changeSpy).toHaveReceivedEventDetail({ value: ['1', '2'] });
        });


        it('Allows to unselect a value', async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                <wcs-select multiple>
                    <wcs-select-option value="1">One</wcs-select-option>
                    <wcs-select-option value="2">Two</wcs-select-option>
                    <wcs-select-option value="3">Three</wcs-select-option>
                </wcs-select>
            `);
            const select = await page.find('wcs-select');
            const changeSpy = await select.spyOnEvent('wcsChange');
            const [opt1, opt2] = (await page.findAll('wcs-select > wcs-select-option'));

            // When
            await select.click();
            await opt1.click();
            await opt2.click();
            await opt1.click();
            await page.waitForChanges();

            // Then
            expect(changeSpy).toHaveReceivedEventTimes(3);
            expect(changeSpy).toHaveReceivedEventDetail({ value: ['2'] });
        });
        it(`Displays all values separated by a comma`, async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                <wcs-select multiple>
                    <wcs-select-option value="1">One</wcs-select-option>
                    <wcs-select-option value="2">Two</wcs-select-option>
                    <wcs-select-option value="3">Three</wcs-select-option>
                </wcs-select>
            `);
            const select = await page.find('wcs-select');
            const [opt1, opt2, opt3] = (await page.findAll('wcs-select > wcs-select-option'));
            const label = await page.find('wcs-select >>> label');

            // When
            await select.click();
            await opt1.click();
            await opt2.click();
            await opt3.click();
            await page.waitForChanges();

            // Then
            expect(label.innerText).toEqual('One, Two, Three');
        });

        it(`Tells the option that they should display as multiple`, async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                <wcs-select multiple>
                    <wcs-select-option value="1">One</wcs-select-option>
                </wcs-select>
            `);
            const option = await page.find('wcs-select > wcs-select-option');

            // When
            await page.waitForChanges();

            // Then
            expect(option).toHaveAttribute('multiple');
        });

        it(`Propagate event when values are select`, async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                <wcs-select multiple>
                    <wcs-select-option value="1">One</wcs-select-option>
                    <wcs-select-option value="2">Two</wcs-select-option>
                </wcs-select>
            `);
            const select = await page.find('wcs-select');
            const [opt1, opt2] = (await page.findAll('wcs-select > wcs-select-option'));
            const changeSpy = await select.spyOnEvent('wcsChange');

            // When
            await select.click();
            await opt1.click();
            await opt2.click();

            // Then
            expect(changeSpy).toHaveReceivedEventTimes(2);
            expect(changeSpy).toHaveReceivedEventDetail({ value: ['1', '2'] });
        });
    });

    describe('Keyboard navigation when select is closed and not multiple', () => {
        let page;
        let wcsSelect;

        beforeEach(async () => {
            // Given
            page = await newE2EPage();
            await page.setContent(`
              <wcs-select>
                <wcs-select-option value="option1" disabled>Option 1</wcs-select-option>
                <wcs-select-option value="option2">Option 2</wcs-select-option>
                <wcs-select-option value="option3">Option 3</wcs-select-option>
              </wcs-select>
            `);
            wcsSelect = await page.find('wcs-select');
        });

        it('select value of first option enabled on Down Arrow key pressed', async () => {
            // Given
            const firstDisplayedValueOfEnableOption = "Option 2";
            const firstValueOfEnableOption = "option2";
            const displayValue: HTMLLabelElement = await page.find('wcs-select >>> label');
            const changeSpy = await wcsSelect.spyOnEvent('wcsChange');

            // When
            await wcsSelect.focus();
            await page.keyboard.press('ArrowDown');
            await page.waitForChanges();

            // Then
            expect(displayValue.innerText).toEqual(firstDisplayedValueOfEnableOption);
            expect(changeSpy).toHaveReceivedEventTimes(1);
            expect(changeSpy).toHaveReceivedEventDetail({ value: firstValueOfEnableOption });
        });
        it('select value of last option enabled on PageDown key pressed', async () => {
            // Given
            const lastValueOfEnableOption = "Option 3";
            const displayValue: HTMLLabelElement = await page.find('wcs-select >>> label');
            const changeSpy = await wcsSelect.spyOnEvent('wcsChange');

            // When
            await wcsSelect.focus();
            await page.keyboard.press('PageDown');
            await page.waitForChanges();

            // Then
            expect(displayValue.innerText).toEqual(lastValueOfEnableOption);
            expect(changeSpy).toHaveReceivedEventTimes(1);
            expect(changeSpy).toHaveReceivedEventDetail({ value: 'option3' });
        });
        it('select value of first option enabled on PageUp key pressed', async () => {
            // Given
            const fistDisplayedValueOfEnableOption = "Option 2";
            const firstValueOfEnableOption = "option2";
            const displayValue: HTMLLabelElement = await page.find('wcs-select >>> label');
            const changeSpy = await wcsSelect.spyOnEvent('wcsChange');

            // When
            await wcsSelect.focus();
            await page.keyboard.press('PageUp');
            await page.waitForChanges();

            // Then
            expect(displayValue.innerText).toEqual(fistDisplayedValueOfEnableOption);
            expect(changeSpy).toHaveReceivedEventTimes(1);
            expect(changeSpy).toHaveReceivedEventDetail({ value: firstValueOfEnableOption });
        });
        it('open the overlay on Enter key press', async () => {
            // When
            await wcsSelect.focus();
            await page.keyboard.press('Enter');
            await page.waitForChanges();

            // Then
            expect(wcsSelect).toHaveClass("expanded");
        });
        it('open the overlay on Alt + Down Arrow key pressed', async () => {
            // When
            await wcsSelect.focus();
            await page.keyboard.down('Alt');
            await page.keyboard.press('ArrowDown');
            await page.keyboard.up('Alt');
            await page.waitForChanges();

            // Then
            expect(wcsSelect).toHaveClass("expanded");

        });
    });
    describe('Keyboard navigation when select is opened and not multiple', () => {
        let page;
        let wcsSelect;
        let selectOptions;

        beforeEach(async () => {
            // Given
            page = await newE2EPage();
            await page.setContent(`
              <wcs-select>
                <wcs-select-option value="option1" disabled>Option 1</wcs-select-option>
                <wcs-select-option value="option2">Option 2</wcs-select-option>
                <wcs-select-option value="option3">Option 3</wcs-select-option>
              </wcs-select>
            `);
            wcsSelect = await page.find('wcs-select');
            selectOptions = await page.findAll('wcs-select > wcs-select-option');
            // Open by default the overlay for each test
            await wcsSelect.focus();
            await page.keyboard.press('Enter');
            await page.waitForChanges();
        });

        it('close the overlay on Escape key pressed and focus select control', async () => {
            // Given
            // The overlay is open (makes in beforeEach)

            // When
            await page.keyboard.press('Escape');
            const focusedEl = await page.find('wcs-select:focus');
            await page.waitForChanges();

            // Then
            expect(wcsSelect).not.toHaveClass("expanded");
            expect(focusedEl).toBeDefined();
        });

        it('close the overlay on Alt + ArrowUp keys pressed and focus select control', async () => {
            // Given
            // The overlay is open (makes in beforeEach)

            // When
            await page.keyboard.down('Alt');
            await page.keyboard.press('ArrowUp');
            await page.keyboard.up('Alt');
            const focusedEl = await page.find('wcs-select:focus');
            await page.waitForChanges();

            // Then
            expect(wcsSelect).not.toHaveClass("expanded");
            expect(focusedEl).toBeDefined();
        });
        it('close the overlay on Tab key pressed', async () => {
            // Given
            // The overlay is open (makes in beforeEach)

            // When
            await page.keyboard.press('Tab');
            const focusedEl = await page.find('wcs-select:focus');
            await page.waitForChanges();

            // Then
            expect(wcsSelect).not.toHaveClass("expanded");
            expect(focusedEl).toBeDefined();
        });
        it('close the overlay on Tab + Shift keys pressed', async () => {
            // Given
            // The overlay is open (makes in beforeEach)

            // When
            await page.keyboard.down('Shift');
            await page.keyboard.press('Tab');
            await page.keyboard.up('Shift');
            await page.waitForChanges();

            // Then
            expect(wcsSelect).not.toHaveClass("expanded");
            const focusedSelect = await page.find('wcs-select:focus');
            expect(focusedSelect).toBeDefined();
        });
        it('choose the current option on Enter key pressed', async () => {
            // Given
            // The overlay is open (makes in beforeEach)
            const firstDisplayedValueOfEnableOption = "Option 2";
            const firstValueOfEnabledOption = "option2";
            const displayValue: HTMLLabelElement = await page.find('wcs-select >>> label');
            const changeSpy = await wcsSelect.spyOnEvent('wcsChange');

            // When
            await page.keyboard.press('Enter');
            await page.waitForChanges();

            // Then
            expect(displayValue.innerText).toEqual(firstDisplayedValueOfEnableOption);
            expect(changeSpy).toHaveReceivedEventTimes(1);
            expect(changeSpy).toHaveReceivedEventDetail({ value: firstValueOfEnabledOption });
        });
        it('move focus to next option on Down Arrow key down', async () => {
            // Given
            // The overlay is open (makes in beforeEach)
            const nextValueOfEnableOption = selectOptions[2];
            const changeSpy = await wcsSelect.spyOnEvent('wcsChange');

            // When
            await page.keyboard.press('ArrowDown');
            const focusedOption = await page.find('wcs-select-option:focus');

            // Then
            expect(focusedOption.value).toEqual(nextValueOfEnableOption.value);
            expect(changeSpy).toHaveReceivedEventTimes(0)
        });
    });
    describe('Keyboard navigation when select is closed and multiple', () => {
        let page;
        let wcsSelect;
        let selectOptions;

        beforeEach(async () => {
            // Given
            page = await newE2EPage();
            await page.setContent(`
              <wcs-select multiple="">
                <wcs-select-option value="option1" disabled>Option 1</wcs-select-option>
                <wcs-select-option value="option2">Option 2</wcs-select-option>
                <wcs-select-option value="option3">Option 3</wcs-select-option>
              </wcs-select>
            `);
            wcsSelect = await page.find('wcs-select');
            selectOptions = await page.findAll('wcs-select > wcs-select-option');
        });

        it('move focus into the first enabled option on Down Arrow key pressed', async () => {
            // Given
            const firstOptionEnabled = selectOptions[1];
            const changeSpy = await wcsSelect.spyOnEvent('wcsChange');

            // When
            await wcsSelect.focus();
            await page.keyboard.press('ArrowDown');
            await page.waitForChanges();

            // Then
            const focusedOption = await page.find('wcs-select-option:focus');
            expect(focusedOption).toEqual(firstOptionEnabled);
            expect(changeSpy).toHaveReceivedEventTimes(0)
        });
        it('move focus into the first enabled option on Enter key pressed', async () => {
            // Given
            const firstOptionEnabled = selectOptions[1];
            const changeSpy = await wcsSelect.spyOnEvent('wcsChange');

            // When
            await wcsSelect.focus();
            await page.keyboard.press('Enter');
            await page.waitForChanges();

            // Then
            const focusedOption = await page.find('wcs-select-option:focus');
            expect(focusedOption).toEqual(firstOptionEnabled);
            expect(changeSpy).toHaveReceivedEventTimes(0)
        });
    });
    describe('Keyboard navigation when select opened and multiple', () => {
        let page;
        let wcsSelect;

        beforeEach(async () => {
            // Given
            page = await newE2EPage();
            await page.setContent(`
              <wcs-select multiple="">
                <wcs-select-option value="option1" disabled>Option 1</wcs-select-option>
                <wcs-select-option value="option2">Option 2</wcs-select-option>
                <wcs-select-option value="option3">Option 3</wcs-select-option>
              </wcs-select>
            `);
            wcsSelect = await page.find('wcs-select');
            // Open by default the overlay for each test
            await wcsSelect.focus();
            await page.keyboard.press('Enter');
            await page.waitForChanges();
        });

        it('close the overlay on Tab key pressed and not focus an checkbox', async () => {
            // Given
            // The overlay is open (makes in beforeEach)

            // When
            await page.keyboard.press('Tab');
            const focusedEl = await page.find('wcs-select:focus');
            await page.waitForChanges();

            // Then
            expect(wcsSelect).not.toHaveClass("expanded");
            expect(focusedEl).toBeDefined();
        });
    });
    //region Autocomplete tests
    describe('[Autocomplete] Keyboard navigation when select closed', () => {
        let page;
        let wcsSelect;
        let selectOptions;
        let wcsAutocompleteInput;

        beforeEach(async () => {
            // Given
            page = await newE2EPage();
            await page.setContent(`
              <wcs-select autocomplete="">
                <wcs-select-option value="option1" disabled>Option 1</wcs-select-option>
                <wcs-select-option value="option2">Option 2</wcs-select-option>
                <wcs-select-option value="option3">Option 3</wcs-select-option>
              </wcs-select>
            `);
            wcsSelect = await page.find('wcs-select');
            selectOptions = await page.findAll('wcs-select > wcs-select-option');
            wcsAutocompleteInput = await page.find('wcs-select >>> input.autocomplete-field');
        });

        it('open listbox and move focus into the first enabled option on Arrow Down pressed', async () => {
           const firstOptionEnabled = selectOptions[1];

            // When
            await wcsSelect.focus();
            await page.keyboard.press('ArrowDown');
            await page.waitForChanges();

            // Then
            const visuallyFocusedOption = await page.find('wcs-select-option[highlighted]');
            expect(visuallyFocusedOption).toEqual(firstOptionEnabled);
            expect(wcsSelect).toHaveClass("expanded");
        });

        it('open listbox without moveing on Alt + Arrow Down pressed', async () => {
            // When
            await wcsSelect.focus();
            await page.keyboard.down('Alt');
            await page.keyboard.press('ArrowDown');
            await page.keyboard.up('Alt');
            await page.waitForChanges();

            // Then
            const anyVisuallyFocusedOption= await page.find('wcs-select-option[highlighted]');
            expect(wcsSelect).toHaveClass("expanded");
            expect(anyVisuallyFocusedOption).toBeNull();
        });
        it('clear textbox on Escape pressed', async () => {
            // Given
            await wcsAutocompleteInput.type('test');
            await page.waitForChanges();

            // When
            await wcsAutocompleteInput.click();
            await page.keyboard.press('Escape');
            await page.waitForChanges();

            // Then
            const value = await wcsAutocompleteInput.getProperty('value');
            expect(value).toEqual('');
        });
    });
    describe('[Autocomplete] Keyboard navigation when select expanded', () => {
        let page;
        let wcsSelect;
        let selectOptions;
        let autocompleteInput;

        beforeEach(async () => {
            // Given
            page = await newE2EPage();
            await page.setContent(`
              <wcs-select autocomplete="">
                <wcs-select-option value="option1" disabled>Apple</wcs-select-option>
                <wcs-select-option value="option2">Banana</wcs-select-option>
                <wcs-select-option value="option3">Peach</wcs-select-option>
              </wcs-select>
            `);
            wcsSelect = await page.find('wcs-select');
            selectOptions = await page.findAll('wcs-select > wcs-select-option');
            autocompleteInput = await page.find('wcs-select >>> input.autocomplete-field');
        });

        it('close listbox on Escape', async () => {
            // When
            await autocompleteInput.click();
            await page.keyboard.press('Escape');
            await page.waitForChanges();

            // Then
            expect(wcsSelect).not.toHaveClass("expanded");
        });
        it('stay opened on Enter when no option are highlighted', async () => {
            // When
            await autocompleteInput.click();
            await page.waitForChanges();
            await page.keyboard.press('Enter');
            await page.waitForChanges();

            // Then
            expect(wcsSelect).toHaveClass("expanded");
        });
        it('Close overlay when an highlighted option is selected with Enter keypress', async () => {
            // When
            await autocompleteInput.click();
            await page.waitForChanges();
            await page.keyboard.press('ArrowDown');
            await page.waitForChanges();
            await page.keyboard.press('Enter');
            await page.waitForChanges();

            // Then
            expect(wcsSelect).not.toHaveClass("expanded");
        });
        it('focus last option on Arrow Up', async () => {
            // Given
            const lastOption = selectOptions[selectOptions.length - 1];

            // When
            await autocompleteInput.focus();
            await page.keyboard.press('ArrowUp');
            await page.waitForChanges();

            // Then
            const visuallyFocusedOption = await page.find('wcs-select-option[highlighted]');
            expect(visuallyFocusedOption).toEqual(lastOption);
        });
        it('focus first option on Arrow Down', async () => {
            // Given
            const firstOption = selectOptions[1]; // Because first option is disabled

            // When
            await autocompleteInput.focus();
            await page.keyboard.press('ArrowDown');
            await page.waitForChanges();

            // Then
            const visuallyFocusedOption = await page.find('wcs-select-option[highlighted]');
            expect(visuallyFocusedOption).toEqual(firstOption);
        });
        it('replace text, close listbox, focus textbox on Enter', async () => {
            // Given
            const firstOption = selectOptions[1]; // Because first option is disabled

            // When
            await autocompleteInput.focus();
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('Enter');
            await page.waitForChanges();

            // Then
            expect(await autocompleteInput.getProperty('value')).toEqual(firstOption.textContent);
            expect(wcsSelect).not.toHaveClass("expanded");
            const focusedInput = await page.find('wcs-select > input.autocomplete-field:focus');
            expect(focusedInput).toBeDefined();
        });
        it('close listbox, focus textbox on Escape', async () => {
            // When
            await page.keyboard.press('Escape');
            await page.waitForChanges();

            // Then
            expect(wcsSelect).not.toHaveClass("expanded");
            const focusedInput = await page.find('wcs-select > input.autocomplete-field:focus');
            expect(focusedInput).toBeDefined();
        });
        it('cycle to next option when Arrow Down', async () => {
            // Given
            const firstSelectableOption = selectOptions[1];

            // When
            await wcsSelect.focus();
            await page.keyboard.press('ArrowDown'); // Going to option[1]
            await page.keyboard.press('ArrowDown'); // Going to option[2]
            await page.keyboard.press('ArrowDown'); // Going back to option[1]
            await page.waitForChanges();

            // Then
            const visuallyFocusedOption = await page.find('wcs-select-option[highlighted]');
            expect(visuallyFocusedOption).toEqual(firstSelectableOption);
        });
        it('cycle to previous option when Arrow Up', async () => {
            // Given
            const lastSelectableOption = selectOptions[2];

            // When
            await wcsSelect.focus();
            await page.keyboard.press('ArrowUp'); // Going to option[2]
            await page.keyboard.press('ArrowUp'); // Going to option[1]
            await page.keyboard.press('ArrowUp'); // Going back to option[2]
            await page.waitForChanges();

            // Then
            const visuallyFocusedOption = await page.find('wcs-select-option[highlighted]');
            expect(visuallyFocusedOption).toEqual(lastSelectableOption);
        });
        it('focus textbox, move cursor when Left or Right Arrow', async () => {
            // Given
            const typedText = 'test';

            // When
            await wcsSelect.focus();
            await autocompleteInput.type(typedText);
            await page.keyboard.press('ArrowLeft');
            await page.keyboard.press('ArrowRight');
            await page.waitForChanges();

            // Then
            const cursorPositionAfter = await autocompleteInput.getProperty('selectionStart');
            expect(cursorPositionAfter).toEqual(typedText.length);
            const focusedInput = await page.find('wcs-select > input.autocomplete-field:focus');
            expect(focusedInput).toBeDefined();
        });
        it('focus textbox, move cursor to the start of the text when Home pressed', async () => {
            // Given
            const typedText = 'test';

            // When
            await autocompleteInput.type(typedText);
            await page.keyboard.press('Home');
            await page.waitForChanges();

            // Then
            const cursorPositionAfter = await autocompleteInput.getProperty('selectionStart');
            expect(cursorPositionAfter).toEqual(0);
            const focusedInput = await page.find('wcs-select > input.autocomplete-field:focus');
            expect(focusedInput).toBeDefined();
        });
        it('focus textbox, move cursor to the end of the text when End pressed', async () => {
            // Given
            const typedText = 'test';

            // When
            await autocompleteInput.press('t');
            await autocompleteInput.press('e');
            await autocompleteInput.press('s');
            await autocompleteInput.press('t');
            await page.keyboard.press('End');
            await page.waitForChanges();

            // Then
            const cursorPositionAfter = await autocompleteInput.getProperty('selectionStart');
            expect(cursorPositionAfter).toEqual(typedText.length);
            const focusedInput = await page.find('wcs-select > input.autocomplete-field:focus');
            expect(focusedInput).toBeDefined();
        });
        it('focus textbox, filter listbox, remove visual focus from listbox when any printable character', async () => {
            // Given
            const allOptions = await page.findAll('wcs-select-option');

            // When
            await wcsSelect.focus();
            await page.keyboard.press('a');
            await page.waitForChanges();

            // Then
            const focusedInput = await page.find('wcs-select > input.autocomplete-field:focus');
            expect(focusedInput).toBeDefined(); // Focus textbox
            const optionsWithFilter = await page.findAll('wcs-select-option:not([aria-hidden])');
            expect(optionsWithFilter.length).toBeLessThan(allOptions.length); // Filter listbox
            const visuallyFocusedOption = await page.find('wcs-select-option[highlighted]');
            expect(visuallyFocusedOption).toBeNull(); // Remove visual focus from listbox
        });
    });
    //endregion

});

