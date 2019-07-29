import { ComponentInterface } from '../../stencil.core';
export declare class ProgressRadial implements ComponentInterface {
    size: number;
    showLabel: boolean;
    value: number;
    render(): any;
    getSvgStyle(): {
        'stroke-dasharray': string;
        'stroke-dashoffset': string;
    };
}
