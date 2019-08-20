import { newE2EPage } from '@stencil/core/testing';

describe('Select component', () => {
    // TODO: Add test about default selected value
    it('Should expand when clicked', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-select>
                <wcs-select-option value="1">One</wcs-select-option>
                <wcs-select-option value="2">Two</wcs-select-option>
                <wcs-select-option value="3">Three</wcs-select-option>
            </wcs-select>
        `);
        const select = await page.find('wcs-select');
        const wrapper = await page.find('wcs-select >>> .wcs-select-wrapper');

        // When
        await select.click();

        // Then
        expect(wrapper).toHaveClass('expanded');
    });

    it('Should open when using open method', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-select>
                <wcs-select-option value="1">One</wcs-select-option>
                <wcs-select-option value="2">Two</wcs-select-option>
                <wcs-select-option value="3">Three</wcs-select-option>
            </wcs-select>
        `);
        const select = await page.find('wcs-select');
        const wrapper = await page.find('wcs-select >>> .wcs-select-wrapper');

        // When
        await select.callMethod('open');
        await page.waitForChanges();

        // Then
        expect(wrapper).toHaveClass('expanded');
    });

    it('Should close when using close method', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-select>
                <wcs-select-option value="1">One</wcs-select-option>
                <wcs-select-option value="2">Two</wcs-select-option>
                <wcs-select-option value="3">Three</wcs-select-option>
            </wcs-select>
        `);
        const select = await page.find('wcs-select');
        const wrapper = await page.find('wcs-select >>> .wcs-select-wrapper');

        // When
        await select.click();
        await select.callMethod('close');
        await page.waitForChanges();

        // Then
        expect(wrapper).not.toHaveClass('expanded');
    });

    it('Should close when user click outside', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-select>
                <wcs-select-option value="1">One</wcs-select-option>
                <wcs-select-option value="2">Two</wcs-select-option>
                <wcs-select-option value="3">Three</wcs-select-option>
            </wcs-select>
            <div class="somewhere-else"></div>
        `);
        const select = await page.find('wcs-select');
        const wrapper = await page.find('wcs-select >>> .wcs-select-wrapper');

        // When
        await select.click();
        // XXX: Page.click() doesn't work
        await page.$eval('div.somewhere-else', (elem: HTMLDivElement) => elem.click());
        await page.waitForChanges();

        // Then
        expect(wrapper).not.toHaveClass('expanded');
    });

    it('Should handle option click', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-select>
                <wcs-select-option value="1">One</wcs-select-option>
                <wcs-select-option value="2">Two</wcs-select-option>
                <wcs-select-option value="3">Three</wcs-select-option>
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
                <wcs-select-option value="2">Two</wcs-select-option>
                <wcs-select-option value="3">Three</wcs-select-option>
            </wcs-select>
        `);
        const wrapper = await page.find('wcs-select >>> .wcs-select-wrapper');

        // When
        await wrapper.focus();
        const focusedEl = await page.find('wcs-select >>> .wcs-select-wrapper:focus');

        // Then
        expect(focusedEl).toBeDefined();
    });

    describe('Disabled', () => {
        it('Should not expand if disabled', async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                <wcs-select disabled>
                    <wcs-select-option value="1">One</wcs-select-option>
                    <wcs-select-option value="2">Two</wcs-select-option>
                    <wcs-select-option value="3">Three</wcs-select-option>
                </wcs-select>
            `);
            const select = await page.find('wcs-select');
            const wrapper = await page.find('wcs-select >>> .wcs-select-wrapper');

            // When
            await select.click();

            // Then
            expect(wrapper).not.toHaveClass('expanded');
        });

        it('Is not focusable when disabled', async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                <wcs-select disabled>
                    <wcs-select-option value="1">One</wcs-select-option>
                    <wcs-select-option value="2">Two</wcs-select-option>
                    <wcs-select-option value="3">Three</wcs-select-option>
                </wcs-select>
            `);
            const wrapper = await page.find('wcs-select >>> .wcs-select-wrapper');

            // When
            await wrapper.focus();
            const focusedEl = await page.find('wcs-select >>> .wcs-select-wrapper:focus');

            // Then
            expect(focusedEl).toBeNull();
        });
    });

});

