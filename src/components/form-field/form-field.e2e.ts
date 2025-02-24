import { newE2EPage } from '@stencil/core/testing';
import { setWcsContent } from "../../utils/tests";

describe('Form field component', () => {
    describe('Global', () => {
        describe('Accessibility', () => {
            it('Should put form-field label to aria-label of the spied element when non empty', async () => {
                // Given
                const page = await newE2EPage();
                await setWcsContent(page, `
                    <wcs-form-field>
                        <wcs-label>Label form field</wcs-label>
                        <wcs-input/>
                    </wcs-form-field>
                `);

                // When
                const input = await page.find('wcs-input >>> input');
                await page.waitForChanges();

                // Then
                const ariaLabel = input.getAttribute('aria-label');
                expect(ariaLabel).toBe('Label form field');
            });
            it('Should not put form-field label to aria-label of the spied element when empty', async () => {
                // Given
                const page = await newE2EPage();
                await setWcsContent(page, `
                    <wcs-form-field>
                        <wcs-label></wcs-label>
                        <wcs-input/>
                    </wcs-form-field>
                `);

                // When
                const input = await page.find('wcs-input >>> input');
                await page.waitForChanges();

                // Then
                const ariaLabel = input.getAttribute('aria-label');
                expect(ariaLabel).toBe(null);
            });
            it('Should not concatenate form-field label with form control (switch, checkbox label when form-field label is empty', async () => {
                // Given
                const page = await newE2EPage();
                await setWcsContent(page, `
                    <wcs-form-field>
                        <wcs-label></wcs-label>
                        <wcs-switch>Label switch</wcs-switch>
                    </wcs-form-field>
                `);

                // When
                const switchInput = await page.find('wcs-switch >>> input');
                await page.waitForChanges();

                // Then
                const ariaLabel = switchInput.getAttribute('aria-label');
                expect(ariaLabel).toBe('Label switch');
            });
        });
    });
    describe('With switch', () => {
        describe('Accessibility', () => {
            it('Should concatenate form-field label with switch label', async () => {
                // Given
                const page = await newE2EPage();
                await setWcsContent(page, `
                    <wcs-form-field>
                        <wcs-label>Label form field</wcs-label>
                        <wcs-switch>Label switch</wcs-switch>
                    </wcs-form-field>
                `);

                // When
                const switchInput = await page.find('wcs-switch >>> input');
                await page.waitForChanges();

                // Then
                const ariaLabel = switchInput.getAttribute('aria-label');
                expect(ariaLabel).toBe('Label form field Label switch');
            });
        });
    });

    describe('With checkbox', () => {
        describe('Accessibility', () => {
            it('Should concatenate form-field label with checkbox label', async () => {
                // Given
                const page = await newE2EPage();
                await setWcsContent(page, `
                    <wcs-form-field>
                        <wcs-label>Label form field</wcs-label>
                        <wcs-checkbox>Label checkbox</wcs-checkbox>
                    </wcs-form-field>
                `);

                // When
                const checkboxInput = await page.find('wcs-checkbox >>> input');
                await page.waitForChanges();

                // Then
                const ariaLabel = checkboxInput.getAttribute('aria-label');
                expect(ariaLabel).toBe('Label form field Label checkbox');
            });
        });
    });
    describe('With radio-group', () => {
        describe('Accessibility', () => {
            it('Should set aria-label on radio-group element', async () => {
                // Given
                const page = await newE2EPage();
                await setWcsContent(page, `
                    <wcs-form-field>
                        <wcs-label>Label form field</wcs-label>
                        <wcs-radio-group>
                            <wcs-radio name="SA" label="SNCF" value="1"></wcs-radio>
                            <wcs-radio name="SA" label="SNCF Réseau" value="2"></wcs-radio>
                            <wcs-radio name="SA" label="SNCF Voyageurs" value="3"></wcs-radio>
                        </wcs-radio>
                        </wcs-radio-group>
                    </wcs-form-field>
                `);

                // When
                const radioGroup = await page.find('wcs-radio-group');
                await page.waitForChanges();

                // Then
                const ariaLabel = radioGroup.getAttribute('aria-label');
                expect(ariaLabel).toBe('Label form field');
            });
        });
    });
});
