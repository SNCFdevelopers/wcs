import '../../stencil.core';
import { ComponentInterface } from '../../stencil.core';
export declare class ProgressRadial implements ComponentInterface {
    size: number;
    showLabel: boolean;
    value: number;
    render(): JSX.Element;
    getSvgStyle(): {
        'stroke-dasharray': number;
        'stroke-dashoffset': number;
    };
}
