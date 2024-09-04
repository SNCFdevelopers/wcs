import { Component, Prop, ComponentInterface, h, Element, Method } from '@stencil/core';
import { inheritAriaAttributes, inheritAttributes, setOrRemoveAttribute } from "../../utils/helpers";
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";

const PROGRESS_RADIAL_ARIA_INHERITED_ATTRS = ['title'];

/**
 * The progress-radial component is a circular progress bar that indicates the current completion of a task. 
 *
 * ## Accessibility guidelines 💡
 * > Aria attributes and how to display the progress-radial depend on the use case in your application :
 * >
 * > - **Case 1 : decorative**
 * > If the progress-radial is used as a decoration _(if removed, the user doesn't lose any relevant information)_ or in the
 * > context of another component _(such as progress-radial in a card)_ => **you don't need to show the label nor add an aria-label**.
 * >
 * > - **Case 2 : informative**
 * > If the progress-radial is used to convey important information _(e.g., form completion status, dashboard KPI)_, you need to :
 * >   - **Provide a visible label** that describes the purpose of the progress-radial.
 * >   - **Set the `showLabel` property to `true`** to show the percentage inside the progress-radial.
 * >   - Optionally, use aria-label to provide an accessible name if a visible label is not present.
 *
 */
@Component({
    tag: 'wcs-progress-radial',
    styleUrl: 'progress-radial.scss',
    shadow: true
})
export class ProgressRadial implements ComponentInterface, MutableAriaAttribute {
    
    @Element() private el!: HTMLWcsProgressRadialElement;
    private nativeProgress!: HTMLDivElement;
    private inheritedAttributes: { [k: string]: any } = {};
    
    /** The initial background image size (120x120) as specified in the background-image css property of .progress-circle */
    private backgroundImageSize: number = 120;
    
    /** The size of the progress radial (in px) */
    @Prop() size: number = 120;
    /** Whether the component should display the % label inside */
    @Prop() showLabel: boolean = false;
    /** The value of the progress radial. Prefer values between 0 and 100. */
    @Prop() value: number = 0;
    
    componentWillLoad(): Promise<void> | void {
        this.inheritedAttributes = {
            ...inheritAriaAttributes(this.el),
            ...inheritAttributes(this.el, PROGRESS_RADIAL_ARIA_INHERITED_ATTRS),
        };
    }

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        setOrRemoveAttribute(this.nativeProgress, attr, value);
    }

    render() {
        const { backgroundImageSize, halfSize } = { backgroundImageSize: this.backgroundImageSize, halfSize: this.backgroundImageSize / 2 };
        return (
            <div class="progress-circle"
                 data-component="radial-progress"
                 style={this.getSize()}
                 role="progressbar"
                 aria-valuemin="0"
                 aria-valuemax="100"
                 aria-valuenow={this.value}
                 aria-valuetext={this.value + '%'}
                 ref={(el) => (this.nativeProgress = el)}
                 {...this.inheritedAttributes}>
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
