import { newE2EPage } from "@stencil/core/testing";

describe('Radio Group', () => {
    it('should navigate to the first not disabled option when pressing tab key', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
                <wcs-input></wcs-input>
                <wcs-radio-group>
                    <wcs-radio disabled id="radio-1" value="1"></wcs-radio>
                    <wcs-radio id="radio-2" value="2"></wcs-radio>
                    <wcs-radio id="radio-3" value="3"></wcs-radio>
                </wcs-radio-group>
            `);
        const firstTabbableItem = await page.find('wcs-input');
        await firstTabbableItem.focus();

        // When
        await page.keyboard.press('Tab');

        // Then
        const activeElId = await page.evaluate(() => document.activeElement!.id);
        expect(activeElId).toEqual('radio-2');
    });

    it('should checked the first option when pressing space key', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
                <wcs-input></wcs-input>
                <wcs-radio-group>
                    <wcs-radio id="radio-1" value="1"></wcs-radio>
                    <wcs-radio id="radio-2" value="2"></wcs-radio>
                    <wcs-radio id="radio-3" value="3"></wcs-radio>
                </wcs-radio-group>
            `);
        const firstTabbableItem = await page.find('wcs-input');
        await firstTabbableItem.focus();

        const wcsRadioGroup = await page.find('wcs-radio-group');

        // When
        await page.keyboard.press('Space');

        // Then
        const firstRadio = await wcsRadioGroup.find('#radio-1');
        expect(firstRadio.getProperty('checked')).toBeTruthy();
    });

    it('should navigate to the checked option when pressing tab key', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
                <wcs-input></wcs-input>
                <wcs-radio-group>
                    <wcs-radio disabled id="radio-1" value="1"></wcs-radio>
                    <wcs-radio id="radio-2" value="2"></wcs-radio>
                    <wcs-radio checked id="radio-3" value="3"></wcs-radio>
                </wcs-radio-group>
            `);
        const firstTabbableItem = await page.find('wcs-input');
        await firstTabbableItem.focus();

        // When
        await page.keyboard.press('Tab');

        // Then
        const activeElId = await page.evaluate(() => document.activeElement!.id);
        expect(activeElId).toEqual('radio-3');
    });

    describe('When pressing arrow down key', () => {
        it('should checked the next option not disabled when we are on the first option and next option is here', async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                    <wcs-radio-group>
                        <wcs-radio id="radio-1" value="1"></wcs-radio>
                        <wcs-radio disabled id="radio-2" value="2"></wcs-radio>
                        <wcs-radio id="radio-3" value="3"></wcs-radio>
                    </wcs-radio-group>
                `);

            const wcsRadioGroup = await page.find('wcs-radio-group');
            wcsRadioGroup.find('#radio-1').then(radio => radio.focus());

            // When
            await page.keyboard.press('ArrowDown');

            // Then
            const secondRadio = await wcsRadioGroup.find('#radio-3');
            expect(secondRadio.getProperty('checked')).toBeTruthy();
        });

        it('should checked the first not disabled option when we are on the last option', async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                    <wcs-radio-group>
                        <wcs-radio disabled id="radio-1" value="1"></wcs-radio>
                        <wcs-radio id="radio-2" value="2"></wcs-radio>
                        <wcs-radio id="radio-3" value="3"></wcs-radio>
                    </wcs-radio-group>
                `);

            const wcsRadioGroup = await page.find('wcs-radio-group');
            wcsRadioGroup.find('#radio-3').then(radio => radio.focus());

            // When
            await page.keyboard.press('ArrowDown');
            await page.waitForChanges();

            // Then
            const firstRadio = await wcsRadioGroup.find('#radio-2');
            expect(firstRadio.getProperty('checked')).toBeTruthy();
        });
    });

    describe('When pressing arrow up key', () => {
        it('should checked the previous option when we are on the last option and previous option is here', async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                    <wcs-radio-group>
                        <wcs-radio id="radio-1" value="1"></wcs-radio>
                        <wcs-radio id="radio-2" value="2"></wcs-radio>
                        <wcs-radio id="radio-3" value="3"></wcs-radio>
                    </wcs-radio-group>
                `);

            const wcsRadioGroup = await page.find('wcs-radio-group');
            wcsRadioGroup.find('#radio-3').then(radio => radio.focus());

            // When
            await page.keyboard.press('ArrowUp');

            // Then
            const secondRadio = await wcsRadioGroup.find('#radio-2');
            expect(secondRadio.getProperty('checked')).toBeTruthy();
        });

        it('should checked the last option when we are on the first option', async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                    <wcs-radio-group>
                        <wcs-radio id="radio-1" value="1"></wcs-radio>
                        <wcs-radio id="radio-2" value="2"></wcs-radio>
                        <wcs-radio id="radio-3" value="3"></wcs-radio>
                    </wcs-radio-group>
                `);

            const wcsRadioGroup = await page.find('wcs-radio-group');
            wcsRadioGroup.find('#radio-1').then(radio => radio.focus());

            // When
            await page.keyboard.press('ArrowUp');

            // Then
            const firstRadio = await wcsRadioGroup.find('#radio-3');
            expect(firstRadio.getProperty('checked')).toBeTruthy();
        });
    });
});
