import { ComponentDidLoad, EventEmitter } from '../../stencil.core';
/**
 * Tab content component.
 * Use this component to specify the content of a component.
 */
export declare class Tab implements ComponentDidLoad {
    /**
     * The header you want to be displayed for this tab.
     */
    header: string;
    /**
     * XXX: Temporary fix, see tabs component
     * @internal
     * @ignore
     */
    wcsTabDidLoad: EventEmitter;
    componentDidLoad(): void;
    render(): any;
}
