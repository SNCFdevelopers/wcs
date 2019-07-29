import { ComponentInterface, EventEmitter } from '../../stencil.core';
import { WcsTabsAlignment, WcsTabsChangeEvent } from './tabs-interface';
/**
 * ### Features:
 * - [ ] Switch between different tabs
 * - [ ] Default selected value
 * - [ ] Disabled tab
 * - [ ] Customizing tab header
 * - [x] Header alignment, left / center / right
 * - [ ] Animation
 * - [ ] Disable animation
 * - [ ] Accessibility
 *  - LEFT_ARROW    Move focus to previous tab
 *  - RIGHT_ARROW    Move focus to next tab
 *  - HOME    Move focus to first tab
 *  - END    Move focus to last tab
 *  - SPACE or ENTER    Switch to focused tab
 * - [ ] Customize animation
 */
export declare class Tabs implements ComponentInterface {
    el: HTMLWcsSelectElement;
    align: WcsTabsAlignment;
    /**
     * Current selected tab index
     */
    selectedIndex: number;
    headers: string[];
    /**
     * Emitted when the selected tab change
     */
    wcsTabsChange: EventEmitter<WcsTabsChangeEvent>;
    private didLoad;
    private tabsEl;
    componentDidLoad(): void;
    selectedIndexChanged(): void;
    /**
     * XXX: Temporary fix waiting for two issues to be resolved:
     * - https://github.com/ionic-team/stencil/issues/1261
     * - https://github.com/ionic-team/stencil/issues/1130
     *
     * When resolved this should just be done once in the componentDidLoad method.
     */
    refreshHeaders(): void;
    selectTab(index: number): void;
    getHeaderAlignClass(): "start" | "center" | "end";
    componentWillUpdate(): void;
    render(): any[];
}
