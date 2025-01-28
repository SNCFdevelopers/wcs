import { newE2EPage } from '@stencil/core/testing';
import { setWcsContent } from "../../utils/tests";

describe('Select component', () => {
    it('Expands when clicked', async () => {
        // Given
        const page = await newE2EPage();
        await setWcsContent(page, `
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
        await setWcsContent(page, `
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
        await setWcsContent(page, `
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
        await setWcsContent(page, `
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
        await setWcsContent(page, `
                <wcs-select autocomplete>
                    <wcs-select-option value="1">One</wcs-select-option>
                    <wcs-select-option value="2">Two</wcs-select-option>
                    <wcs-select-option value="3">Three</wcs-select-option>
                    <wcs-select-option value="4">Four</wcs-select-option>
                </wcs-select>
            `);
        const select = await page.find('wcs-select');

        // When
        await select.click();

        await page.keyboard.type('One');
        const firstSelectOption = await page.find('wcs-select > wcs-select-option');
        await firstSelectOption.click();
        await page.waitForChanges();

        select.setProperty('value', '');
        await page.waitForChanges();

        // Then
        await select.click();
        const availableOptions = await page.findAll('wcs-select > *:not([hidden])');
        // We check that all options are available to ensure the filter is no longer active
        expect(availableOptions.length).toBe(4);

    });
    //endregion

});

