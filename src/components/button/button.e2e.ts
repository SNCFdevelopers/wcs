import { newE2EPage } from '@stencil/core/testing';

describe('button', () => {
    // XXX: this test display an error in console but actually works
    // This is maybe due to the form submiting making the page reload ?
    it('should trigger submit when in a form', async () => {
        const page = await newE2EPage();
        // Given
        await page.setContent(`
      <form>
        <wcs-button type="submit"></wcs-button>
      </form>
    `);
        const button = await page.find('wcs-button');
        const form = await page.find('form');
        const formSubmit = await form.spyOnEvent('submit');
        // When
        await button.click();
        // Then
        expect(formSubmit).toHaveReceivedEvent();
    });
});

