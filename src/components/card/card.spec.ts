import { TestWindow } from '@stencil/core/testing';

import { Card } from './card';

describe('wcs-card', () => {
  it('should build', () => {
    expect(new Card()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLWcsCardElement;
    let testWindow: TestWindow;

    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [Card],
        html: `<wcs-card><wcs-card>`,
      });
    });

    it('should have card class applied', async () => {
      await testWindow.flush();
      expect(element.classList.contains('card')).toBe(true);
    });
  });
});
