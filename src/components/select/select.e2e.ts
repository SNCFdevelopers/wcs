import { newE2EPage } from '@stencil/core/testing';
/**
 * TODO: Add test for:
 * - Keyboard navigation
 *     - Expand with SPACE
 *     - Unexpand with ESCAPE || TAB
 *     - Select option with ARROW + ENTER
 * - Event emmition
 */

describe('select', () => {
    xit('should select value correctly', async () => {
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
        const option: HTMLWcsSelectOptionElement = select.shadowRoot
            .querySelector('.wcs-select-options')
            .querySelector<HTMLSlotElement>('slot')
            .assignedElements()[0] as any;
        const changeSpy = await select.spyOnEvent('wcsChange');
        // when
        await select.click(); // Expand
        option.click();
        // Then
        expect(changeSpy).toHaveBeenCalledWith({ value: '1' });
    });
    xit('should emit wcs-focus when focused', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-select>
            </wcs-select>
        `);
        const select = await page.find('wcs-select');
        const focusSpy = await select.spyOnEvent('wcsFocus');
        // When
        await select.focus();
        await page.waitForChanges();
        // Then
        expect(focusSpy).toHaveReceivedEventTimes(1);
    });
    xit('should expand when focused and press space', async () => {
        const page = await newE2EPage();
        // Given
        await page.setContent(`
          <form>
            <wcs-select>
                <wcs-select-option value="1">One</wcs-select-option>
                <wcs-select-option value="2">Two</wcs-select-option>
                <wcs-select-option value="3">Three</wcs-select-option>
            </wcs-select>
          </form>
        `);
        const select = await page.find('wcs-select');
        await select.focus();
        // When
        await select.press('Space');
        // Then
        // TODO: find how to test it is expanded.
        expect(false).toBe(true);
    });
});

