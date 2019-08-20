import { newE2EPage } from '@stencil/core/testing';
import { wrap } from 'module';

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
        `);
        const select = await page.find('wcs-select');
        const wrapper = await page.find('wcs-select >>> .wcs-select-wrapper');

        // When
        await select.click();
        await page.click('body');

        // Then
        expect(wrapper).not.toHaveClass('expanded');
    });
});

