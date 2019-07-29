import { ComponentInterface } from '../../stencil.core';
import { Color } from '../../interface';
export declare class Badge implements ComponentInterface {
    /**
     * Select the badge color.
     * @default 'primary'
     */
    color: Color;
    private createColorClass;
    hostData(): {
        class: {
            [x: string]: boolean;
        };
    };
    render(): any;
}
