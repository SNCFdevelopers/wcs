import {
    Component,
    ComponentInterface,
    Event,
    EventEmitter,
    h,
    Host,
    Prop,
    Element
} from '@stencil/core';
import {
    WcsSortOrder,
    WcsSortFn,
    WcsGridColumnSortChangeEventDetails,
    WcsCellFormatter
} from '../grid/grid-interface';
import { GridSortArrow } from './grid-sort-arrow';

@Component({
    tag: 'wcs-grid-column',
    styleUrl: 'grid-column.scss',
    shadow: true
})
export class GridColumn implements ComponentInterface {
    @Element() el: HTMLWcsGridColumnElement;
    @Prop() path: string;
    @Prop() name: string;
    @Prop() sort: boolean = false;
    @Prop() sortFn: WcsSortFn;
    @Prop() formatter: WcsCellFormatter;
    @Prop({ mutable: true, reflect: true }) sortOrder: WcsSortOrder = 'none';
    /**
     * Set the column <th> element width
     */
    @Prop() width: string;
    @Prop() customCells: boolean = false;
    @Event() wcsSortChange!: EventEmitter<WcsGridColumnSortChangeEventDetails>;

    emitSortConfig() {
        if (!this.sort) return;
        this.wcsSortChange.emit({
            column: this.el,
            order: this.sortOrder,
            sortFn: this.sortFn
        });
    }

    render(): any {
        return (<Host onClick={this.onSortClick.bind(this)} slot="grid-column" style={{ display: 'contents' }}>
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
        this.sortOrder = this.sortOrder === 'none' || this.sortOrder === 'desc' ? 'asc' : 'desc';
        this.emitSortConfig();
    }
}
