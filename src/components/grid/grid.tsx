import {
    Component,
    ComponentDidLoad,
    ComponentInterface,
    Element,
    Event,
    EventEmitter,
    forceUpdate,
    h,
    Host,
    Listen,
    Prop,
    State,
    VNode,
    Watch
} from '@stencil/core';
import {
    getSortOrderInteger,
    HyperFunc,
    WcsGridAllRowSelectedEventDetails,
    WcsGridCell,
    WcsGridColumnSortChangeEventDetails,
    WcsGridPaginationChangeEventDetails,
    WcsGridRow,
    WcsGridRowData,
    WcsGridRowSelectedEventDetails,
    WcsGridSelectionConfig
} from './grid-interface';
import { v4 as uuid } from 'uuid';
import { cloneDeep, isEqual, get } from 'lodash-es';
import { GridPagination } from '../grid-pagination/grid-pagination';

/**
 * The grid component is a complex component used as an HTML table to display collections of data.
 *
 * @cssprop --wcs-grid-highlight-color - Color for selected rows
 * @cssprop --wcs-grid-column-border-left - Left border of all grid headers
 * @slot grid-column - The slot containing the column of the grid in the `<thead>`
 * @slot grid-pagination - The slot containing the pagination of the grid below the `<table>`
 */
@Component({
    tag: 'wcs-grid',
    styleUrl: 'grid.scss',
    shadow: true
})
export class Grid implements ComponentInterface, ComponentDidLoad {
    @Element() private el!: HTMLWcsGridElement;
    /**
     * Manage sort and pagination with a backend server when set to `true`
     */
    @Prop() serverMode: boolean = false;
    /**
     * Contains the data to display in the table from a js object
     */
    @Prop() data: any[];
    /**
     * Flag to display a spinner during data loading
     */
    @Prop() loading: boolean;
    /**
     * Used to manage grid's row selection.  
     * "none": no row can be selected.  
     * "multiple": several rows can be selected.  
     * "single": one row only can be selected.  
     */
    @Prop() selectionConfig: WcsGridSelectionConfig = 'none';
    /**
     * Set the selected items (rows)
     */
    @Prop() selectedItems: any | any[] = [];
    /**
     * Automatically set by the component to reference the wcs-grid-pagination HTML element by its id.
     */
    @Prop() wcsGridPaginationId: string;
    /**
     * Name of the object's key that will be used to display the cells whose `keyValue` attribute matches to the
     * object's value for this key.
     */
    @Prop() rowIdPath: string;
    @State() private columns: HTMLWcsGridColumnElement[];
    @State() private paginationEl: HTMLWcsGridPaginationElement;
    /**
     * Rows to display, contains user data and meta data
     */
    @State() private rows: WcsGridRow[] = [];
    /**
     * Event emitted when a row is selected or unselected
     */
    @Event() wcsGridSelectionChange!: EventEmitter<WcsGridRowSelectedEventDetails>;
    /**
     * Event emitted when all rows are selected or unselected
     */
    @Event() wcsGridAllSelectionChange!: EventEmitter<WcsGridAllRowSelectedEventDetails>;

    @Watch('data')
    onDataChange(newValue: any[]): void {
        this.updateGridRows(newValue);
        this.refreshSort(false);
    }

    @Watch('selectedItems')
    onSelectedItemsPropertyChange(newValue: any | any[]) {
        this.updateSelectionWithValues(newValue);
    }

    @Listen('wcsHiddenChange')
    onHiddenColumnChange(): void {
        // We use forceUpdate because the fact of hiding a column or not does not modify the internal structure of the grid (WcsGridRow).
        // Hide a column only impacts the way it is rendered but the grid-column remains in the dom and in our internal model.
        forceUpdate(this);
    }

    private updateSelectionWithValues(values: any | any[]) {
        if (this.selectionConfig === 'single') {
            this.rows.map(r => r.selected = false);
            for (const row of this.rows) {
                if (isEqual(row.data, values)) {
                    row.selected = true;
                    break; // only one line can be selected
                }
            }
        } else if (this.selectionConfig === 'multiple') {
            this.rows.map(r => r.selected = false);
            for (const row of this.rows) {
                if (values.find(x => isEqual(x, row.data))) {
                    row.selected = true;
                }
            }
        }
        this.rows = cloneDeep(this.rows);
    }

    private wcsGridRowToWcsGridRowData(row: WcsGridRow): WcsGridRowData {
        return {selected: row.selected, page: row.page, data: row.data};
    }

