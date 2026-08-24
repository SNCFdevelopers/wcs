import { setWcsContent } from '../../utils/playwright/test';
import { test, E2EPage } from "@stencil/playwright";

import { expect } from "@playwright/test";

test.describe('Form field component', () => {
    test.describe('Global', () => {
        test.describe('Accessibility', () => {
            test('Should put form-field label to aria-label of the spied element when non empty', async ({ page }: { page: E2EPage }) => {
                // Given
                await setWcsContent(page, `
                    <wcs-form-field>
                        <wcs-label>Label form field</wcs-label>
                        <wcs-input/>
                    </wcs-form-field>
                `);

                // When
                const input = page.locator('wcs-input').locator('input');

                // Then
                await expect(input).toHaveAttribute('aria-label', 'Label form field');
            });

            test('Should not put form-field label to aria-label of the spied element when empty', async ({ page }: { page: E2EPage }) => {
                // Given
                await setWcsContent(page, `
                    <wcs-form-field>
                        <wcs-label></wcs-label>
                        <wcs-input/>
                    </wcs-form-field>
                `);

                // When
                const input = page.locator('wcs-input').locator('input');

                // Then
                await expect(input).not.toHaveAttribute('aria-label');
            });

            test('Should not concatenate form-field label with form control (switch, checkbox label when form-field label is empty', async ({ page }: { page: E2EPage }) => {
                // Given
                await setWcsContent(page, `
                    <wcs-form-field>
                        <wcs-label></wcs-label>
                        <wcs-switch>Label switch</wcs-switch>
                    </wcs-form-field>
                `);

                // When
                const switchInput = page.locator('wcs-switch').locator('input');

                // Then
                await expect(switchInput).toHaveAttribute('aria-label', 'Label switch');
            });

            [
                {
                    name: 'select',
                    control: `
                        <wcs-select>
                            <wcs-select-option value="1">Option 1</wcs-select-option>
                            <wcs-select-option value="2">Option 2</wcs-select-option>
                            <wcs-select-option value="3">Option 3</wcs-select-option>
                        </wcs-select>
                    `,
                    ariaLabelSelector: 'wcs-select'
                },
                {
                    name: 'input',
                    control: '<wcs-input/>',
                    ariaLabelSelector: 'wcs-input input'
                },
                {
                    name: 'textarea',
                    control: '<wcs-textarea/>',
                    ariaLabelSelector: 'wcs-textarea textarea'
                },
                {
                    name: 'native-select',
                    control: `
                        <wcs-native-select>
                            <select>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                            </select>
                        </wcs-native-select>
                    `,
                    ariaLabelSelector: 'wcs-native-select select'
                },
                {
                    name: 'radio-group',
                    control: `
                        <wcs-radio-group>
                            <wcs-radio name="group" label="Option 1" value="1"></wcs-radio>
                            <wcs-radio name="group" label="Option 2" value="2"></wcs-radio>
                        </wcs-radio-group>
                    `,
                    ariaLabelSelector: 'wcs-radio-group'
                },
                {
                    name: 'counter',
                    control: '<wcs-counter></wcs-counter>',
                    ariaLabelSelector: 'wcs-counter [role="spinbutton"]'
                },
                {
                    name: 'switch',
                    control: '<wcs-switch>Label switch</wcs-switch>',
                    ariaLabelSelector: 'wcs-switch input',
                    innerLabel: 'Label switch'
                },
                {
                    name: 'checkbox',
                    control: '<wcs-checkbox>Label checkbox</wcs-checkbox>',
                    ariaLabelSelector: 'wcs-checkbox input',
                    innerLabel: 'Label checkbox'
                }
            ].forEach(({name, control, ariaLabelSelector, innerLabel}) => {
                test(`Should update aria-label of ${name} when form-field label changes`, async ({ page }: { page: E2EPage }) => {
                    // Given
                    await setWcsContent(page, `
                        <wcs-form-field>
                            <wcs-label>Label form field</wcs-label>
                            ${control}
                        </wcs-form-field>
                    `);

                    const formControl = page.locator(ariaLabelSelector);
                    const initialAriaLabel = ['Label form field', innerLabel].filter(Boolean).join(' ');
                    await expect(formControl).toHaveAttribute('aria-label', initialAriaLabel);

                    // When
                    const updatedLabel = 'New label form field';
                    await page.locator('wcs-label').evaluate((label, value) => label.textContent = value, updatedLabel);

                    // Then
                    const updatedAriaLabel = [updatedLabel, innerLabel].filter(Boolean).join(' ');
                    await expect(formControl).toHaveAttribute('aria-label', updatedAriaLabel);
                });
            });
        });
    });

    test.describe('With switch', () => {
        test.describe('Accessibility', () => {
            test('Should concatenate form-field label with switch label', async ({ page }: { page: E2EPage }) => {
                // Given
                await setWcsContent(page, `
                    <wcs-form-field>
                        <wcs-label>Label form field</wcs-label>
                        <wcs-switch>Label switch</wcs-switch>
                    </wcs-form-field>
                `);

                // When
                const switchInput = page.locator('wcs-switch').locator('input');

                // Then
                await expect(switchInput).toHaveAttribute('aria-label', 'Label form field Label switch');
            });
        });
    });

    test.describe('With checkbox', () => {
        test.describe('Accessibility', () => {
            test('Should concatenate form-field label with checkbox label', async ({ page }: { page: E2EPage }) => {
                // Given
                await setWcsContent(page, `
                    <wcs-form-field>
                        <wcs-label>Label form field</wcs-label>
                        <wcs-checkbox>Label checkbox</wcs-checkbox>
                    </wcs-form-field>
                `);

                // When
                const checkboxInput = page.locator('wcs-checkbox').locator('input');

                // Then
                await expect(checkboxInput).toHaveAttribute('aria-label', 'Label form field Label checkbox');
            });
        });
    });

    test.describe('With radio-group', () => {
        test.describe('Accessibility', () => {
            test('Should set aria-label on radio-group element', async ({ page }: { page: E2EPage }) => {
                // Given
                await setWcsContent(page, `
                    <wcs-form-field>
                        <wcs-label>Label form field</wcs-label>
                        <wcs-radio-group>
                            <wcs-radio name="SA" label="SNCF" value="1"></wcs-radio>
                            <wcs-radio name="SA" label="SNCF Réseau" value="2"></wcs-radio>
                            <wcs-radio name="SA" label="SNCF Voyageurs" value="3"></wcs-radio>
                        </wcs-radio-group>
                    </wcs-form-field>
                `);

                // When
                const radioGroup = page.locator('wcs-radio-group');

                // Then
                await expect(radioGroup).toHaveAttribute('aria-label', 'Label form field');
            });
        });
    });
});
