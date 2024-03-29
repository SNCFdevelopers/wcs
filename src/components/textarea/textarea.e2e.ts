import { newE2EPage } from '@stencil/core/testing';

describe('Textarea component', () => {
    it('Should fire wcsInput event once when user typing one char', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-textarea name="wcs-textarea-1" />
        `);
        const textarea = await page.find('wcs-textarea');
        const inputEvent = await page.spyOnEvent('wcsInput');

        // When
        await textarea.click();
        await textarea.press('B');

        // Then
        expect(inputEvent).toHaveReceivedEventTimes(1);
    });


    it('Should fire wcsInput event multiple times when user typing multiple chars', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-textarea name="wcs-textarea-1" />
        `);
        const textarea = await page.find('wcs-textarea');
        const inputEvent = await page.spyOnEvent('wcsInput');

        // When
        await textarea.click();
        await textarea.press('B');
        await textarea.press('o');
        await textarea.press('n');
        await textarea.press('j');
        await textarea.press('o');
        await textarea.press('u');
        await textarea.press('r');

        // Then
        expect(inputEvent).toHaveReceivedEventTimes(7);
    });
    it('Should fire wcsChange event when user commit change with blur (tab)', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-textarea name="wcs-textarea-1" />
            <button>Focus</button>
        `);
        const textarea = await page.find('wcs-textarea');
        const changeEvent = await page.spyOnEvent('wcsChange');

        // When
        await textarea.click();
        await textarea.press('B');
        await textarea.press('l');
        await textarea.press('u');
        await textarea.press('r');
        await textarea.press('Tab');

        await page.waitForChanges();

        // Then
        expect(changeEvent).toHaveReceivedEventTimes(1);
        expect(changeEvent).toHaveReceivedEventDetail({ value: 'Blur' });
    });
    it('Should fire wcsChange event when user commit change with blur (click)', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-textarea name="wcs-textarea-1"></wcs-textarea>
            <button>Focus</button>
        `);
        const textarea = await page.find('wcs-textarea');
        const button = await page.find('button');
        const changeEvent = await page.spyOnEvent('wcsChange');

        // When
        await textarea.click();
        await textarea.press('B');
        await textarea.press('l');
        await textarea.press('u');
        await textarea.press('r');
        await button.focus();

        // Then
        expect(changeEvent).toHaveReceivedEventTimes(1);
        expect(changeEvent).toHaveReceivedEventDetail({ value: 'Blur' });
    });
    it('Should not fire wcsChange event when value is programmatically set', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-textarea name="wcs-textarea-1" />
        `);
        const textarea = await page.find('wcs-textarea');
        const changeEvent = await page.spyOnEvent('wcsChange');

        // When
        textarea.setProperty('value', 'Programmatically set value');

        // Then
        expect(changeEvent).toHaveReceivedEventTimes(0);
    });
    it('Should not fire wcsInput event when value is programmatically set', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-textarea name="wcs-textarea-1" />
        `);
        const textarea = await page.find('wcs-textarea');
        const inputEvent = await page.spyOnEvent('wcsInput');

        // When
        textarea.setProperty('value', 'Programmatically set value');

        // Then
        expect(inputEvent).toHaveReceivedEventTimes(0);
    });
    it('Should have a default value when value attribute is set', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-textarea name="wcs-textarea-1" value="Default value" />
        `);
        const textarea = await page.find('wcs-textarea');

        // Then
        expect(await textarea.getProperty('value')).toBe('Default value');
        expect(await (await page.find('wcs-textarea >>> textarea')).getProperty('value')).toBe('Default value');
    });
    it('Should have a default value when value property is set', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-textarea name="wcs-textarea-1" />
        `);
        const textarea = await page.find('wcs-textarea');

        // When
        textarea.setProperty('value', 'Default value');
        await page.waitForChanges();

        // Then
        expect(await textarea.getProperty('value')).toBe('Default value');
        expect(await (await page.find('wcs-textarea >>> textarea')).getProperty('value')).toBe('Default value');
    });
});
