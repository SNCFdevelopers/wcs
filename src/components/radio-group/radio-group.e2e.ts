import { newE2EPage } from "@stencil/core/testing";

describe('Radio Group', () => {
    it('should navigate to the first not disabled radio when pressing tab key', async () => {
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

    it('should not make unselected radios focusable when a radio is clicked', async () => {
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

        const wcsRadioGroup = await page.find('wcs-radio-group');
        const input = await page.find('wcs-input');

        // When
        const radio3 = await wcsRadioGroup.find('#radio-3');
        await radio3.click();
        await input.focus();

        // Then
        await page.keyboard.press('Tab');
        const activeElId = await page.evaluate(() => document.activeElement!.id);
        expect(activeElId).toEqual('radio-3');
    });

    it('should checked the first radio when pressing space key', async () => {
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
        await page.keyboard.press('Tab');

        const wcsRadioGroup = await page.find('wcs-radio-group');

        // When
        await page.keyboard.press('Space');

        // Then
        const firstRadio = await wcsRadioGroup.find('#radio-1 >>> input');
        expect(firstRadio.getAttribute('aria-checked')).toEqual('true')
    });

    it('should navigate to the checked radio when pressing tab key', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
                <wcs-input></wcs-input>
                <wcs-radio-group value="3">
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
        expect(activeElId).toEqual('radio-3');
    });

    describe('When pressing arrow down key', () => {
        it('should checked the next radio not disabled when we are on the first radio and next radio is here', async () => {
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
            const firstRadio = await wcsRadioGroup.find('#radio-1');
            await firstRadio.focus();

            // When
            await page.keyboard.press('ArrowDown');
            await page.waitForChanges();

            // Then
            const secondRadio = await wcsRadioGroup.find('#radio-3 >>> input');
            expect(secondRadio.getAttribute('aria-checked')).toEqual('true');
        });

        it('should checked the first not disabled radio when we are on the last radio', async () => {
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
            const lastRadio = await wcsRadioGroup.find('#radio-3');
            await lastRadio.click();

            // When
            await page.keyboard.press('ArrowDown');
            await page.waitForChanges();

            // Then
            const firstRadio = await wcsRadioGroup.find('#radio-2 >>> input');
            expect(firstRadio.getAttribute('aria-checked')).toEqual('true');
        });
    });

    describe('Events handling', () => {
        it('should fire wcsRadioClick when we click on an unchecked radio', async () => {
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
            const radio2 = await wcsRadioGroup.find('#radio-2');

            const wcsRadioClick = await page.spyOnEvent('wcsRadioClick');

            // When
            await radio2.click();

            // Then
            expect(wcsRadioClick).toHaveReceivedEvent();
        });

        it('should fire wcsChange when we click or move to an unchecked radio', async () => {
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
            const radio2 = await wcsRadioGroup.find('#radio-2');

            const wcsChangeEvent = await page.spyOnEvent('wcsChange');

            // When: Clicking on an unchecked radio
            await radio2.click();

            // Then
            expect(wcsChangeEvent).toHaveReceivedEvent();

            // When: Moving focus to another unchecked radio with keyboard
            await radio2.focus();
            await page.keyboard.press('ArrowDown'); // Move to the next radio

            // Then
            expect(wcsChangeEvent).toHaveReceivedEventTimes(2);
        });

        it('should fire wcsBlur and wcsFocus from the radios', async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
            <wcs-radio-group>
                <wcs-radio id="radio-1" value="1"></wcs-radio>
                <wcs-radio id="radio-2" value="2"></wcs-radio>
                <wcs-radio id="radio-3" value="3"></wcs-radio>
            </wcs-radio-group>
        `);

            const radio = await page.find('#radio-1');

            const wcsBlur = await page.spyOnEvent('wcsBlur');
            const wcsFocus = await page.spyOnEvent('wcsFocus');

            // When: Focusing on the first radio
            await radio.focus();

            // Then: Expect wcsFocus to be fired
            expect(wcsFocus).toHaveReceivedEvent();

            // When: Moving to the next radio
            await page.keyboard.press('ArrowDown');
            await page.waitForChanges();

            // When: Moving focus to another radio
            await page.keyboard.press('Tab');

            // Then
            expect(wcsBlur).toHaveReceivedEvent();
            expect(wcsFocus).toHaveReceivedEventTimes(2);
        });
    });

    describe('When pressing arrow up key', () => {
        it('should checked the previous radio when we are on the last radio and previous radio is here', async () => {
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
            const lastRadio = await wcsRadioGroup.find('#radio-3');
            await lastRadio.focus();

            // When
            await page.keyboard.press('ArrowUp');
            await page.waitForChanges();

            // Then
            const secondRadio = await wcsRadioGroup.find('#radio-2 >>> input');
            expect(secondRadio.getAttribute('aria-checked')).toEqual('true');
        });

        it('should checked the last radio when we are on the first radio', async () => {
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
            const firstRadio = await wcsRadioGroup.find('#radio-1');
            await firstRadio.focus();

            // When
            await page.keyboard.press('ArrowUp');
            await page.waitForChanges();

            // Then
            const lastRadio = await wcsRadioGroup.find('#radio-3 >>> input');
            expect(lastRadio.getAttribute('aria-checked')).toEqual('true');
        });
    });
});
