import { Component, ComponentInterface, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { Grid as GridJS } from 'gridjs';
import { OneDArray, TColumn, TData } from 'gridjs/dist/src/types';
import { ComponentChild } from 'preact';
import { PaginationConfig } from 'gridjs/dist/src/view/plugin/pagination';
import { GenericSortConfig } from 'gridjs/dist/src/view/plugin/sort/sort';
import { SearchConfig } from 'gridjs/dist/src/view/plugin/search/search';
import { UserConfig } from 'gridjs/dist/src/config';

@Component({
    tag: 'wcs-grid',
    styleUrl: 'grid.scss',
    shadow: true,
})
export class Grid implements ComponentInterface {
    @Element() el!: HTMLWcsGridElement;
    /**
     * Allows you to configure the columns manually.
     *
     * If you provide a value for this attribute, the wcs-grid-column components will not be used (but please, don't!).
     */
    @Prop({mutable: true}) columns: OneDArray<TColumn | string | ComponentChild>;
    /**
     * Allows you to set the table data in JS. This option is taken into account only if no table element is present
     * in the component slot.
     *
     * This attribute must not be used beside an html table in the slot. In this case, no guarantees can be given on the
     * component behaviour's
     */
    @Prop({mutable: true}) data: TData | (() => TData) | (() => Promise<TData>);
    @Prop() autoWidth: boolean = true;
    @Prop() width: string = '100%';
    /** sets the height of the table */
    @Prop() height: string = 'auto';
    @Prop() pagination: PaginationConfig;
    /**
     * To enable the sorting plugin. Sort has two config objects:
     * - Generic config: to enable sort for all columns, enable multi column sort, server-side integration, etc.
     * - Column specific config: to enable sort on a specific column, to set custom comparator function, etc.
     * see : https://gridjs.io/docs/config/sort
     */
    @Prop() sort: GenericSortConfig | boolean;
    /**
     * To enable or disable the global search plugin
     * see: https://gridjs.io/docs/config/search
     */
    @Prop() search: SearchConfig | boolean;
    /** fixes the table header to the top of the table */
    @Prop() fixedHeader: boolean;

    @State() tableRef: HTMLTableElement;
    private gridJS: GridJS;

    @Watch('data')
    watchHandler(newValue: TData | (() => TData) | (() => Promise<TData>)) {
        if (this.gridJS) {
            this.gridJS.updateConfig({
                data: newValue
            });
            this.gridJS.forceRender();
        }
    }

    componentDidLoad(): Promise<void> | void {
        this.extractUserConfigFromWcsComponents();
        const userConfig = this.buildUserConfigFromComponentsAndHtmlTable();

        this.gridJS = new GridJS(userConfig);
        this.gridJS.render(this.el.shadowRoot.getElementById('grid-wrapper'));

        if (this.tableRef) {
            this.mergeUserConfigAndHtmlDatasourceConfig();

            const observer = new MutationObserver((_) => {
                this.gridJS.updateConfig({
                    from: this.tableRef
                });
                this.mergeUserConfigAndHtmlDatasourceConfig();
                this.gridJS.forceRender();
            });

            const slots = this.el.querySelector('table');
            observer.observe(slots, {attributes: true, childList: true, subtree: true, characterData: true});
        }

    }

    private buildLanguageFor(language: string) {
        const frLanguage = {
            search: {
                placeholder: 'Tapez un mot-clé...',
            },
            sort: {
                sortAsc: 'Trier par ordre croissant',
                sortDesc: 'Trier par ordre décroissant',
            },
            pagination: {
                previous: 'Précédent',
                next: 'Suivant',
                navigate: (page, pages) => `Page ${page} sur ${pages}`,
                page: (page) => `Page ${page}`,
                showing: '',
                of: 'sur',
                to: '-',
                results: '',
            },
            loading: 'Chargement...',
            noRecordsFound: 'Aucun résultat n\'a été trouvé',
            error: 'Une erreur s\'est produite lors de la récupération des données',
        };

        switch (language) {
            case 'fr':
                return frLanguage;
            default:
                return frLanguage;
        }
    }

    private buildUserConfigFromComponentsAndHtmlTable(): UserConfig {
        this.tableRef = this.el.querySelector('table') as any as HTMLTableElement;

        const userConfig: UserConfig = {
            columns: this.columns,
            from: this.tableRef,
            data: this.data,
            search: this.search,
            autoWidth: this.autoWidth,
            width: this.width,
            height: this.height,
            fixedHeader: this.fixedHeader,
            pagination: this.pagination,
            sort: this.sort,
            language: this.buildLanguageFor('fr')
        };
        return userConfig;
    }

    private extractUserConfigFromWcsComponents() {
        // If the user has not defined the columns himself, they are configured from the wcs-grid-column.
        if (!this.columns) {
            const gridColumnElements = Array.from(this.el.querySelectorAll('wcs-grid-column') as any as HTMLWcsGridColumnElement[]);
            if (gridColumnElements.length > 0) {
                this.columns = gridColumnElements.map(
                    wcsGridColumn => {
                        return {
                            id: wcsGridColumn.fieldId,
                            data: wcsGridColumn.data,
                            name: wcsGridColumn.name,
                            width: wcsGridColumn.width,
                            sort: {
                                enabled: wcsGridColumn.sort,
                                compare: wcsGridColumn.sortCompareFn
                            },
                            fixedHeader: wcsGridColumn.fixedHeader,
                            hidden: wcsGridColumn.hiddenColumn,
                            formatter: wcsGridColumn.formatter
                        }
                    });
            }
        }
    }

    /**
     * If the user has redefined parameters for some columns of the html table, we merge them
     * with the configuration generated by GridJS
     * @private
     */
    private mergeUserConfigAndHtmlDatasourceConfig() {
        // XXX: It's a temporary hack around the JSGrid API
        //
        // https://github.com/grid-js/gridjs/blob/42520949ae060f41fc5923e78177a06f23e306cf/packages/gridjs/src/header.ts#L228
        // https://github.com/grid-js/gridjs/blob/42520949ae060f41fc5923e78177a06f23e306cf/packages/gridjs/src/header.ts#L259
        //
        // It would be necessary either to retrieve the attributes on the html elements directly (header.ts#L259),
        // or to allow merging the user config and the deduced configuration from the table element (header.ts#L228).
        //
        // A PR should be done to correct.
        //
        // The user chose to use a html table as the data source,
        // we add the possibility to configure the columns as needed.
        for (const column of this.gridJS.config.header.columns) {
            const userConfigColumn: TColumn = this.columns?.find((uc: TColumn) => uc.id === column.id) as TColumn;
            if (userConfigColumn) {
                column.name = userConfigColumn.name ? userConfigColumn.name : column.name;
                column.width = userConfigColumn.width ? userConfigColumn.width : column.width;
                column.sort = userConfigColumn.sort ? userConfigColumn.sort : column.sort;
                column.fixedHeader = userConfigColumn.fixedHeader ? userConfigColumn.fixedHeader : column.fixedHeader;
                column.hidden = userConfigColumn.hidden ? userConfigColumn.hidden : column.hidden;
                column.formatter = userConfigColumn.formatter ? userConfigColumn.formatter : column.formatter;
            }
        }
    }

    render(): any {
        return (<Host>
            <div id="grid-wrapper"/>
            <slot/>
        </Host>);
    }
}
