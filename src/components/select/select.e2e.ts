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
});

