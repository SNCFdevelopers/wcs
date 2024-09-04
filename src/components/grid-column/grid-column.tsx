import {
    Component,
    ComponentInterface,
    Element,
    Event,
    EventEmitter,
    h,
    Host, Method,
    Prop,
    Watch
} from '@stencil/core';
import {
    WcsCellFormatter,
    WcsGridColumnSortChangeEventDetails,
    WcsSortFn,
    WcsSortOrder
} from '../grid/grid-interface';
import { GridSortArrow } from './grid-sort-arrow';
import {
    inheritAriaAttributes,
    inheritAttributes,
    isEnterKey,
    isSpaceKey,
    setOrRemoveAttribute
} from "../../utils/helpers";
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";

const GRID_COLUMN_INHERITED_ATTRS = ['tabindex', 'title'];

/**
 * The grid column is a subcomponent of `wcs-grid` that represents a column of the table.
 * @cssprop --wcs-grid-column-border-left - Border separator between column names
 * @csspart [path]-column - CSS part for each column for styling. e.g: first_name-column, email-column
 */
@Component({
    tag: 'wcs-grid-column',
    styleUrl: 'grid-column.scss',
    shadow: true
})
export class GridColumn implements ComponentInterface, MutableAriaAttribute {
    @Element() private el: HTMLWcsGridColumnElement;
    private nativeTh!: HTMLTableHeaderCellElement;
    private buttonOrDiv: HTMLButtonElement | HTMLDivElement;
    private inheritedAttributes: { [k: string]: any } = {};
    /**
     * Represents the name of the field from the `data` object (e.g: first_name, last_name, email, ...)
     */
    @Prop() path: string;
    /**
     * The name of the column displayed on the table (e.g: First Name, Last Name, Email, ...)
     */
    @Prop() name: string;
    /**
     * Make the column sortable.
     */
    @Prop() sort: boolean = false;
    /**
     * Customizable sort function to change the comparison of values.
     */
    @Prop() sortFn: WcsSortFn;
    /**
     * Customizable formatter function to render the cell differently.
     */
    @Prop() formatter: WcsCellFormatter;
    /**
     * Defines if the column sort is ascending or descending.  
     * `none` = the column is not sorted.
     */
    @Prop({mutable: true}) sortOrder: WcsSortOrder = 'none';
    /**
     * Set the column `<th>` element width.
     */
    @Prop() width: string;
    /**
     * Set to true if using a `wcs-custom-cell` linked to it.
     */
    @Prop() customCells: boolean = false;
    /**
     * Flag to hide the column.
     */
    @Prop() hidden: boolean = false;
    /**
     * Event emitted when the sort of the column is changed.
     */
    @Event() wcsSortChange!: EventEmitter<WcsGridColumnSortChangeEventDetails>;
    /**
     * Event emitted if the column is dynamically switching visibility.
     */
    @Event() wcsHiddenChange!: EventEmitter<boolean>;

    /**
     * This property mustn't be set by hand, it is set by the wcs-grid component to move the focus between grid columns
     * using keyboard.
     * @internal
     */
    @Prop() public cursorPosition: {col: number, row: number};

    /**
     * This property mustn't be set by hand, it is set by the wcs-grid component to register the column index in a
     * grid in order to move the focus between the grid columns.
     * @internal
     */
    @Prop() public columnPosition: number;
    
    componentWillLoad(): Promise<void> | void {
        this.inheritedAttributes = {
            ...inheritAriaAttributes(this.el),
            ...inheritAttributes(this.el, GRID_COLUMN_INHERITED_ATTRS),
        };
    }
    
    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        setOrRemoveAttribute(this.nativeTh, attr, value);
    }

    @Watch('hidden')
    parseMyObjectProp(newValue: boolean) {
        this.wcsHiddenChange.emit(newValue);
    }

    @Watch('sortOrder')
    sortOrderChange(_: WcsSortOrder) {
        this.emitSortConfig();
    }

    emitSortConfig() {
        if (!this.sort) return;
        this.wcsSortChange.emit({
            column: this.el,
            order: this.sortOrder,
            sortFn: this.sortFn
        });
    }

    getSortOrderForAriaSort(sortOrder: WcsSortOrder) {
        switch (sortOrder) {
            case 'asc':
                return 'ascending';
            case 'desc':
                return 'descending';
            case 'none':
            default:
                return 'none';
        }
    }
    
    private getTabIndex() {
        return this.cursorPosition?.col === this.columnPosition
        && this.cursorPosition?.row === 0 ? 0 : -1;
    }

    private getTagName() {
        return this.sort ? 'button' : 'div';
    }
    
    private delegateFocusToButton() {
        if (this.sort) {
            this.buttonOrDiv.focus();
        }
    }

    render(): any {
        const ButtonOrDiv = this.getTagName();
        return (<Host slot="grid-column">
            <th style={{width: this.width}}
                class={this.sort ? 'pointer' : ''}
                tabIndex={this.sort ? -1 : this.getTabIndex()}
                scope="col"
                onClick={this.onSortClick.bind(this)}
                onKeyDown={this.handleSortKeyDown.bind(this)}
                onFocus={this.delegateFocusToButton.bind(this)}
                aria-sort={this.sort ? this.getSortOrderForAriaSort(this.sortOrder) : null}
                ref={(el) => (this.nativeTh = el)}
                {...this.inheritedAttributes}
            >
                <ButtonOrDiv class="grid-column-th-content"
                        ref={(el: HTMLButtonElement | HTMLDivElement) => this.buttonOrDiv = el}
                        tabIndex={this.sort ? this.getTabIndex() : -1}>
                    <span>{this.name}</span>
                    {
                        this.sort ? <GridSortArrow state={this.sortOrder}/> : ''
                    }
                </ButtonOrDiv>
            </th>
        </Host>)
    }

    private onSortClick() {
        if (!this.sort) return;
        
        // @Watch on sortOrder property will trigger wcsSortChange event
        this.sortOrder = this.sortOrder === 'none' || this.sortOrder === 'desc' ? 'asc' : 'desc';
    }
    
    private handleSortKeyDown(_event: KeyboardEvent) {
        if (isSpaceKey(_event) || isEnterKey(_event)) {
            _event.preventDefault();
            this.onSortClick();
        }
    }
}