    private updateGridRows(data: any[]): void {
        const rows: WcsGridRow[] = [];
        if (data && this.columns) {
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for (let i = 0; i < data.length; i++) {
                const row: WcsGridRow = {
                    uuid: uuid(),
                    data: data[i],
                    selected: false,
                    cells: []
                };
                for (const column of this.columns) {
                    row.cells.push({
                        content: get(data[i], column.path),
                        column,
                        formatter: column.formatter
                    })
                }
                rows.push(row);
            }
            this.rows = rows;
            this.updatePageIndex();
        }
    }

    componentDidLoad(): void {
        this.columns = this.getGridColumnsFromTemplate();
        this.paginationEl = this.wcsGridPaginationId
            ? document.getElementById(this.wcsGridPaginationId) as HTMLWcsGridPaginationElement
            : this.getGridPaginationsFromTemplate()[0];
        this.updateGridRows(this.data);
        if (this.selectedItems) {
            this.updateSelectionWithValues(this.selectedItems);
        }
        this.refreshSort(true);
    }

    /**
     * Handle existing column's filters (defined before the grid is instantiated)
     * @private
     */
    private refreshSort(refreshOthersColmumnsSortOrderState: boolean) {
        //fixme: why the column property can be null or undefined?
        if (this.columns) {
            const [first, ...other] = this.columns.filter(c => c.sortOrder !== 'none');
            if (first && !this.serverMode) {
                this.sortBy(first);
            }
            refreshOthersColmumnsSortOrderState && this.disableSortOrderForColumns(other);
        }
    }

    private disableSortOrderForColumns(columns: HTMLWcsGridColumnElement[] | null | undefined): void {
        columns?.forEach(c => c.sortOrder = 'none');
    }

    private getGridColumnsFromTemplate(): HTMLWcsGridColumnElement[] {
        const slotted = this.el.shadowRoot.querySelector('slot[name="grid-column"]') as HTMLSlotElement;
        return slotted.assignedElements() as any as HTMLWcsGridColumnElement[];
    }

    private getGridPaginationsFromTemplate(): HTMLWcsGridPaginationElement[] {
        const slotted = this.el.shadowRoot.querySelector('slot[name="grid-pagination"]') as HTMLSlotElement;
        return slotted.assignedElements() as any as HTMLWcsGridPaginationElement[];
    }

    @Listen('wcsSortChange')
    sortChangeEventHandler(event: CustomEvent<WcsGridColumnSortChangeEventDetails>): void {
        if (event.detail.order === 'none') return;
        // We keep only one active sort column
        this.disableSortOrderForColumns(this.columns.filter(c => c !== event.detail.column));
        if (this.serverMode) return;
        this.sortBy(event.detail.column);
        this.updatePageIndex();
    }

    /**
     * Sorts the grid rows according to the given column's configuration
     * @param colmun Column from which to extract the sorting configuration
     * @private
     */
    private sortBy(colmun: HTMLWcsGridColumnElement) {
        if (colmun.sortFn) {
            this.rows = cloneDeep(this.rows)
                .sort((a: any, b: any) => colmun.sortFn(a.data, b.data, colmun) * getSortOrderInteger(colmun.sortOrder));
        } else {
            this.rows = cloneDeep(this.rows)
                .sort((a: any, b: any) => {
                    const path = colmun.path;
                    return ((get(a.data, path) < get(b.data, path)) ? -1 : (get(a.data, path) > get(b.data, path)) ? 1 : 0) * getSortOrderInteger(colmun.sortOrder);
                });
        }
    }

    /**
     * Update the page's number of all rows
     */
    private updatePageIndex(): void {
        if (!this.serverMode && this.paginationEl) {
            this.paginationEl.itemsCount = this.data.length;
            this.paginationEl.pageCount = Math.ceil(this.data.length / this.paginationEl.pageSize);

            if (this.paginationEl.pageCount <= 1) {
                this.paginationEl.currentPage = GridPagination.INDEX_FIRST_PAGE;
            } else if (this.paginationEl.pageCount > 0 && this.paginationEl.currentPage + 1 > this.paginationEl.pageCount) {
                this.paginationEl.currentPage = this.paginationEl.pageCount - 1;
            }

            const rows = cloneDeep(this.rows);
            rows.forEach((row: WcsGridRow, index: number) =>
                row.page = Math.floor(index / this.paginationEl.pageSize)
            );
            this.rows = [...rows];
        }
    }

    @Listen('wcsGridPaginationChange')
    paginationChangeEventHandler(): void {
        this.onPaginationChange();
    }

