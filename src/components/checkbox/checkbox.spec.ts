import { TestWindow } from '@stencil/core/testing';
import { Checkbox } from './checkbox';

describe('checkbox', () => {
  it('should build', () => {
    expect(new Checkbox()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLCheckboxElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [Checkbox],
        html: '<checkbox></checkbox>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
