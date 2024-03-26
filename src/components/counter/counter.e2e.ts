import { newE2EPage } from '@stencil/core/testing';


describe('counter', () => {
    it('should increment the counter when click on plus button', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-counter></wcs-counter>
        `);
        const counter = await page.find('wcs-counter');
        const changeSpy = await counter.spyOnEvent('wcsChange');
        const incrementButton = await page.find('wcs-counter >>> wcs-button:last-child');
        // When
        await incrementButton.click();
        await page.waitForChanges();
        // Then
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(changeSpy).toHaveReceivedEventDetail({value: 1});
    });

    it('should decrement the counter when click on minus button', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-counter></wcs-counter>
        `);
        const counter = await page.find('wcs-counter');
        const changeSpy = await counter.spyOnEvent('wcsChange');
        const incrementButton = await page.find('wcs-counter >>> wcs-button:first-child');
        // When
        await incrementButton.click();
        await page.waitForChanges();
        // Then
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(changeSpy).toHaveReceivedEventDetail({value: -1});
    });

    it('should have 0 as default value', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-counter></wcs-counter>
        `);
        const currentDisplayedValue = await page.find('wcs-counter >>> .current-value');

        // Then
        expect(currentDisplayedValue).toEqualText('0');
    });
    it('should respect the step attribute', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-counter step="5"></wcs-counter>
        `);
        const counter = await page.find('wcs-counter');
        const changeSpy = await counter.spyOnEvent('wcsChange');
        const incrementButton = await page.find('wcs-counter >>> wcs-button:last-child');
        // When
        await incrementButton.click();
        await page.waitForChanges();
        // Then
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(changeSpy).toHaveReceivedEventDetail({value: 5});
    });
    it('should respect the min attribute', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-counter min="-1" value="0"></wcs-counter>
        `);
        const counter = await page.find('wcs-counter');
        const changeSpy = await counter.spyOnEvent('wcsChange');
        const decrementButton = await page.find('wcs-counter >>> wcs-button:first-child');
        // When
        await decrementButton.click();
        await decrementButton.click();
        await page.waitForChanges();

        // Then
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(changeSpy).toHaveReceivedEventDetail({value: -1});
    });
    it('should use the min attribute as default value when value is not set', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-counter min="5"></wcs-counter>
        `);
        const currentDisplayedValue = await page.find('wcs-counter >>> .current-value');
        // Then
        expect(currentDisplayedValue).toEqualText('5');
    });
    it('should respect the max attribute', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-counter max="1"></wcs-counter>
        `);
        const counter = await page.find('wcs-counter');
        const changeSpy = await counter.spyOnEvent('wcsChange');
        const incrementButton = await page.find('wcs-counter >>> wcs-button:last-child');
        // When
        await incrementButton.click();
        await incrementButton.click();
        await page.waitForChanges();
        // Then
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(changeSpy).toHaveReceivedEventDetail({value: 1});
    });
    it('should respect the value attribute', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-counter value="5"></wcs-counter>
        `);
        const currentDisplayedValue = await page.find('wcs-counter >>> .current-value');
        // Then
        expect(currentDisplayedValue).toEqualText('5');
    });
    it('should use the min value as default when min is greater than 0', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-counter min="5"></wcs-counter>
        `);
        const currentDisplayedValue = await page.find('wcs-counter >>> .current-value');
        // Then
        expect(currentDisplayedValue).toEqualText('5');
    });
    it('should use the min value as default when min is greater than value', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-counter min="5" value="3"></wcs-counter>
        `);
        const currentDisplayedValue = await page.find('wcs-counter >>> .current-value');
        // Then
        expect(currentDisplayedValue).toEqualText('5');
    });
    it('should fire wcsBlur event when the counter loose focus', async () => {
        const page = await newE2EPage();
        await page.setContent(`
            <button id="first">first</button>
            <wcs-counter></wcs-counter>
            <button id="last">last</button>
        `);
        const counter = await page.find('wcs-counter');
        const blurSpy = await counter.spyOnEvent('wcsBlur');
        const firstButton = await page.find('#first');
        // When
        await firstButton.click();
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.waitForChanges();

        // Then
        expect(blurSpy).toHaveReceivedEventTimes(1);
    });
    it('should fire wcsBlur event when the user click on decrement button and leave', async () => {
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-counter></wcs-counter>
            <button>last</button>
        `);
        const counter = await page.find('wcs-counter');
        const button = await page.find('button');
        const blurSpy = await counter.spyOnEvent('wcsBlur');
        const decrementButton = await page.find('wcs-counter >>> wcs-button:first-child');
        // When
        await decrementButton.click();
        await button.click();
        await page.waitForChanges();

        // Then
        expect(blurSpy).toHaveReceivedEventTimes(1);
    });
    it('should fire wcsBlur event when the user click on increment button and leave', async () => {
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-counter></wcs-counter>
            <button>last</button>
        `);
        const counter = await page.find('wcs-counter');
        const button = await page.find('button');
        const blurSpy = await counter.spyOnEvent('wcsBlur');
        const incrementButton = await page.find('wcs-counter >>> wcs-button:last-child');
        // When
        await incrementButton.click();
        await button.click();
        await page.waitForChanges();

        // Then
        expect(blurSpy).toHaveReceivedEventTimes(1);
    });
    it('should not be interactive when disabled', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-counter disabled="true"></wcs-counter>
        `);
        const counter = await page.find('wcs-counter');
        const changeSpy = await counter.spyOnEvent('wcsChange');
        const incrementButton = await page.find('wcs-counter >>> wcs-button:last-child');

        // When
        await incrementButton.click();
        await page.waitForChanges();

        // Then
        expect(changeSpy).not.toHaveReceivedEvent();
        expect(await counter.getProperty('value')).toBe(0);
        expect(await incrementButton.getProperty('disabled')).toBe(true);
    });
});
