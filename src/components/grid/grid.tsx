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
    WcsGridSelectionConfig, 
    WcsGridSelectionEventDetails,
} from './grid-interface';
import { v4 as uuid } from 'uuid';
import { cloneDeep, get, isEqual } from 'lodash-es';
import { GridPagination } from '../grid-pagination/grid-pagination';
import { getActionForKeyboardEvent, KeyboardEventAssociatedAction } from "./grid-keyboard-event";

interface GridElementWithCoordinates {
    el: HTMLTableCellElement,
    row: number,
    col: number,
}

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
    @Event() wcsGridSelectionChange!: EventEmitter<WcsGridSelectionEventDetails>;
    /**
     * Event emitted when all rows are selected or unselected
     */
    @Event() wcsGridAllSelectionChange!: EventEmitter<WcsGridAllRowSelectedEventDetails>;
    /**
     * Event emitted when the grid has focus.
     */
    @Event() wcsFocus!: EventEmitter<FocusEvent>;
    /**
     * Event emitted when the grid loses focus.
     */
    @Event() wcsBlur!: EventEmitter<FocusEvent>;
    
    /**
     * Used to track the focus position in the grid for keyboard navigation.  
     * Header row : index 0  
     * First column :
     *   - index 1 if selection mode multiple or single
     *   - index 0 if no selection mode
     * Default position : col 0, row 1
     */
    @State() private cursorPosition: {col: number, row: number} = {col: 0, row: 1};
    
    @Watch('cursorPosition')
    onCursorPositionChange(newValue: {col: number, row: number}): void {
        // Notify all grid columns that the cursorPosition has changed
        this.getGridColumnsFromTemplate().forEach(g => g.cursorPosition = newValue);
    }
    
    @Watch('data')
    onDataChange(newValue: any[]): void {
        this.updateGridRows(newValue);
        this.refreshSort(false);
    }

    @Watch('selectedItems')
    onSelectedItemsPropertyChange(newValue: any | any[]) {
        this.updateSelectionWithValues(newValue);
    }
    
    @Listen('focus')
    onFocus(event: FocusEvent) {
        this.getElementToFocusAtCursorPosition()?.focus();
        this.wcsFocus.emit(event);
    }

    @Listen('blur')
    onBlur(event: FocusEvent) {
        this.wcsBlur.emit(event);
    }

    /**
     * If selectionConfig is different from `none`, that means that an extra column for radio or checkbox is rendered
     * in the table.
     */
    hasSelectionColumn() {
        return this.selectionConfig !== 'none';
    }
    
    /**
     * Returns the element to focus at the current cursor position : it can be a cell (td, th) to focus or a nested
     * checkbox / radio element if the selection mode is single or multiple
     */
    getElementToFocusAtCursorPosition(): HTMLTableCellElement | HTMLWcsCheckboxElement | HTMLWcsRadioElement {
        const el = this.gridElementsWithCoordinates.find(cell =>
            cell.col === this.cursorPosition?.col && cell.row === this.cursorPosition?.row)?.el;
        return this.hasSelectionColumn()
            ? el.querySelector('wcs-checkbox,wcs-radio') ?? el
            : el;
    }
    
    moveCursorPosition(directionX: number | 'first' | 'last', directionY: number | 'first' | 'last') {
        this.cursorPosition = {
            col: directionX === 'first' ? 0 :
                directionX === 'last' ? this.totalDisplayedColumnCount() - 1 :
                    Math.min(Math.max(this.cursorPosition.col + directionX, 0), this.totalDisplayedColumnCount() - 1),
            row: directionY === 'first' ? 0 :
                directionY === 'last' ? this.getRowsForCurrentPage().length :
                    Math.min(Math.max(this.cursorPosition.row + directionY, 0), this.getRowsForCurrentPage().length)
        };
        
        this.handleCursorPositionOnEmptyTh();
        
        this.getElementToFocusAtCursorPosition()?.focus();
    }

    /**
     * When the grid has selectionConfig single, an empty th appears at col=0, row=0.
     * It should not be focusable so the cursor navigates to col=1, row=0 instead.
     */
    handleCursorPositionOnEmptyTh() {
        if (this.selectionConfig === 'single' && this.cursorPosition.col === 0 && this.cursorPosition.row === 0) {
            this.cursorPosition = {
                col: 1,
                row: 0
            }
        }
    }

    @Listen('wcsHiddenChange')
    onHiddenColumnChange(): void {
        // We use forceUpdate because the fact of hiding a column or not does not modify the internal structure of the grid (WcsGridRow).
        // Hide a column only impacts the way it is rendered but the grid-column remains in the dom and in our internal model.
        forceUpdate(this);
        this.cursorPosition = { col: 0 , row: 1 }
    }

    @Listen('keydown')
    onKeyDown(_event: KeyboardEvent) {
        if (document.activeElement?.tagName === 'WCS-GRID-PAGINATION') {
            return;
        }
        
        let type: 'grid_no_selection' | 'grid_selection_single' | 'grid_selection_multiple';
        
        switch (this.selectionConfig) {
            case "multiple":
                type = 'grid_selection_multiple';
                break;
            case "single":
                type = 'grid_selection_single';
                break;
            case "none":
                type = 'grid_no_selection';
                break;
        }

        const actionsFromKeyboardEvents: KeyboardEventAssociatedAction[] = getActionForKeyboardEvent(_event, type);

        // If we have at least one associated actions, we prevent the default behavior of the event. 
        // Except if the action is a focus move (we have to handle the preventDefault behavior ourselves in the action implementation)
        if (actionsFromKeyboardEvents.length != 0) {
            _event.preventDefault();
        }

        for (const actionFromKeyboardEvent of actionsFromKeyboardEvents) {
            this.doActionFromKeyboardEventAssociatedAction(actionFromKeyboardEvent, _event);
        }
    }

    doActionFromKeyboardEventAssociatedAction(actionFromKeyboardEvent: KeyboardEventAssociatedAction, event: KeyboardEvent) {
        switch (actionFromKeyboardEvent.kind) {
            case "FocusCell":
                switch (actionFromKeyboardEvent.target) {
                    case "up":
                        this.moveCursorPosition(0, -1);
                        break;
                    case "down":
                        this.moveCursorPosition(0, 1);
                        break;
                    case "left":
                        this.moveCursorPosition(-1, 0);
                        break;
                    case "right":
                        this.moveCursorPosition(1, 0);
                        break;
                    case "first_of_row":
                        this.moveCursorPosition('first', 0);
                        break;
                    case "last_of_row":
                        this.moveCursorPosition('last', 0);
                        break;
                    case "first_of_grid":
                        this.moveCursorPosition('first', 'first');
                        break;
                    case "last_of_grid":
                        this.moveCursorPosition('last', 'last');
                        break;
                    default:
                        break;
                }
            case "SelectRow":
                switch (actionFromKeyboardEvent.target) {
                    case "one":
                        event.preventDefault();
                        if (this.cursorPosition.row > 0) {
                            this.onRowSelection(this.rows[this.cursorPosition.row - 1]);
                        }
                        break;
                    case "all":
                        this.selectAllRows();
                        break;
                    default:
                        break;
                }
                break;
            default:
                throw new Error("Internal error");
        }
    }
    
    
    @Listen('mousedown')
    onClick(_event: MouseEvent) {
        const clickedGridElement: HTMLTableCellElement = _event.composedPath()
            .filter(x => ['TD', 'TH']
            .includes((x as HTMLElement).nodeName))[0] as HTMLTableCellElement;
        
        const clickedGridElementWithCoordinates = this.gridElementsWithCoordinates.find(e => e.el === clickedGridElement);
        
        this.cursorPosition = {
            col: clickedGridElementWithCoordinates.col,
            row: clickedGridElementWithCoordinates.row,
        }
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
                let index = 0;
                for (const column of this.columns) {
                    column.columnPosition = index + (this.hasSelectionColumn() ? 1 : 0);
                    index++;
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
    private refreshSort(refreshOthersColumnsSortOrderState: boolean) {
        //fixme: why the column property can be null or undefined?
        if (this.columns) {
            const [first, ...other] = this.columns.filter(c => c.sortOrder !== 'none');
            if (first && !this.serverMode) {
                this.sortBy(first);
            }
            refreshOthersColumnsSortOrderState && this.disableSortOrderForColumns(other);
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
    
    private get gridElementsWithCoordinates(): GridElementWithCoordinates[] {
        const gridElements: GridElementWithCoordinates[] = [];
        // If selection multiple, the first cell should be added to the list
        if (this.selectionConfig === 'multiple') {
            gridElements.push({
                el: this.el.shadowRoot.querySelector('th'),
                row: 0,
                col: 0
            });
        }
        this.getGridColumnsFromTemplate()
          .filter(col => !col.hidden)
          .forEach((col, index) => {
              gridElements.push({
                  el: col.shadowRoot.querySelector('th'),
                  row: 0,
                  col: index + (this.hasSelectionColumn() ? 1 : 0),
              });
          });
        this.el.shadowRoot.querySelectorAll('td').forEach((cell, index) => {
            gridElements.push({
                el: cell,
                row: 1 + Math.floor(index / this.totalDisplayedColumnCount()),
                col: index % this.totalDisplayedColumnCount(),
            });
        });
        
        return gridElements;
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
     * @param column Column from which to extract the sorting configuration
     * @private
     */
    private sortBy(column: HTMLWcsGridColumnElement) {
        if (column.sortFn) {
            this.rows = cloneDeep(this.rows)
                .sort((a: any, b: any) => column.sortFn(a.data, b.data, column) * getSortOrderInteger(column.sortOrder));
        } else {
            this.rows = cloneDeep(this.rows)
                .sort((a: any, b: any) => {
                    const path = column.path;
                    return ((get(a.data, path) < get(b.data, path)) ? -1 : (get(a.data, path) > get(b.data, path)) ? 1 : 0) * getSortOrderInteger(column.sortOrder);
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
            this.wcsGridSelectionChange.emit({
                selectedRows: this.selectedRows.map(row => this.wcsGridRowToWcsGridRowData(row)),
                changedRow: this.wcsGridRowToWcsGridRowData(row)
            });
        }
        this.rows = cloneDeep(this.rows);
    }

    private get selectedRows(): WcsGridRow[] {
        return this.rows.filter(r => r.selected);
    }

    private selectAllRows(): void {
        const rows = this.getRowsForCurrentPage();
        const selected = !this.allRowsAreSelected();
        rows.map(r => r.selected = selected);
        this.wcsGridAllSelectionChange.emit({rows: selected ? rows.map(row => this.wcsGridRowToWcsGridRowData(row)) : []});
        this.wcsGridSelectionChange.emit({ 
            selectedRows: this.selectedRows.map(row => this.wcsGridRowToWcsGridRowData(row)),
            changedRow: 'allCheckbox'
        });
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

    renderSelectionColumn(row: WcsGridRow, rowIndex: number): any {
        switch (this.selectionConfig) {
            case 'none':
                return;
            case 'single': 
                return <td aria-colindex={this.atLeastOneColumnHidden() ? 1 : null}
                           tabIndex={this.cursorPosition?.col === 0 && rowIndex + 1 === this.cursorPosition?.row ? 0 : -1}>
                    <wcs-radio tabIndex={-1}
                               checked={row.selected} onWcsRadioClick={this.onRowSelection.bind(this, row)}/>
                </td>;
            case 'multiple': 
                return <td aria-colindex={this.atLeastOneColumnHidden() ? 1 : null}
                           tabIndex={this.cursorPosition?.col === 0 && rowIndex + 1 === this.cursorPosition?.row ? 0 : -1}>
                    <wcs-checkbox tabIndex={-1}
                                  checked={row.selected} onWcsChange={this.onRowSelection.bind(this, row)}/>
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

    /**
     * Returns the total number of columns
     * @private
     */
    private totalColumnCount() {
        if (!this.columns) {
            return 0;
        }
        return this.columns.length + (this.hasSelectionColumn() ? 1 : 0);
    }

    /**
     * Returns the total number of columns that are not hidden
     * @private
     */
    private totalDisplayedColumnCount() {
        return this.totalColumnCount() - this.columns?.filter(col => col.hidden).length ?? 0;
    }

    /**
     * Returns true if at least one column is hidden from the table
     * @private
     */
    private atLeastOneColumnHidden() {
        return this.totalDisplayedColumnCount() !== this.totalColumnCount();
    }
    
    render(): any {
        return (
          <Host>
              {
                  <table role="grid"
                         aria-rowcount={!this.loading && this.rows?.length}
                         aria-colcount={!this.loading && this.totalDisplayedColumnCount()}>
                      <thead>
                      <tr aria-rowindex="1">
                          {
                              this.selectionConfig === 'none' ? ''
                                : <th class="wcs-grid-selection-column">
                                    {
                                        this.selectionConfig === 'single' ? '' :
                                          <wcs-checkbox tabIndex={this.cursorPosition?.col === 0
                                                                    && this.cursorPosition?.row === 0  ? 0 : -1}
                                                        checked={this.allRowsAreSelected()}
                                                        onWcsChange={this.selectAllRows.bind(this)}/>
                                    }
                                </th>
                          }
                          <slot name="grid-column"></slot>
                      </tr>
                      </thead>
                      <tbody>
                      {
                          this.loading
                            ? <tr aria-busy="true">
                                <td colSpan={this.totalColumnCount()} class="loading">
                                    <wcs-spinner></wcs-spinner>
                                </td>
                            </tr>
                            : this.rows
                              ?.filter(row => this.serverMode || !this.paginationEl || row.page === this.paginationEl.currentPage)
                              .map((row, index) =>
                                this.renderRow(row, index)
                              )
                      }
                      </tbody>
                  </table>
              }
              <slot name="grid-pagination"></slot>
          </Host>
        );
    }

    /**
     * Returns the row with all mapped cells inside.  
     * The aria-rowindex here starts at 2 because the header row starts at index 1. 
     * @private
     */ 
    private renderRow(row: WcsGridRow, rowIndex: number) {
        let hiddenColumnCount = 0;
        return <tr class={row.selected ? 'selected' : ''}
                   aria-selected={row.selected ? 'true' : null}
                   aria-rowindex={rowIndex + 2}>
            {this.renderSelectionColumn(row, rowIndex)}
            {row.cells?.map((cell, cellIndex) => {
                    if (cell.column.hidden) {
                        hiddenColumnCount++;
                        return;
                    }
                    const nonHiddenColumnIndex =  cellIndex - hiddenColumnCount + 1 + (this.hasSelectionColumn() ? 1 : 0);
                    const cursorIsOnCell = nonHiddenColumnIndex - 1 === this.cursorPosition?.col 
                      && rowIndex + 1 === this.cursorPosition?.row;
                    return cell.column.customCells
                        ? (<td tabIndex={cursorIsOnCell ? 0 : -1}
                               aria-colindex={this.atLeastOneColumnHidden() ? nonHiddenColumnIndex : null}>
                            <slot name={cell.column.id + '-' + row.data[this.rowIdPath]}/>
                        </td>)
                        : (<td tabIndex={cursorIsOnCell ? 0 : -1}
                               aria-colindex={this.atLeastOneColumnHidden() ? nonHiddenColumnIndex : null}
                               part={cell.column.path + '-column'}>{this.getCellContent(row, cell)}</td>)
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
