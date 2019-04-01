import { TestWindow } from '@stencil/core/testing';
import { App } from './app';

describe('wcs-app', () => {
  it('should build', () => {
    expect(new App()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLWcsAppElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [App],
        html: '<wcs-app></wcs-app>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