    @Listen('wcsGridPaginationChange', {target: 'window'})
    paginationChangeEventHandlerOutside(event: CustomEvent<WcsGridPaginationChangeEventDetails>): void {
        if (this.wcsGridPaginationId && this.wcsGridPaginationId === (event.target as HTMLElement).id) {
            this.onPaginationChange();
        }
    }

    private onPaginationChange(): void {
        if (this.serverMode) return;
        this.updatePageIndex();
    }

    private onRowSelection(row: WcsGridRow): void {
        if (this.selectionConfig === 'single') {
            this.rows.filter(r => r.uuid !== row.uuid).map(r => r.selected = false);
        }
        row.selected = !row.selected;
        if (this.selectionConfig !== 'single' || row.selected) {
            this.wcsGridSelectionChange.emit({row: this.wcsGridRowToWcsGridRowData(row)});
        }
        this.rows = cloneDeep(this.rows);
    }

    private selectAllRows(): void {
        const rows = this.getRowsForCurrentPage();
        const selected = !this.allRowsAreSelected();
        rows.map(r => r.selected = selected);
        this.wcsGridAllSelectionChange.emit({rows: selected ? rows.map(row => this.wcsGridRowToWcsGridRowData(row)) : []});
        this.rows = cloneDeep(this.rows);
    }

    private allRowsAreSelected(): boolean {
        const rows = this.getRowsForCurrentPage();
        return rows.length > 0 && rows.filter(row => row.selected).length === rows.length;
    }

    private getRowsForCurrentPage(): WcsGridRow[] {
        if (this.paginationEl) {
            return this.rows.filter(row => row.page === this.paginationEl.currentPage);
        }
        return this.rows;
    }

    renderSelectionColumn(row: WcsGridRow): any {
        switch (this.selectionConfig) {
            case 'none':
                return;
            case 'single':
                return <td>
                    <wcs-radio checked={row.selected} onWcsRadioClick={this.onRowSelection.bind(this, row)}/>
                </td>;
            case 'multiple':
                return <td>
                    <wcs-checkbox checked={row.selected} onWcsChange={this.onRowSelection.bind(this, row)}/>
                </td>;
        }
    }

    private getCellContent(row: WcsGridRow, cell: WcsGridCell): HTMLElement | HTMLElement[] | string | void {
        if (cell.formatter) {
            return cell.formatter(
                (h as unknown) as HyperFunc<VNode>,
                cell.column,
                this.wcsGridRowToWcsGridRowData(row)
            );
        }
        return cell.content;
    }

    private totalColumnCount() {
        if (!this.columns) {
            return 0;
        }
        return this.columns.length + (this.selectionConfig === 'none' ? 0 : 1);
    }

    render(): any {
        return (
            <Host>
                {
                    <table>
                        <thead>
                        {
                            this.selectionConfig === 'none' ? ''
                                : <th class="wcs-grid-selection-column">
                                    {
                                        this.selectionConfig === 'single' ? '' :
                                            <wcs-checkbox checked={this.allRowsAreSelected()}
                                                          onWcsChange={this.selectAllRows.bind(this)}/>
                                    }
                                </th>
                        }
                        <slot name="grid-column"></slot>
                        </thead>
                        <tbody>
                        {
                            this.loading
                                ? <tr>
                                    <td colSpan={this.totalColumnCount()} class="loading">
                                        <wcs-spinner></wcs-spinner>
                                    </td>
                                </tr>
                                : this.rows
                                    ?.filter(row => this.serverMode || !this.paginationEl || row.page === this.paginationEl.currentPage)
                                    .map(row =>
                                        this.renderRow(row)
                                    )
                        }
                        </tbody>
                    </table>
                }
                <slot name="grid-pagination"></slot>
            </Host>
        );
    }

    private renderRow(row: WcsGridRow) {
        return <tr class={row.selected ? 'selected' : ''}>
            {this.renderSelectionColumn(row)}
            {row.cells?.map(cell => {
                    if (cell.column.hidden) {
                        return;
                    }
                    return cell.column.customCells
                        ? (<td>
                            <slot name={cell.column.id + '-' + row.data[this.rowIdPath]}/>
                        </td>)
                        : (<td part={cell.column.path + '-column'}>{this.getCellContent(row, cell)}</td>)
                }
            )}
        </tr>;
    }
}

/**
 * Pour resize le tableau
 * https://www.brainbell.com/javascript/making-resizable-table-js.htmls
 *
 */
