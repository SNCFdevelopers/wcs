import { newE2EPage } from '@stencil/core/testing';

describe('Input component', () => {
    it('Should fire wcsInput event once when user typing one char', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-input name="wcs-input-1" />
        `);
        const input = await page.find('wcs-input');
        const inputEvent = await page.spyOnEvent('wcsInput');

        // When
        await input.click();
        await input.press('B');

        // Then
        expect(inputEvent).toHaveReceivedEventTimes(1);
    });
    it('Should fire wcsInput event multiple times when user typing multiple chars', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-input name="wcs-input-1" />
        `);
        const input = await page.find('wcs-input');
        const inputEvent = await page.spyOnEvent('wcsInput');

        // When
        await input.click();
        await input.press('B');
        await input.press('o');
        await input.press('n');
        await input.press('j');
        await input.press('o');
        await input.press('u');
        await input.press('r');

        // Then
        expect(inputEvent).toHaveReceivedEventTimes(7);
    });
    it('Should fire wcsChange event when user commit change with blur (tab)', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-input name="wcs-input-1" />
            <button>Focus</button>
        `);
        const input = await page.find('wcs-input');
        const changeEvent = await page.spyOnEvent('wcsChange');

        // When
        await input.click();
        await input.press('B');
        await input.press('l');
        await input.press('u');
        await input.press('r');
        await input.press('Tab');

        await page.waitForChanges();

        // Then
        expect(changeEvent).toHaveReceivedEventTimes(1);
        expect(changeEvent).toHaveReceivedEventDetail({ value: 'Blur' });
    });
    it('Should fire wcsChange event when user commit change with blur (click)', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-input name="wcs-input-1"></wcs-input>
            <button>Focus</button>
        `);
        const input = await page.find('wcs-input');
        const button = await page.find('button');
        const changeEvent = await page.spyOnEvent('wcsChange');

        // When
        await input.click();
        await input.press('B');
        await input.press('l');
        await input.press('u');
        await input.press('r');
        await button.focus();

        // Then
        expect(changeEvent).toHaveReceivedEventTimes(1);
        expect(changeEvent).toHaveReceivedEventDetail({ value: 'Blur' });
    });
    it('Should fire wcsChange event when user commit change with enter', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-input name="wcs-input-1" />
        `);
        const input = await page.find('wcs-input');
        const changeEvent = await page.spyOnEvent('wcsChange');

        // When
        await input.click();
        await input.press('E');
        await input.press('n');
        await input.press('t');
        await input.press('e');
        await input.press('r');
        await input.press('Enter');

        // Then
        expect(changeEvent).toHaveReceivedEventTimes(1);
        expect(changeEvent).toHaveReceivedEventDetail({ value: 'Enter' });
    });
    it('Should not fire wcsChange event when value is programmatically set', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-input name="wcs-input-1" />
        `);
        const input = await page.find('wcs-input');
        const changeEvent = await page.spyOnEvent('wcsChange');

        // When
        input.setProperty('value', 'Programmatically set value');

        // Then
        expect(changeEvent).toHaveReceivedEventTimes(0);
    });
    it('Should not fire wcsInput event when value is programmatically set', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-input name="wcs-input-1" />
        `);
        const input = await page.find('wcs-input');
        const inputEvent = await page.spyOnEvent('wcsInput');

        // When
        input.setProperty('value', 'Programmatically set value');

        // Then
        expect(inputEvent).toHaveReceivedEventTimes(0);
    });
    it('Should have a default value when value attribute is set', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-input name="wcs-input-1" value="Default value" />
        `);
        const input = await page.find('wcs-input');

        // Then
        expect(await input.getProperty('value')).toBe('Default value');
        expect(await (await page.find('wcs-input >>> input')).getProperty('value')).toBe('Default value');
    });
    it('Should have a default value when value property is set', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-input name="wcs-input-1" />
        `);
        const input = await page.find('wcs-input');

        // When
        input.setProperty('value', 'Default value');
        await page.waitForChanges();

        // Then
        expect(await input.getProperty('value')).toBe('Default value');
        expect(await (await page.find('wcs-input >>> input')).getProperty('value')).toBe('Default value');
    });
});
