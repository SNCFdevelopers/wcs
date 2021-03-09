import { VNode } from '@stencil/core';

export type WcsGridSelectionConfig = 'none' | 'single' | 'multiple';

export type WcsSortFn = (a: any, b: any) => -1 | 0 | 1;

export type WcsCellFormatter = (_h: HyperFunc<VNode>, column: HTMLWcsGridColumnElement, rowData: WcsGridRowData) => HTMLElement | HTMLElement[];

export interface WcsGridColumnSortChangeEventDetails {
    sortFn: WcsSortFn;
    order: WcsSortOrder;
    column: HTMLWcsGridColumnElement;
}

export interface WcsGridRowSelectedEventDetails {
    row: WcsGridRowData;
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
