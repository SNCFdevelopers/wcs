import { setWcsContent } from '../../utils/playwright/test';
import { test, E2EPage } from "@stencil/playwright";

import { expect } from "@playwright/test";

test.describe('Dropdown component', () => {
    test.describe('keyboard interactions', () => {
        test('Enter should open menu and move focus to the first item', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-dropdown mode="plain" shape="normal" size="m">
                    <span slot="placeholder">Dropdown</span>
                    <wcs-dropdown-item id="first-item">Premier item</wcs-dropdown-item>
                    <wcs-dropdown-header>ACTION HEADER</wcs-dropdown-header>
                    <wcs-dropdown-item>Second item test avec un long texte</wcs-dropdown-item>
                    <wcs-dropdown-item>Dernier item</wcs-dropdown-item>
                    <wcs-dropdown-divider></wcs-dropdown-divider>
                    <wcs-dropdown-item id="last-item">Dernier item</wcs-dropdown-item>
                </wcs-dropdown>
            `);

            const dropdown = page.locator('wcs-dropdown');
            const dropdownButton = page.locator('wcs-dropdown #dropdown-button');
            const firstItem = page.locator('wcs-dropdown-item#first-item');

            // When
            await dropdown.focus();
            await page.keyboard.press('Enter');
            await page.waitForChanges();

            // Then
            await expect(dropdownButton).toHaveAttribute('aria-expanded', 'true');
            await expect(firstItem).toBeFocused();
        });

        test('SPACE should open menu and move focus to the first item', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-dropdown mode="plain" shape="normal" size="m">
                    <span slot="placeholder">Dropdown</span>
                    <wcs-dropdown-item id="first-item">Premier item</wcs-dropdown-item>
                    <wcs-dropdown-header>ACTION HEADER</wcs-dropdown-header>
                    <wcs-dropdown-item>Second item test avec un long texte</wcs-dropdown-item>
                    <wcs-dropdown-item>Dernier item</wcs-dropdown-item>
                    <wcs-dropdown-divider></wcs-dropdown-divider>
                    <wcs-dropdown-item id="last-item">Dernier item</wcs-dropdown-item>
                </wcs-dropdown>
            `);

            const dropdown = page.locator('wcs-dropdown');
            const dropdownButton = page.locator('wcs-dropdown #dropdown-button');
            const firstItem = page.locator('wcs-dropdown-item#first-item');

            // When
            await dropdown.focus();
            await page.keyboard.press('Space');
            await page.waitForChanges();

            // Then
            await expect(dropdownButton).toHaveAttribute('aria-expanded', 'true');
            await expect(firstItem).toBeFocused();
        });

        test('DOWN_ARROW should open menu and move focus to the first item', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-dropdown mode="plain" shape="normal" size="m">
                    <span slot="placeholder">Dropdown</span>
                    <wcs-dropdown-item id="first-item">Premier item</wcs-dropdown-item>
                    <wcs-dropdown-header>ACTION HEADER</wcs-dropdown-header>
                    <wcs-dropdown-item>Second item test avec un long texte</wcs-dropdown-item>
                    <wcs-dropdown-item>Dernier item</wcs-dropdown-item>
                    <wcs-dropdown-divider></wcs-dropdown-divider>
                    <wcs-dropdown-item id="last-item">Dernier item</wcs-dropdown-item>
                </wcs-dropdown>
            `);

            const dropdown = page.locator('wcs-dropdown');
            const dropdownButton = page.locator('wcs-dropdown #dropdown-button');
            const firstItem = page.locator('wcs-dropdown-item#first-item');

            // When
            await dropdown.focus();
            await page.keyboard.press('ArrowDown');
            await page.waitForChanges();

            // Then
            await expect(dropdownButton).toHaveAttribute('aria-expanded', 'true');
            await expect(firstItem).toBeFocused();
        });

        test('UP_ARROW should open menu and move focus to the last item', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-dropdown mode="plain" shape="normal" size="m">
                    <span slot="placeholder">Dropdown</span>
                    <wcs-dropdown-item id="first-item">Premier item</wcs-dropdown-item>
                    <wcs-dropdown-header>ACTION HEADER</wcs-dropdown-header>
                    <wcs-dropdown-item>Second item test avec un long texte</wcs-dropdown-item>
                    <wcs-dropdown-item>Dernier item</wcs-dropdown-item>
                    <wcs-dropdown-divider></wcs-dropdown-divider>
                    <wcs-dropdown-item id="last-item">Dernier item</wcs-dropdown-item>
                </wcs-dropdown>
            `);

            const dropdown = page.locator('wcs-dropdown');
            const dropdownButton = page.locator('wcs-dropdown #dropdown-button');
            const lastItem = page.locator('wcs-dropdown-item#last-item');

            // When
            await dropdown.focus();
            await page.keyboard.press('ArrowUp');
            await page.waitForChanges();

            // Then
            await expect(dropdownButton).toHaveAttribute('aria-expanded', 'true');
            await expect(lastItem).toBeFocused();
        });

        test('HOME should focus the first item', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-dropdown mode="plain" shape="normal" size="m">
                    <span slot="placeholder">Dropdown</span>
                    <wcs-dropdown-item id="first-item">Premier item</wcs-dropdown-item>
                    <wcs-dropdown-header>ACTION HEADER</wcs-dropdown-header>
                    <wcs-dropdown-item>Second item test avec un long texte</wcs-dropdown-item>
                    <wcs-dropdown-item>Dernier item</wcs-dropdown-item>
                    <wcs-dropdown-divider></wcs-dropdown-divider>
                    <wcs-dropdown-item id="last-item">Dernier item</wcs-dropdown-item>
                </wcs-dropdown>
            `);

            const dropdownButton = page.locator('wcs-dropdown #dropdown-button');
            const firstItem = page.locator('wcs-dropdown-item#first-item');

            // When
            await dropdownButton.dispatchEvent('click');
            await page.waitForChanges();
            await firstItem.waitFor({ state: 'visible' }); // wait for menu to open
            await firstItem.focus(); // ensure focus is on an item before pressing Home
            await page.keyboard.press('Home');
            await page.waitForChanges();

            // Then
            await expect(firstItem).toBeFocused();
        });

        test('END should focus the last item', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-dropdown mode="plain" shape="normal" size="m">
                    <span slot="placeholder">Dropdown</span>
                    <wcs-dropdown-item id="first-item">Premier item</wcs-dropdown-item>
                    <wcs-dropdown-header>ACTION HEADER</wcs-dropdown-header>
                    <wcs-dropdown-item>Second item test avec un long texte</wcs-dropdown-item>
                    <wcs-dropdown-item>Dernier item</wcs-dropdown-item>
                    <wcs-dropdown-divider></wcs-dropdown-divider>
                    <wcs-dropdown-item id="last-item">Dernier item</wcs-dropdown-item>
                </wcs-dropdown>
            `);

            const dropdownButton = page.locator('wcs-dropdown #dropdown-button');
            const lastItem = page.locator('wcs-dropdown-item#last-item');

            // When
            await dropdownButton.dispatchEvent('click');
            await page.waitForChanges();
            const firstItem = page.locator('wcs-dropdown-item#first-item');
            await firstItem.waitFor({ state: 'visible' }); // wait for menu to open
            await firstItem.focus(); // ensure focus is on an item before pressing End
            await page.keyboard.press('End');
            await page.waitForChanges();

            // Then
            await expect(lastItem).toBeFocused();
        });

        test('UP_ARROW should move focus to the previous item', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-dropdown mode="plain" shape="normal" size="m">
                    <span slot="placeholder">Dropdown</span>
                    <wcs-dropdown-item id="first-item">Premier item</wcs-dropdown-item>
                    <wcs-dropdown-header>ACTION HEADER</wcs-dropdown-header>
                    <wcs-dropdown-item>Second item test avec un long texte</wcs-dropdown-item>
                    <wcs-dropdown-item>Dernier item</wcs-dropdown-item>
                    <wcs-dropdown-divider></wcs-dropdown-divider>
                    <wcs-dropdown-item id="last-item">Dernier item</wcs-dropdown-item>
                </wcs-dropdown>
            `);

            const dropdownButton = page.locator('wcs-dropdown #dropdown-button');
            const lastItem = page.locator('wcs-dropdown-item#last-item');

            // When
            await dropdownButton.dispatchEvent('click'); // open the menu
            await page.waitForChanges();
            const firstItem = page.locator('wcs-dropdown-item#first-item');
            await firstItem.waitFor({ state: 'visible' }); // wait for menu to open
            await firstItem.focus(); // ensure focus is on an item before pressing ArrowUp
            await page.keyboard.press('ArrowUp');
            await page.waitForChanges();

            // Then
            await expect(lastItem).toBeFocused();
        });

        test('DOWN_ARROW should move focus to the next item', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-dropdown mode="plain" shape="normal" size="m">
                    <span slot="placeholder">Dropdown</span>
                    <wcs-dropdown-item id="first-item">Premier item</wcs-dropdown-item>
                    <wcs-dropdown-header>ACTION HEADER</wcs-dropdown-header>
                    <wcs-dropdown-item id="second-item">Second item test avec un long texte</wcs-dropdown-item>
                    <wcs-dropdown-item>Dernier item</wcs-dropdown-item>
                    <wcs-dropdown-divider></wcs-dropdown-divider>
                    <wcs-dropdown-item id="last-item">Dernier item</wcs-dropdown-item>
                </wcs-dropdown>
            `);

            const dropdownButton = page.locator('wcs-dropdown #dropdown-button');
            const secondItem = page.locator('wcs-dropdown-item#second-item');

            // When
            await dropdownButton.dispatchEvent('click');
            await page.waitForChanges();
            const firstItem = page.locator('wcs-dropdown-item#first-item');
            await firstItem.waitFor({ state: 'visible' }); // wait for menu to open
            await firstItem.focus(); // ensure focus is on an item before pressing Escape
            await page.keyboard.press('ArrowDown');
            await page.waitForChanges();

            // Then
            await expect(secondItem).toBeFocused();
        });

        test('ESCAPE should close the menu and set focus on the dropdown button', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-dropdown mode="plain" shape="normal" size="m">
                    <span slot="placeholder">Dropdown</span>
                    <wcs-dropdown-item id="first-item">Premier item</wcs-dropdown-item>
                    <wcs-dropdown-header>ACTION HEADER</wcs-dropdown-header>
                    <wcs-dropdown-item>Second item test avec un long texte</wcs-dropdown-item>
                    <wcs-dropdown-item>Dernier item</wcs-dropdown-item>
                    <wcs-dropdown-divider></wcs-dropdown-divider>
                    <wcs-dropdown-item id="last-item">Dernier item</wcs-dropdown-item>
                </wcs-dropdown>
            `);

            const dropdown = page.locator('wcs-dropdown');
            const dropdownButton = page.locator('wcs-dropdown #dropdown-button');

            // When
            await dropdownButton.dispatchEvent('click');
            await page.waitForChanges();
            const firstItem = page.locator('wcs-dropdown-item#first-item');
            await firstItem.waitFor({ state: 'visible' }); // wait for menu to open
            await firstItem.focus(); // ensure focus is on an item before pressing Escape
            await page.keyboard.press('Escape');
            await page.waitForChanges();

            // Then
            await expect(dropdownButton).toHaveAttribute('aria-expanded', 'false');
            await expect(dropdown).toBeFocused();
        });

        test('TAB should close the menu and set focus on the dropdown button', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-dropdown mode="plain" shape="normal" size="m">
                    <span slot="placeholder">Dropdown</span>
                    <wcs-dropdown-item id="first-item">Premier item</wcs-dropdown-item>
                    <wcs-dropdown-header>ACTION HEADER</wcs-dropdown-header>
                    <wcs-dropdown-item>Second item test avec un long texte</wcs-dropdown-item>
                    <wcs-dropdown-item>Dernier item</wcs-dropdown-item>
                    <wcs-dropdown-divider></wcs-dropdown-divider>
                    <wcs-dropdown-item id="last-item">Dernier item</wcs-dropdown-item>
                </wcs-dropdown>
            `);

            const dropdown = page.locator('wcs-dropdown');
            const dropdownButton = page.locator('wcs-dropdown #dropdown-button');
            const firstItem = page.locator('wcs-dropdown-item#first-item');

            // When
            await dropdownButton.dispatchEvent('click'); // open the menu
            await page.waitForChanges();
            await firstItem.waitFor({ state: 'visible' }); // wait for menu to open
            await firstItem.focus(); // ensure focus is on an item before pressing Tab
            await page.keyboard.press('Tab'); // should close the menu and focus back to button
            await page.waitForChanges();

            // Then
            await expect(dropdownButton).toHaveAttribute('aria-expanded', 'false');
            await expect(dropdown).toBeFocused();
        });

        test('SHIFT+TAB should close the menu and set focus on the dropdown button', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-dropdown mode="plain" shape="normal" size="m">
                    <span slot="placeholder">Dropdown</span>
                    <wcs-dropdown-item id="first-item">Premier item</wcs-dropdown-item>
                    <wcs-dropdown-header>ACTION HEADER</wcs-dropdown-header>
                    <wcs-dropdown-item>Second item test avec un long texte</wcs-dropdown-item>
                    <wcs-dropdown-item>Dernier item</wcs-dropdown-item>
                    <wcs-dropdown-divider></wcs-dropdown-divider>
                    <wcs-dropdown-item id="last-item">Dernier item</wcs-dropdown-item>
                </wcs-dropdown>
            `);

            const dropdown = page.locator('wcs-dropdown');
            const dropdownButton = page.locator('wcs-dropdown #dropdown-button');

            // When
            await dropdownButton.dispatchEvent('click'); // open the menu
            await page.waitForChanges();
            const firstItem = page.locator('wcs-dropdown-item#first-item');
            await firstItem.waitFor({ state: 'visible' }); // wait for menu to open
            await firstItem.focus(); // ensure focus is on an item before pressing Shift+Tab
            await page.keyboard.down('Shift');
            await page.keyboard.press('Tab');
            await page.keyboard.up('Shift');
            await page.waitForChanges();

            // Then
            await expect(dropdownButton).toHaveAttribute('aria-expanded', 'false');
            await expect(dropdown).toBeFocused();
        });

        test('ENTER should activate the item, close menu, and set focus on the dropdown button', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-dropdown mode="plain" shape="normal" size="m">
                    <span slot="placeholder">Dropdown</span>
                    <wcs-dropdown-item id="first-item">Premier item</wcs-dropdown-item>
                    <wcs-dropdown-header>ACTION HEADER</wcs-dropdown-header>
                    <wcs-dropdown-item>Second item test avec un long texte</wcs-dropdown-item>
                    <wcs-dropdown-item>Dernier item</wcs-dropdown-item>
                    <wcs-dropdown-divider></wcs-dropdown-divider>
                    <wcs-dropdown-item id="last-item">Dernier item</wcs-dropdown-item>
                </wcs-dropdown>
            `);

            const dropdown = page.locator('wcs-dropdown');
            // spy on the custom event on the locator
            const itemClickSpy = await dropdown.spyOnEvent('wcsDropdownItemClick');

            const dropdownButton = page.locator('wcs-dropdown #dropdown-button');
            const firstItem = page.locator('wcs-dropdown-item#first-item');

            // When
            await dropdownButton.dispatchEvent('click');
            await page.waitForChanges();
            await firstItem.waitFor({ state: 'visible' }); // wait for menu to open
            await firstItem.focus();
            await page.keyboard.press('Enter');
            await page.waitForChanges();

            // Then
            expect(itemClickSpy).toHaveReceivedEventTimes(1);
            await expect(dropdownButton).toHaveAttribute('aria-expanded', 'false');
            await expect(dropdown).toBeFocused();
        });
    });
});
