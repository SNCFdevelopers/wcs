import {
    Component,
    ComponentInterface,
    Event, EventEmitter,
    h,
    Host,
    Prop
} from '@stencil/core';
import {
    WcsGridPaginationChangeEventDetails
} from '../grid/grid-interface';
import { SelectChangeEventDetail } from '../select/select-interface';
import { GridPaginationArrow } from './grid-pagination-arrow';

/**
 * The grid pagination is a subcomponent of `wcs-grid`, slotted in `grid-pagination` under the `<table>` element.
 */
@Component({
    tag: 'wcs-grid-pagination',
    styleUrl: 'grid-pagination.scss',
    shadow: true
})
export class GridPagination implements ComponentInterface {
    static readonly INDEX_FIRST_PAGE: number = 0;
    /**
     * Set the available page sizes in the pagination dropdown on the left.
     */
    @Prop() availablePageSizes: number[] = [10, 20, 50];
    /**
     * The current page of the pagination. First page starts at index 0.
     */
    @Prop() currentPage: number = GridPagination.INDEX_FIRST_PAGE;
    /**
     * Maximum number of elements shown per page.  
     * Default is the first value of `availablePageSizes`.
     */
    @Prop() pageSize: number = this.availablePageSizes[0];
    /**
     * Total elements in the grid.  
     * - **Grid in `Server mode`** : You have to set `itemsCount` = your total data length.  
     * - **Grid not in Server mode** : Do not set it manually : itemsCount is set and updated every pagination refresh.
     */
    @Prop() itemsCount: number = 0;
    /**
     * Max number of pages.  
     * - **Grid in `Server mode`** : You have to set `pageCount` = `itemsCount` divided by `pageSize`.  
     * - **Grid not in Server mode** : Do not set it manually : pageCount is set and updated every pagination refresh.
     */
    @Prop() pageCount: number = 1;
    /**
     * Event emitted when the pagination changes.
     */
    @Event() wcsGridPaginationChange!: EventEmitter<WcsGridPaginationChangeEventDetails>;

    private lastPage(): void {
        this.currentPage = this.pageCount - 1;
        this.emitPaginationChange();
    }

    private nextPage(): void {
        if (this.canGoToNextPage()) {
            this.currentPage++;
            this.emitPaginationChange();
        }
    }

    private canGoToNextPage(): boolean {
        return this.currentPage + 1 < this.pageCount;
    }

    private previousPage(): void {
        if (this.canGoToPreviousPage()) {
            this.currentPage--;
            this.emitPaginationChange();
        }
    }

    private canGoToPreviousPage(): boolean {
        return this.currentPage > 0;
    }

    private firstPage(): void {
        this.currentPage = 0;
        this.emitPaginationChange();
    }

    private onChangePagesize(event: CustomEvent<SelectChangeEventDetail>): void {
        this.pageSize = event.detail.value;
        if (this.currentPage + 1 > this.pageSize) {
            this.currentPage = 0;
        }
        this.emitPaginationChange();
    }

    private emitPaginationChange(): void {
        this.wcsGridPaginationChange.emit({
            pagination: {
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                itemsCount: this.itemsCount,
                pageCount: this.pageCount
            }
        });
    }

    render(): any {
        return (<Host slot="grid-pagination">
            <div class="container">
                <div class="page-size">
                    <wcs-select placeholder="Eléments par page" class="available-page-sizes" value={this.pageSize} onWcsChange={this.onChangePagesize.bind(this)}>
                        {
                            this.availablePageSizes.map((pageSize) =>
                                <wcs-select-option value={pageSize}>{pageSize}</wcs-select-option>
                            )
                        }
                    </wcs-select>
                    <span>&nbsp;éléments par page</span>
                </div>

                <div class="items-count">
                    <span>{this.itemsCount} éléments</span>
                </div>

                <div class="page-management">
                    <span class="pagination-arrow" onClick={this.firstPage.bind(this)}>
                        <GridPaginationArrow active={this.canGoToPreviousPage()} order="previous" double></GridPaginationArrow>
                    </span>
                    <span class="pagination-arrow" onClick={this.previousPage.bind(this)}>
                        <GridPaginationArrow active={this.canGoToPreviousPage()} order="previous"></GridPaginationArrow>
                    </span>

                    <span>{this.currentPage + 1} / {this.pageCount}</span>

                    <span class="pagination-arrow" onClick={this.nextPage.bind(this)}>
                        <GridPaginationArrow active={this.canGoToNextPage()} order="next"></GridPaginationArrow>
                    </span>
                    <span class="pagination-arrow" onClick={this.lastPage.bind(this)}>
                        <GridPaginationArrow active={this.canGoToNextPage()} order="next" double></GridPaginationArrow>
                    </span>
                </div>
            </div>
        </Host>)
    }
}
