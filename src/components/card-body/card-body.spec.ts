import { TestWindow } from '@stencil/core/testing';

import { CardBody } from './card-body';

describe('wcs-card-body', () => {
  it('should build', () => {
    expect(new CardBody()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLWcsCardElement;
    let testWindow: TestWindow;

    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [CardBody],
        html: `<wcs-card-body><wcs-card-body>`,
      });
    });

    it('should have card-body class and slot applied', async () => {
      await testWindow.flush();
      expect(element.classList.contains('card-body')).toBe(true);
      expect(element.getAttribute('slot')).toEqual('card-body');
    });
  });
});
