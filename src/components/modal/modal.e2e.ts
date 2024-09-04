import { newE2EPage } from '@stencil/core/testing';

describe('modal', () => {
    it('should trap the focus inside', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-modal show-close-button>
                <wcs-input id="first-input" type="text"></wcs-input>
                <wcs-button id="last-button" disabled class="wcs-primary" type="button">Envoyer</wcs-button>
            </wcs-modal>
        `); // Modal is opened by default in this test
        const modal = await page.find('wcs-modal');
        modal.setProperty('show', true);
        await page.waitForChanges();

        const button = await page.find('wcs-modal wcs-button');
        const showCloseButton = await page.find('wcs-modal .wcs-modal-header wcs-button');
        const input = await page.find('wcs-modal wcs-input');

        // When / Then
        let activeElementId = await page.evaluate(() => document.activeElement.id);
        expect(activeElementId).toEqual(showCloseButton.id);

        await page.keyboard.press('Tab');
        activeElementId = await page.evaluate(() => document.activeElement.id);
        expect(activeElementId).toEqual(input.id);

        await page.keyboard.press('Tab');
        activeElementId = await page.evaluate(() => document.activeElement.id);
        expect(activeElementId).toEqual(showCloseButton.id);

        await page.keyboard.press('Tab'); // input receives the focus

        button.setProperty('disabled', false);
        await page.waitForChanges();

        await page.keyboard.press('Tab');
        activeElementId = await page.evaluate(() => document.activeElement.id);
        expect(activeElementId).toEqual(button.id);
    });
});
