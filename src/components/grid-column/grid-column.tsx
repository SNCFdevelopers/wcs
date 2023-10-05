import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Prop, Watch } from '@stencil/core';
import { WcsCellFormatter, WcsGridColumnSortChangeEventDetails, WcsSortFn, WcsSortOrder } from '../grid/grid-interface';
import { GridSortArrow } from './grid-sort-arrow';

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
export class GridColumn implements ComponentInterface {
    @Element() private el: HTMLWcsGridColumnElement;
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

    render(): any {
        return (<Host onClick={this.onSortClick.bind(this)} slot="grid-column">
            <th style={{width: this.width}} class={this.sort ? 'pointer' : ''}>
                <div class="grid-column-th-content">
                    <span>{this.name}</span>
                    {
                        this.sort ? <GridSortArrow state={this.sortOrder}/> : ''
                    }
                </div>
            </th>
        </Host>)
    }

    private onSortClick() {
        // @Watch on sortOrder property will trigger wcsSortChange event
        this.sortOrder = this.sortOrder === 'none' || this.sortOrder === 'desc' ? 'asc' : 'desc';
    }
}
