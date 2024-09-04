import { Component, ComponentInterface, Element, h, Method, Prop } from '@stencil/core';
import { WcsSize } from "../../shared-types";
import { inheritAriaAttributes, inheritAttributes, setOrRemoveAttribute } from "../../utils/helpers";
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";


const PROGRESS_BAR_ARIA_INHERITED_ATTRS = ['title'];

/**
 * The progress-bar component is a horizontal bar that indicates the current completion of a task.
 *
 * ## Accessibility guidelines 💡
 * > Aria attributes and how to display the progress-bar depend on the use case in your application :
 * >
 * > - **Case 1 : decorative**
 * > If the progress-bar is used as a decoration _(if removed, the user doesn't lose any relevant information)_ or in the
 * > context of another component _(such as progress-bar in a card, stepper, ...)_ => **you don't need to show the label nor add an aria-label**.
 * >
 * > - **Case 2 : informative**
 * > If the progress-bar is used to convey important information _(e.g., form completion status, dashboard KPI)_, you need to :
 * >   - **Provide a visible label** that describes the purpose of the progress-bar.
 * >   - **Set the `showLabel` property to `true`** to show the percentage above the progress-bar.
 * >   - Optionally, use aria-label to provide an accessible name if a visible label is not present.
 *
 * @cssprop --wcs-progress-bar-border-radius - Border radius
 * @cssprop --wcs-progress-bar-border-radius-small - Border radius for size small
 * @cssprop --wcs-progress-bar-animation-duration - Animation duration
 */
@Component({
    tag: 'wcs-progress-bar',
    styleUrl: 'progress-bar.scss',
    shadow: true
})
export class ProgressBar implements ComponentInterface, MutableAriaAttribute {

    @Element() private el!: HTMLWcsProgressBarElement;
    private nativeProgress!: HTMLDivElement;
    private inheritedAttributes: { [k: string]: any } = {};


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

    componentWillLoad(): Promise<void> | void {
        this.inheritedAttributes = {
            ...inheritAriaAttributes(this.el),
            ...inheritAttributes(this.el, PROGRESS_BAR_ARIA_INHERITED_ATTRS),
        };
    }

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        setOrRemoveAttribute(this.nativeProgress, attr, value);
    }

    render() {
        const style = {
            width: this.value + '%'
        };

        return (
            <div class={this.rootClasses()}
                 role="progressbar"
                 aria-valuemin="0"
                 aria-valuemax="100"
                 aria-valuenow={this.value}
                 aria-valuetext={this.value + '%'}
                 ref={(el) => (this.nativeProgress = el)}
                 {...this.inheritedAttributes}>
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
