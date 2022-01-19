import { Component, ComponentInterface, h, Prop } from '@stencil/core';

/**
 * Component displaying progress as a bar.
 */
@Component({
  tag: 'wcs-progress-bar',
  styleUrl: 'progress-bar.scss',
  shadow: true
})
export class ProgressBar implements ComponentInterface {
  /**
   * Whether the component display the small version
   */
  @Prop() small: boolean = false;

  /**
   * Whether it displays a label indicating the percentage of progress above the bar.
   */
  @Prop() showLabel: boolean = false;

  /**
   * The actual value of the progress.
   * Ranging from 0 to 100.
   */
  @Prop() value: number = 0;

  render() {
    const style = {
      width: this.value + '%'
    };

    return (
      <div class={this.rootClasses()} >
        <div class="progress-bar" style={style}>
          {this.showLabel &&
            <span class="progress-label">
              {this.value}<sup>%</sup>
            </span>
          }
        </div>
      </div>
    );
  }

  rootClasses(): string {
    let classes = 'progress';
    if (this.small) classes += ' small';
    if (this.showLabel) classes += ' has-label';
    // FIXME: Temporary fix so the label doesn't appear before the bar.
    if (this.value === 0) classes += ' value-zero';
    return classes;
  }
}
