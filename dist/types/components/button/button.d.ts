import { ComponentInterface } from '../../stencil.core';
import { ButtonType } from './button-interface';
/**
 * Button component, can also be a link when specifying href.
 */
export declare class Button implements ComponentInterface {
    el: HTMLElement;
    win: Window;
    /**
     * Specify the button type.
     */
    type: ButtonType;
    /**
     * Set a URL to point to.
     * If specified use a `a` tag instead of `btn`.
     */
    href?: string;
    /**
     * Specify wether the button is disabled or not.
     */
    disabled: boolean;
    /**
     * Specify wether the button should have a ripple effect or not.
     */
    ripple: boolean;
    /**
     * This attribute specifies the size of the button.
     * Setting this attribute will change the height and padding of a button.
     */
    mode: 'normal' | 'small' | 'block' | 'icon-only' | 'round';
    onClick(ev: Event): void;
    render(): any;
    private generateClasses;
    componentDidLoad(): void;
    private addRippleEffect;
}
