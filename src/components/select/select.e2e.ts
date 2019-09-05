import { newE2EPage } from '@stencil/core/testing';

describe('Select component', () => {
    // TODO: Add test about default selected value
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

    it('Let us select a value and displays it correctly', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-select>
                <wcs-select-option value="1">One</wcs-select-option>
            </wcs-select>
        `);
        const select = await page.find('wcs-select');
        const firstSelectOption = await page.find('wcs-select > wcs-select-option');
        const label = await page.find('wcs-select >>> .wcs-select-text');

        // When
        await select.click();
        await firstSelectOption.click();

        // Then
        expect(select).toHaveAttribute('value');
        expect(select.getAttribute('value')).toBe('1');
        expect(label.innerText).toBe('One');
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
            const label = await page.find('wcs-select >>> .wcs-select-text');

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
});

