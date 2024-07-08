import { VNode } from '@stencil/core';

export type WcsGridSelectionConfig = 'none' | 'single' | 'multiple';

export type WcsSortFn = (a: any, b: any, column: HTMLWcsGridColumnElement) => -1 | 0 | 1;

export type WcsCellFormatter = (_h: HyperFunc<VNode>, column: HTMLWcsGridColumnElement, rowData: WcsGridRowData) => HTMLElement | HTMLElement[];

/**
 * Function that returns an array of CSS parts for a row. Should return an empty array or null/undefined if there are no parts.
 *
 * @param row The row data
 * @returns An array of parts names. Empty array or null/undefined if there are no parts.
 */
export type RowCssPartsFn = (row: WcsGridRow) => string[] | null | undefined;


export interface WcsGridColumnSortChangeEventDetails {
    sortFn: WcsSortFn;
    order: WcsSortOrder;
    column: HTMLWcsGridColumnElement;
}

/**
 * Event details for the grid selection event
 */
export interface WcsGridSelectionEventDetails {
    /**
     * The currently selected rows after the selection change
     */
    selectedRows: WcsGridRowData[];
    /**
     * The row that was changed
     * If the grid is in multiple selection mode, you can get `allCheckbox` as the value representing that the event was
     * triggered by the selection of all checkbox
     */
    changedRow: WcsGridRowData | 'allCheckbox';
}

export interface WcsGridAllRowSelectedEventDetails {
    rows: WcsGridRowData[];
}

export type WcsGridPaginationConfig = {
    currentPage: number;
    pageSize: number;
    itemsCount: number;
    pageCount: number;
};

export interface WcsGridPaginationChangeEventDetails {
    pagination: WcsGridPaginationConfig;
}

export type WcsSortOrder = 'asc' | 'desc' | 'none';

export function getSortOrderInteger(sortOrder: WcsSortOrder) {
    switch (sortOrder) {
        case 'asc':
            return 1;
        case 'desc':
            return -1;
        case 'none':
            break;
    }
}

export interface WcsGridRow {
    uuid: string;
    page?: number;
    selected?: boolean;
    data?: any;
    cells?: WcsGridCell[];
}

export interface WcsGridCell {
    content: string | void;
    column: HTMLWcsGridColumnElement;
    formatter: (_h: HyperFunc<VNode>, column: HTMLWcsGridColumnElement, rowData: WcsGridRowData) => HTMLElement | HTMLElement[];
}

export interface WcsGridRowData {
    page: number;
    selected: boolean;
    data: any;
}

export interface HyperFunc<T> {
    (tag: any): T;
}

export interface HyperFunc<T> {
    (tag: any, data: any): T;
}

export interface HyperFunc<T> {
    (tag: any, text: string): T;
}

export interface HyperFunc<T> {
    (sel: any, children: (T | undefined | null)[]): T;
}

export interface HyperFunc<T> {
    (sel: any, data: any, text: string): T;
}

export interface HyperFunc<T> {
    (sel: any, data: any, children: (T | undefined | null)[]): T;
}

export interface HyperFunc<T> {
    (sel: any, data: any, children: T): T;
}
