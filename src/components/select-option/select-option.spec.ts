import { TestWindow } from '@stencil/core/testing';
import { SelectOption } from './select-option';

describe('select-option', () => {
  it('should build', () => {
    expect(new SelectOption()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLSelectOptionElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [SelectOption],
        html: '<select-option></select-option>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
