import { newE2EPage } from '@stencil/core/testing';

describe('select', () => {
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

});


