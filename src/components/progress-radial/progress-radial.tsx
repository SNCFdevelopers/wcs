import { Component, Prop, ComponentInterface, h } from '@stencil/core';

/**
 * The progress-radial component is a circular progress bar that indicates the current completion of a task. 
 */
@Component({
    tag: 'wcs-progress-radial',
    styleUrl: 'progress-radial.scss',
    shadow: true
})
export class ProgressRadial implements ComponentInterface {
    /** The initial background image size (120x120) as specified in the background-image css property of .progress-circle */
    private backgroundImageSize: number = 120;
    
    /** The size of the progress radial (in px) */
    @Prop() size: number = 120;
    /** Whether the component should display the % label inside */
    @Prop() showLabel: boolean = false;
    /** The value of the progress radial. Prefer values between 0 and 100. */
    @Prop() value: number = 0;

    render() {
        const { backgroundImageSize, halfSize } = { backgroundImageSize: this.backgroundImageSize, halfSize: this.backgroundImageSize / 2 };
        return (
            <div class="progress-circle" data-component="radial-progress" style={this.getSize()}>
                <svg class="progress-circle-figure"
                    data-role="figure"
                    viewBox={`0 0 ${backgroundImageSize} ${backgroundImageSize}`}
                    style={this.getSvgStyle()}>
                        <circle class="progress-circle-meter" cx={halfSize} cy={halfSize} r="54" stroke-width="12" />
                        <circle class="progress-circle-value" cx={halfSize} cy={halfSize} r="54" stroke-width="12" />
                </svg>
                {this.showLabel &&
                    <div class="progress-circle-label" data-role="label">
                        <span>
                            <span data-role="labelvalue">{this.value}</span><sup>%</sup>
                        </span>
                    </div>
                }
                <input data-role="control"
                       class="sr-only"
                       type="range"
                       role="meter"
                       aria-valuemin="0"
                       aria-valuemax="100"
                       aria-valuenow={this.value} 
                       aria-valuetext={this.value + '%'}
                       value={this.value} />
            </div>
        );
    }

    getSvgStyle() {
        return {
            'stroke-dasharray': '339.292',
            'stroke-dashoffset': `${339.292 - (this.value / 100) * 339.292}`,
        };
    }
    
    getSize() {
        return {
            'width': `${(this.size)}px`,
            'height': `${(this.size)}px`,
        };
    }
}
