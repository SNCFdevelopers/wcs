import { newE2EPage } from '@stencil/core/testing';

describe('Dropdown component', () => {
    let page;
    let dropdown;
    let dropdownButton;
    let items;
    let firstItem;
    let lastItem;

    beforeEach(async () => {
        // Given
        page = await newE2EPage();
        await page.setContent(`
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
        dropdown = await page.find('wcs-dropdown');
        dropdownButton = await page.find('wcs-dropdown >>> #dropdown-button');
        items = await page.findAll('wcs-dropdown-item');
        firstItem = await page.find('wcs-dropdown-item#first-item');
        lastItem = await page.find('wcs-dropdown-item#last-item');
    });

    describe('keyboard interactions', () => {
        it('Enter should open menu and move focus to the first item', async () => {
            // When
            await dropdown.focus();
            await page.keyboard.press('Enter');
            await page.waitForChanges();

            // Then
            expect(dropdownButton).toEqualAttribute('aria-expanded', 'true');
            const focusedItem = await page.find(':focus');
            expect(focusedItem).toEqual(items[0]);
        });

        it('SPACE should open menu and move focus to the first item', async () => {
            // When
            await dropdown.focus();
            await page.keyboard.press('Space');
            await page.waitForChanges();

            // Then
            expect(dropdownButton).toEqualAttribute('aria-expanded', 'true');
            const focusedItem = await page.find(':focus');
            expect(focusedItem).toEqual(items[0]);
        });

        it('DOWN_ARROW should open menu and move focus to the first item', async () => {
            // When
            await dropdown.focus();
            await page.keyboard.press('ArrowDown');
            await page.waitForChanges();

            // Then
            expect(dropdownButton).toEqualAttribute('aria-expanded', 'true');
            const focusedItem = await page.find(':focus');
            expect(focusedItem).toEqual(items[0]);
        });

        it('UP_ARROW should open menu and move focus to the last item', async () => {
            // When
            await dropdown.focus();
            await page.keyboard.press('ArrowUp');
            await page.waitForChanges();

            // Then
            expect(dropdownButton).toEqualAttribute('aria-expanded', 'true');
            const focusedItem = await page.find(':focus');
            expect(focusedItem).toEqual(items[items.length - 1]);
        });

        it('HOME should focus the first item', async () => {
            // When
            await dropdownButton.click();
            await page.waitForChanges();
            await page.keyboard.press('Home');
            await page.waitForChanges();

            // Then
            const focusedItem = await page.find(':focus');
            expect(focusedItem).toEqual(firstItem);
        });

        it('END should focus the last item', async () => {
            // When
            await dropdownButton.click();
            await page.waitForChanges();
            await page.keyboard.press('End');
            await page.waitForChanges();

            // Then
            const focusedItem = await page.find(':focus');
            expect(focusedItem).toEqual(lastItem);
        });

        it('UP_ARROW should move focus to the previous item', async () => {
            // When
            await dropdownButton.click();
            await page.keyboard.press('ArrowUp');
            await page.waitForChanges();

            // Then
            const focusedItem = await page.find(':focus');
            expect(focusedItem).toEqual(lastItem);
        });

        it('DOWN_ARROW should move focus to the next item', async () => {
            // When
            await dropdownButton.click();
            await page.keyboard.press('ArrowDown');
            await page.waitForChanges();

            // Then
            const focusedItem = await page.find(':focus');
            expect(focusedItem).toEqual(items[1]);
        });

        it('ESCAPE should close the menu and set focus on the dropdown button', async () => {
            // When
            await dropdownButton.click();
            await page.keyboard.press('Escape');
            await page.waitForChanges();

            // Then
            expect(dropdownButton).toEqualAttribute('aria-expanded', 'false');
            const focusedElement = await page.find(':focus');
            expect(focusedElement).toEqual(dropdown);
        });

        it('TAB should close the menu and set focus on the dropdown button', async () => {
            // When
            await dropdownButton.click();
            await page.keyboard.press('Tab');
            await page.waitForChanges();

            // Then
            expect(dropdownButton).toEqualAttribute('aria-expanded', 'false');
            const focusedElement = await page.find(':focus');
            expect(focusedElement).toEqual(dropdown);
        });

        it('SHIFT+TAB should close the menu and set focus on the dropdown button', async () => {
            // When
            await dropdownButton.click();
            await page.keyboard.down('Shift');
            await page.keyboard.press('Tab');
            await page.keyboard.up('Shift');
            await page.waitForChanges();

            // Then
            expect(dropdownButton).toEqualAttribute('aria-expanded', 'false');
            const focusedElement = await page.find(':focus');
            expect(focusedElement).toEqual(dropdown);
        });

        it('ENTER should activate the item, close menu, and set focus on the dropdown button', async () => {
            const itemClickSpy = await dropdown.spyOnEvent('wcsDropdownItemClick');

            // When
            await dropdownButton.click();
            await items[0].focus();
            await page.keyboard.press('Enter');
            await page.waitForChanges();

            // Then
            expect(itemClickSpy).toHaveReceivedEventTimes(1);
            expect(dropdownButton).toEqualAttribute('aria-expanded', 'false');
            const focusedElement = await page.find(':focus');
            expect(focusedElement).toEqual(dropdown);
        });
    });
});
