import { ComponentInterface } from '../../stencil.core';
/**
 * Component displaying progress as a bar.
 */
export declare class ProgressBar implements ComponentInterface {
    /**
     * Whether the component display the small version
     */
    small: boolean;
    /**
     * Whether it displays a label indicating the percentage of progress above the bar.
     */
    showLabel: boolean;
    /**
     * The actual value of the progress.
     * Ranging from 0 to 100.
     */
    value: number;
    render(): any;
    rootClasses(): string;
}
