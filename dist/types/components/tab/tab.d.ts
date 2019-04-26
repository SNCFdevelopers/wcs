import '../../stencil.core';
import { ComponentDidLoad, EventEmitter } from '../../stencil.core';
/**
 *
 */
export declare class Tab implements ComponentDidLoad {
    /**
     * The header you want to be displayed for this tab.
     */
    header: string;
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
