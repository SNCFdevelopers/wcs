import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';
import { Comparator, TCell, TColumn, TDataArrayRow, TDataObjectRow } from 'gridjs/dist/src/types';
import { ComponentChild } from 'preact';
import { Row } from 'gridjs';

@Component({
    tag: 'wcs-grid-column',
    shadow: true,
})
export class GridColumn implements ComponentInterface {
    /**
     * column ID
     */
    @Prop() fieldId?: string;
    /**
     * Cell default data
     */
    @Prop() data?: ((row: TDataArrayRow | TDataObjectRow) => TCell) | TCell;
    /**
     * column name
     */
    @Prop() name?: string | ComponentChild;
    /**
     * width of the column
     */
    @Prop() width?: string;
    /**
     * to enable/disable sort
     */
    @Prop() sort?: boolean;
    /**
     * to provide a custom sort function
     */
    @Prop() sortCompareFn?: Comparator<TCell>;
    /**
     * To keep the header visible during a scroll
     */
    @Prop() fixedHeader?: boolean;
    /**
     * to show/hide the column
     */
    @Prop() hiddenColumn?: boolean;
    /**
     * custom cell formatting
     */
    @Prop() formatter?: (cell: TCell, row: Row, column: TColumn) => ComponentChild;

    render(): any {

        return (
            <Host></Host>
        )
    }
}
