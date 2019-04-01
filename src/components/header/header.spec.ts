import { TestWindow } from '@stencil/core/testing';
import { Header } from './header';

describe('wcs-header', () => {
  it('should build', () => {
    expect(new Header()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLWcsHeaderElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [Header],
        html: '<wcs-header></wcs-header>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
