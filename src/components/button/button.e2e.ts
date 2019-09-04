import { newE2EPage } from '@stencil/core/testing';

describe('button', () => {
    // XXX: this test display an error in console but actually works
    // This is maybe due to the form submiting making the page reload ?
    it('should trigger submit when in a form', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <form>
                <wcs-button class="wcs-primary" type="submit"></wcs-button>
            </form>
        `);
        const form = await page.find('form');
        const formSubmit = await form.spyOnEvent('submit');
        // When
        // XXX temporary fix see : https://github.com/GoogleChrome/puppeteer/issues/2977
        await page.evaluate(() => {
            document.querySelector('wcs-button').click();
        });
        // Then
        expect(formSubmit).toHaveReceivedEvent();
    });
});

