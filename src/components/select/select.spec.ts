import { TestWindow } from '@stencil/core/testing';
import { Select } from './select';

describe('select', () => {
  it('should build', () => {
    expect(new Select()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLSelectElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [Select],
        html: '<select></select>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
