import { Component, ComponentInterface, h, Prop } from '@stencil/core';
import { WcsSize } from "../../shared-types";

/**
 * Component displaying progress as a horizontal bar.
 * @cssprop --wcs-progress-bar-border-radius - Border radius
 * @cssprop --wcs-progress-bar-border-radius-small - Border radius for size small
 * @cssprop --wcs-progress-bar-animation-duration - Animation duration
 */
@Component({
  tag: 'wcs-progress-bar',
  styleUrl: 'progress-bar.scss',
  shadow: true
})
export class ProgressBar implements ComponentInterface {
  /**
   * Specify the size of the progress bar.  
   * m = default, s = smaller
   */
  @Prop() size: Extract<WcsSize, 'm' | 's'> = 'm';

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
      <div class={this.rootClasses()}
           role="meter"
           aria-valuemin="0"
           aria-valuemax="100"
           aria-valuenow={this.value}
           aria-valuetext={this.value + '%'}>
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
    if (this.showLabel) classes += ' has-label';
    // FIXME: Temporary fix so the label doesn't appear before the bar.
    if (this.value === 0) classes += ' value-zero';
    return classes;
  }
}
