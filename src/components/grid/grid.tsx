import {
    Component,
    ComponentDidLoad,
    ComponentInterface,
    Element,
    Event,
    EventEmitter,
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
import _ from 'lodash';
import { v4 as uuid } from 'uuid';

@Component({
    tag: 'wcs-grid',
    styleUrl: 'grid.scss',
    shadow: true
})
export class Grid implements ComponentInterface, ComponentDidLoad {
    @Element() el!: HTMLWcsGridElement;
    /**
     * True to manage sort and pagination with a backend server, default: false
     */
    @Prop() serverMode: boolean;
    @Prop() data: any[];
    /**
     * Flag to display spinner during data loading
     */
    @Prop() loading: boolean;
    /**
     * Used to manage grid's row selection
     */
    @Prop() selection: WcsGridSelectionConfig = 'none';
    @Prop() wcsGridPaginationId: string;
    @State() columns: HTMLWcsGridColumnElement[];
    @State() paginationEl: HTMLWcsGridPaginationElement;
    /**
     * Rows to display, contains user data and meta data
     */
    @State() rows: WcsGridRow[] = [];
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
    }

    private wcsGridRowToWcsGridRowData(row: WcsGridRow): WcsGridRowData {
        return { selected: row.selected, page: row.page, data: row.data };
    }

    private updateGridRows(data: any[]): void {
        const rows: WcsGridRow[] = [];
        if (data && this.columns) {
            for (let i = 0; i < data.length; i++) {
                const row: WcsGridRow = {
                    uuid: uuid(),
                    data: data[i],
                    selected: false,
                    cells: []
                };
                for (const column of this.columns) {
                    row.cells.push({
                        content: _.get(data[i], column.path),
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
        // We keep only one active sort column
        this.columns.filter(c => c !== event.detail.column).forEach(c => c.sortOrder = 'none');

        if (this.serverMode) return;

        if (event.detail.sortFn) {
            this.rows = _.cloneDeep(this.rows)
                .sort((a: any, b: any) => event.detail.sortFn(a.data, b.data, event.detail.column) * getSortOrderInteger(event.detail.order));
        } else {
            this.rows = _.cloneDeep(this.rows)
                .sort((a: any, b: any) => {
                    const path = event.detail.column.path;
                    return ((_.get(a.data, path) < _.get(b.data, path)) ? -1 : (_.get(a.data, path) > _.get(b.data, path)) ? 1 : 0) * getSortOrderInteger(event.detail.order);
                });
        }
        this.updatePageIndex();
    }

    /**
     * Update the page's number of all rows
     */
    private updatePageIndex(): void {
        if (!this.serverMode && this.paginationEl) {
            if (this.paginationEl.currentPage + 1 > this.paginationEl.pageCount) {
                this.paginationEl.currentPage = this.paginationEl.pageCount - 1;
            }

            this.paginationEl.itemsCount = this.data.length;
            this.paginationEl.pageCount = Math.ceil(this.data.length / this.paginationEl.pageSize);

            const rows = _.cloneDeep(this.rows);
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

    @Listen('wcsGridPaginationChange', { target: 'window' })
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
        if (this.selection === 'single') {
            this.rows.filter(r => r.uuid !== row.uuid).map(r => r.selected = false);
        }
        row.selected = !row.selected;
        this.wcsGridSelectionChange.emit({ row: this.wcsGridRowToWcsGridRowData(row) });
        this.rows = _.cloneDeep(this.rows);
    }

    private selectAllRows(): void {
        const rows = this.getRowsForCurrentPage();
        const selected = this.allRowsAreSelected() ? false : true;
        rows.map(r => r.selected = selected);
        this.wcsGridAllSelectionChange.emit({ rows: selected ? rows.map(row => this.wcsGridRowToWcsGridRowData(row)) : [] });
        this.rows = _.cloneDeep(this.rows);
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
        switch (this.selection) {
            case 'none':
                return;
            case 'single':
                return <td>
                    <wcs-radio checked={row.selected} onClick={this.onRowSelection.bind(this, row)} />
                </td>;
            case 'multiple':
                return <td>
                    <wcs-checkbox checked={row.selected} onWcsChange={this.onRowSelection.bind(this, row)} />
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
        return this.columns.length + (this.selection === 'none' ? 0 : 1);
    }

    render(): any {
        return (
            <Host>
                {
                    <table>
                        <thead>
                            {
                                this.selection === 'none' ? ''
                                    : <th class="wcs-grid-selection-column">
                                        {
                                            this.selection === 'single' ? '' : <wcs-checkbox checked={this.allRowsAreSelected()} onWcsChange={this.selectAllRows.bind(this)} />
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
                                            <tr class={row.selected ? 'selected' : ''}>
                                                {this.renderSelectionColumn(row)}
                                                {row.cells?.map(cell => <td>{this.getCellContent(row, cell)}</td>)}
                                            </tr>
                                        )
                            }
                        </tbody>
                    </table>
                }
                <slot name="grid-pagination"></slot>
            </Host>
        );
    }
}

/**
 * Pour resize le tableau
 * https://www.brainbell.com/javascript/making-resizable-table-js.htmls
 *
 */
