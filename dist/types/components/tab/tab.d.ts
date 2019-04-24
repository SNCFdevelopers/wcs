import '../../stencil.core';
import { ComponentDidLoad, EventEmitter } from '../../stencil.core';
/**
 *
 */
export declare class Tab implements ComponentDidLoad {
    /**
     * This property should not be used,
     * it is only meant for internal use.
     * @internal
     * @ignore
     */
    slot: string;
    /**
     * XXX: Temporary fix, see tabs component
     * @internal
     * @ignore
     */
    wcsTabDidLoad: EventEmitter;
    componentDidLoad(): void;
    render(): JSX.Element;
}
