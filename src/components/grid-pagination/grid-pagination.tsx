import {
    Component,
    ComponentInterface, Element,
    Event, EventEmitter,
    h,
    Host, Method,
    Prop
} from '@stencil/core';
import {
    WcsGridPaginationChangeEventDetails
} from '../grid/grid-interface';
import { SelectChangeEventDetail } from '../select/select-interface';
import { GridPaginationArrow } from './grid-pagination-arrow';
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";
import { inheritAriaAttributes, inheritAttributes, setOrRemoveAttribute } from "../../utils/helpers";

const GRID_PAGINATION_INHERITED_ATTRS = ['tabindex', 'title'];

/**
 * The grid pagination is a subcomponent of `wcs-grid`, slotted in `grid-pagination` under the `<table>` element.
 * 
 * @cssprop --wcs-grid-pagination-color - Text color of the grid pagination
 * @cssprop --wcs-grid-pagination-font-size - Font-size of the grid pagination
 * @cssprop --wcs-grid-pagination-font-weight - Font-weight of the grid pagination
 * @cssprop --wcs-grid-pagination-gap - Gap between the page size, number of elements and page management
 * @cssprop --wcs-grid-pagination-page-size-gap - Gap between the select and the text within the page size container
 * @cssprop --wcs-grid-pagination-counter-gap - Gap within the page management counter
 * @cssprop --wcs-grid-pagination-margin-top - Margin between the grid and the pagination
 * @cssprop --wcs-grid-pagination-arrow-color-inactive - Color of the inactive arrow
 * @cssprop --wcs-grid-pagination-arrow-color-active - Color of the active arrow
 */
@Component({
    tag: 'wcs-grid-pagination',
    styleUrl: 'grid-pagination.scss',
    shadow: true
})
export class GridPagination implements ComponentInterface, MutableAriaAttribute {
    @Element() private el!: HTMLElement;
    private nativeNav!: HTMLElement;
    private inheritedAttributes: { [k: string]: any } = {};
    
    static readonly INDEX_FIRST_PAGE: number = 0;
    /**
     * Set the available page sizes in the pagination dropdown on the left.
     */
    @Prop() availablePageSizes: number[] = [10, 20, 50];
    /**
     * The current page of the pagination. First page starts at index 0.
     */
    @Prop({mutable: true}) currentPage: number = GridPagination.INDEX_FIRST_PAGE;
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

    componentWillLoad(): Promise<void> | void {
        this.inheritedAttributes = {
            ...inheritAriaAttributes(this.el),
            ...inheritAttributes(this.el, GRID_PAGINATION_INHERITED_ATTRS),
        };
    }

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        setOrRemoveAttribute(this.nativeNav, attr, value);
    }
    
    private getWcsGrid(): HTMLWcsGridElement | undefined {
        return this.el.parentElement.tagName === 'WCS-GRID' ? this.el.parentElement as HTMLWcsGridElement : undefined;
    }

    private lastPage(): void {
        this.currentPage = this.pageCount - 1;
        this.emitPaginationChange();
        this.focusFirstGridCell();
    }

    private nextPage(): void {
        if (this.canGoToNextPage()) {
            this.currentPage++;
            this.emitPaginationChange();
            this.focusFirstGridCell();
        }
    }

    private canGoToNextPage(): boolean {
        return this.currentPage + 1 < this.pageCount;
    }

    private previousPage(): void {
        if (this.canGoToPreviousPage()) {
            this.currentPage--;
            this.emitPaginationChange();
            this.focusFirstGridCell();
        }
    }

    private canGoToPreviousPage(): boolean {
        return this.currentPage > 0;
    }

    private firstPage(): void {
        this.currentPage = 0;
        this.emitPaginationChange();
        this.focusFirstGridCell();
    }

    private onChangePageSize(event: CustomEvent<SelectChangeEventDetail>): void {
        this.pageSize = event.detail.value;
        if (this.currentPage + 1 > this.pageSize) {
            this.currentPage = 0;
        }
        this.emitPaginationChange();
        this.focusFirstGridCell();
    }

    /**
     * Move focus to the first grid cell after a pagination change
     */
    private focusFirstGridCell() {
        const grid = this.getWcsGrid();
        if (grid) {
            requestAnimationFrame(() => {
                this.el.blur();
                grid.focusFirstCell();
            })
        }
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
                    <wcs-select placeholder="Eléments par page"
                                class="available-page-sizes"
                                aria-labelledby="elements-per-page-number elements-per-page-text"
                                value={this.pageSize}
                                onWcsChange={this.onChangePageSize.bind(this)}>
                        {
                            this.availablePageSizes.map((pageSize) =>
                                <wcs-select-option value={pageSize}>{pageSize}</wcs-select-option>
                            )
                        }
                    </wcs-select>
                    <span id="elements-per-page-number" hidden>{this.pageSize}</span>
                    <span id="elements-per-page-text">éléments par page</span>
                </div>

                <div class="items-count">
                    <span>{this.itemsCount} éléments</span>
                </div>

                <nav aria-label="pagination" ref={(el) => (this.nativeNav = el)} {...this.inheritedAttributes}>
                    <ul class="page-management">
                        <li class="pagination-arrow" onClick={this.firstPage.bind(this)}>
                            <GridPaginationArrow active={this.canGoToPreviousPage()} order="previous" double></GridPaginationArrow>
                        </li>
                        <li class="pagination-arrow" onClick={this.previousPage.bind(this)}>
                            <GridPaginationArrow active={this.canGoToPreviousPage()} order="previous"></GridPaginationArrow>
                        </li>
    
                        <li class="pagination-counter">
                            <span aria-label={`Page ${this.currentPage + 1} sur ${this.pageCount}`} aria-current="page">
                                {this.currentPage + 1} / {this.pageCount}
                            </span>
                        </li>
    
                        <li class="pagination-arrow" onClick={this.nextPage.bind(this)}>
                            <GridPaginationArrow active={this.canGoToNextPage()} order="next"></GridPaginationArrow>
                        </li>
                        <li class="pagination-arrow" onClick={this.lastPage.bind(this)}>
                            <GridPaginationArrow active={this.canGoToNextPage()} order="next" double></GridPaginationArrow>
                        </li>
                    </ul>
                </nav>
            </div>
        </Host>)
    }
}
