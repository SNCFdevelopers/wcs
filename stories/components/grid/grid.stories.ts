import {Meta, StoryFn, StoryObj} from '@storybook/web-components';
import {html} from 'lit-html';
import {withActions} from '@storybook/addon-actions/decorator';
import {
    WcsGridColumnSortChangeEventDetails,
    WcsGridPaginationChangeEventDetails,
    WcsGridSelectionConfig,
    WcsSortOrder
} from '../../../src/components/grid/grid-interface';
import {getComponentArgs} from '../../utils/args-generation';

type GridArgs = {
    data: any[],
    selectionConfig: WcsGridSelectionConfig,
    loading: boolean,
    selectedItems: any[],
    hideEmailColumn: boolean,
    hideIpColumn: boolean,
    initialSortConfig: WcsSortOrder,
    availablePageSizes: number[],
    pageSize: number,
    itemsCount: number,
    pageCount: number,
    currentPage: number,
    formatter: void,
}

const Template: StoryFn<Partial<GridArgs>> = (args: Partial<GridArgs>) => html`
    <wcs-grid id="grid-simple-1"
              selection-config=${args.selectionConfig}
              .selectedItems=${args.selectedItems}
              ?loading="${args.loading}"
              .data=${args.data}>
        <wcs-grid-column name="First Name" path="first_name" sort></wcs-grid-column>
        <wcs-grid-column name="Last Name" path="last_name" sort sort-order=${args.initialSortConfig}></wcs-grid-column>
        <wcs-grid-column name="Email" path="email" sort ?hidden=${args.hideEmailColumn}></wcs-grid-column>
        <wcs-grid-column name="IP Address" path="ip_address" sort ?hidden=${args.hideIpColumn}></wcs-grid-column>
    </wcs-grid>
`;

const meta: Meta = {
    title: 'Components/Grid',
    component: 'wcs-grid',
    argTypes: getComponentArgs('wcs-grid'),
    parameters: {
        actions: {
            handles: [
                'wcsGridSelectionChange',
                'wcsGridAllSelectionChange',
                'wcsGridPaginationChange',
                'wcsSortChange',
                'wcsHiddenChange',
                'wcsBlur',
                'wcsFocus'
            ]
        },
    },
    subcomponents: {
        'WcsGridColumn': 'wcs-grid-column',
        'WcsGridPagination': 'wcs-grid-pagination',
        'WcsGridCustomCell': 'wcs-grid-custom-cell',
    },
    decorators: [withActions]
};
export default meta;

const sampleData = [
    {
        'id': 1,
        'first_name': 'Connor',
        'last_name': 'Ryland',
        'email': 'cryland0@google.co.uk',
        'ip_address': '55.58.177.143'
    },
    {
        'id': 2,
        'first_name': 'Farley',
        'last_name': 'Eadie',
        'email': 'feadie1@mozilla.com',
        'ip_address': '21.179.162.238'
    },
    {
        'id': 3,
        'first_name': 'Susi',
        'last_name': 'Rowntree',
        'email': 'srowntree2@t-online.de',
        'ip_address': '235.30.90.74'
    },
    {
        'id': 4,
        'first_name': 'Dag',
        'last_name': 'Manoelli',
        'email': 'dmanoelli3@nps.gov',
        'ip_address': '111.47.126.157'
    },
    {
        'id': 5,
        'first_name': 'Glynn',
        'last_name': 'Yude',
        'email': 'gyude4@google.com.au',
        'ip_address': '204.240.34.228'
    },
    {
        'id': 6,
        'first_name': 'Guendolen',
        'last_name': 'De L\'Isle',
        'email': 'gdelisle5@cbslocal.com',
        'ip_address': '220.255.0.66'
    },
    {
        'id': 7,
        'first_name': 'Lila',
        'last_name': 'Coldrick',
        'email': 'lcoldrick6@nih.gov',
        'ip_address': '28.245.56.145'
    },
    {
        'id': 8,
        'first_name': 'Desiri',
        'last_name': 'Tourville',
        'email': 'dtourville7@hexun.com',
        'ip_address': '219.195.139.187'
    },
    {
        'id': 9,
        'first_name': 'Babita',
        'last_name': 'Glenny',
        'email': 'bglenny8@smh.com.au',
        'ip_address': '184.20.53.194'
    }];

/**
 * **Default grid example**  
 * The `data` is **not** showed in the `wcs-grid` element attribute because it is a **property**,
 * meant to be bound with your framework in your template.
 * 
 * <details>
 *     <summary>`Data` object example</summary>
 * ```js
 * const data = [
 * {
 *   'id': 1,
 *   'first_name': 'Connor',
 *   'last_name': 'Ryland',
 *   'email': 'cryland0@google.co.uk',
 *   'ip_address': '55.58.177.143'
 * },
 *   // other rows...
 * ]
 * ```
 * </details>
 */
export const Default: StoryObj = {
    render: (args: GridArgs) => Template(args, this),
    args: {
        data: sampleData,
        selectionConfig: 'none',
        serverMode: false,
        loading: false,
    }
}



/* ************************************************************************ *
 *                         Hidden column                                    *
 * ************************************************************************ */

/**
 * **Hide some columns dynamically**  
 * Sometimes you need to dynamically change the columns to be displayed or not.  
 * For this, a `hidden` property exists on `grid-column` elements. The grid does not support deleting `grid-column` DOM
 * elements after it has been instantiated. This feature allows for example to let the user choose which columns they
 * want to display or not via the interface.
 */
export const HiddenColumn: StoryObj = {
    render: (args: GridArgs) => Template(args, this),
    args: {
        data: sampleData,
        selectionConfig: 'none',
        hideEmailColumn: false,
        hideIpColumn: true
    }

}


/* ************************************************************************ *
 *                         Initial Sort Config                              *
 * ************************************************************************ */
/**
 * **Change the initial sort of your grid**  
 * Attributes `sort`, `sortFn`, `sortOrder` are part of the `wcs-grid-column` API.  
 * 
 * [See more details about the Grid Column API docs](.?path=/docs/components-grid-subcomponents-grid-column--documentation).
 */
export const InitialSortConfig: StoryObj = {
    render: (args: GridArgs) => Template(args, this),
    args: {
        data: sampleData,
        selectionConfig: 'none',
        initialSortConfig: 'asc'
    }
}

/* ************************************************************************ *
 *                         Cell Rendering                                   *
 * ************************************************************************ */

function buttonClickHandler(email: string) {
    alert('Send mail to ' + email);
}

/**
 * **Customize your own cell rendering**  
 * You can add a custom cell with any slotted elements inside to suit your needs.  
 * Useful for actions such as buttons, links or any custom component.
 *
 * Keep in mind that you have to map your data to get a `<wcs-grid-custom-cell>` for each row, like example below :
 */
export const CustomCell: StoryObj = {
    render: (args: GridArgs) => html`
        <wcs-grid id="grid-simple-1" .data=${args.data} row-id-path="id">
            <wcs-grid-column name="First Name" path="first_name" sort></wcs-grid-column>
            <wcs-grid-column name="Last Name" path="last_name" sort></wcs-grid-column>
            <wcs-grid-column name="Email" path="email" sort></wcs-grid-column>
            <wcs-grid-column name="IP Address" path="ip_address" sort></wcs-grid-column>
            <wcs-grid-column id="actions" name="Actions" custom-cells></wcs-grid-column>
            ${args.data.map(value => html`
                <wcs-grid-custom-cell column-id="actions" row-id=${value.id}>
                    <wcs-button mode="clear" size="s" @click=${() => buttonClickHandler(value.email)}>
                        Send mail to ${value.email}
                    </wcs-button>
                </wcs-grid-custom-cell>
            `)};
        </wcs-grid>
    `,
    args: {
        data: sampleData
    }
}

/* ************************************************************************ *
 *                         Cell Styling                                     *
 * ************************************************************************ */

/**
 * **Customize your cells (style only)**    
 * For simple customization needs, wcs generates a css part on each cell.  
 * All cells of a same column have the same css part whose name is prefixed with the `path` attribute of the column
 * concatenated with `-column`.  
 * **e.g.: This means that all cells in the email column have the css part named `email-column`.**
 *
 * If you need more customization, you can add css parts yourself in the formatter function and then use them in your CSS sheet.
 *
 * For more information on CSS part,
 * see [https://developer.mozilla.org/fr/docs/Web/CSS/::part](https://developer.mozilla.org/fr/docs/Web/CSS/::part).
 *
 * <details>
 *     <summary>Formatter Example</summary>
 *     ```js
 *     const myFormatter: WcsCellFormatter = (createElement, _, rowData) => {
 *     // We add the part attribute on the element we want to style
 *     return createElement('a', {
 *         'href': 'mailto:' + rowData.data.email,
 *         'class': 'grid-email-column',
 *         'part': 'custom-user-part'
 *       }, rowData.data.email);
 *     }
 *     // ...
 *     <wcs-grid data="myData">
 *         <wcs-grid-column name"Email" path="email" formatter="myFormatter">
 *     </wcs-grid>
 *     ```
 * </details>
 */
export const CellStyling: StoryObj = {
    render: (args: GridArgs) => html`
        <wcs-grid id="grid-cell-styling" .data=${args.data}>
            <wcs-grid-column name="First Name" path="first_name" sort></wcs-grid-column>
            <wcs-grid-column name="Last Name" path="last_name" sort></wcs-grid-column>
            <wcs-grid-column name="Email" path="email" sort .formatter=${args.formatter}></wcs-grid-column>
            <wcs-grid-column name="IP Address" path="ip_address" sort></wcs-grid-column>
        </wcs-grid>

        <style>
            /* Auto generated part */
            #grid-cell-styling::part(first_name-column) {
                background-color: var(--wcs-cyan);
                color: var(--wcs-white);
            }

            /* Custom user part added in formatter function */
            #grid-cell-styling::part(custom-user-part) {
                color: var(--wcs-cyan);
            }
        </style>
    `,
    args: {
        data: sampleData,
        formatter: (createElement, _, rowData) => {
            // We add the part attribute on the element we want to style
            return createElement('a', {
                'href': 'mailto:' + rowData.data.email,
                'class': 'grid-email-column',
                'part': 'custom-user-part'
            }, rowData.data.email);
        }
    }
}

/* ************************************************************************ *
 *                         Row styling                                      *
 * ************************************************************************ */

/**
 * **Customize your rows (style only)**
 * 
 * For simple customization needs, you can add [css parts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_shadow_parts) to the rows, depending on the data they contain.
 * 
 * To achieve this, you can use the `rowCssPartsFn` property of the `wcs-grid` element. This function is evaluated
 * for each row and should return an array of parts names or an empty array (or null/undefined) if there are no parts.
 * 
 * **e.g.:** In the following example, the row containing the currently selected item will have a green background.
 * 
 * The `rowCssPartsFn` prop is set like so :
 * 
 * ```typescript
 * const rowCssPartsFn = (row) => row.selected ? ['current-selected-row'] : [] // or null/undefined
 * ```
 * 
 * And here is the associated CSS :
 * 
 * ```css
 * #grid-row-styling::part(current-selected-row) {
 *   background-color: var(--wcs-green);
 * }
 * ```
 * 
 * Note: you can add multiple parts to a row and then style them in your CSS.
 */
export const RowStyling: StoryObj = {
    render: (args: GridArgs) => html`
        <wcs-grid id="grid-row-styling" .data=${args.data} .rowCssPartsFn=${args.rowCssPartsFn} selection-config="single">
            <wcs-grid-column name="First Name" path="first_name" sort></wcs-grid-column>
            <wcs-grid-column name="Last Name" path="last_name" sort></wcs-grid-column>
            <wcs-grid-column name="Email" path="email" sort></wcs-grid-column>
            <wcs-grid-column name="IP Address" path="ip_address" sort></wcs-grid-column>
        </wcs-grid>

        <style>
            #grid-row-styling::part(current-selected-row) {
                background-color: var(--wcs-green);
            }
        </style>
    `,
    args: {
        data: sampleData,
        rowCssPartsFn: (row) => row.selected ? ['current-selected-row'] : []
    }
}

/* ************************************************************************ *
 *                              Selection                                   *
 * ************************************************************************ */
/**
 * **Select one row**  
 * You can assign an item selection with the `selectedItems` property.  
 * If the selection mode is set to multiple, the value must be an array, otherwise a single item.  
 *
 * The values are compared with the `_.isEqual()` function of lodash.  
 * When the selection changes, the `wcsGridSelectionChange` event contains the details of the rows selected by the user.
 *
 * **In the following example (single-selection), initial properties as set like so :**
 *
 * <details>
 *     <summary>Show code</summary>
 *     ```js
 *     selectionConfig = 'single';
 *     selectedItems = {
 *       'id': 4,
 *       'first_name': 'Dag',
 *       'last_name': 'Manoelli',
 *       'email': 'dmanoelli3@nps.gov',
 *       'ip_address': '111.47.126.157'
 *     };
 *     ```
 * </details>
 * 
 * If you want to clear the selection, you can use the bound property `selectedItems` and set it to an empty object :
 * 
 * ```js
 * <wcs-grid selection-config="single" [selectedItems]="selectedItems">
 * ...
 * clearSelection() {
 *   this.selectedItems = {};
 * }
 * ```
 * 
 * **Available shortcut :** Shift + Space to select / unselect the focused row  
 * 
 */
export const Selection: StoryObj = {
    render: (args: GridArgs) => Template(args, this),
    args: {
        data: sampleData,
        selectionConfig: 'single',
        selectedItems: {
            'id': 4,
            'first_name': 'Dag',
            'last_name': 'Manoelli',
            'email': 'dmanoelli3@nps.gov',
            'ip_address': '111.47.126.157'
        }
    },
    argTypes: {
        selectedItems: {
            control: 'object',
        }
    }
}

/**
 * **Select several rows**  
 * You can assign an item selection with the `selectedItems` property.  
 * If the selection mode is set to multiple, the value must be an array, otherwise a single item.  
 *
 * The values are compared with the `_.isEqual()` function of lodash.  
 * When the selection changes, the `wcsGridSelectionChange` event contains the details of the rows selected by the user.
 *
 * **In the following example (multi-selection), initial properties as set like so :**
 *
 * <details>
 *     <summary>Show code</summary>
 *     ```js
 *     selectionConfig = 'multiple';
 *     selectedItems = [{
 *       'id': 4,
 *       'first_name': 'Dag',
 *       'last_name': 'Manoelli',
 *       'email': 'dmanoelli3@nps.gov',
 *       'ip_address': '111.47.126.157'
 *     },
 *     {
 *       'id': 5,
 *       'first_name': 'Glynn',
 *       'last_name': 'Yude',
 *       'email': 'gyude4@google.com.au',
 *       'ip_address': '204.240.34.228'
 *     }];
 *    ```
 * </details>
 *
 * **Available shortcuts :**
 *  - Shift + Space to select / unselect the focused row.
 *  - Ctrl + A to select / unselect all rows.
 */
export const MultiSelection: StoryObj = {
    render: (args: GridArgs) => Template(args, this),
    args: {
        data: sampleData,
        selectionConfig: 'multiple',
        selectedItems: [{
            'id': 4,
            'first_name': 'Dag',
            'last_name': 'Manoelli',
            'email': 'dmanoelli3@nps.gov',
            'ip_address': '111.47.126.157'
        },
        {
            "id": 5,
            "first_name": "Glynn",
            "last_name": "Yude",
            "email": "gyude4@google.com.au",
            "ip_address": "204.240.34.228"
        }]
    }
}

/* ************************************************************************ *
 *                              Pagination                                  *
 * ************************************************************************ */
/**
 * **Add pagination to your grid**  
 * You can add a `wcs-grid-pagination` element inside your `wcs-grid`.  
 * The pagination contains the number of elements shown per page, the total number of elements, and the page navigation.
 * 
 * [See more details about the Grid Pagination API docs](.?path=/docs/components-grid-subcomponents-grid-pagination--documentation)
 */
export const Pagination: StoryObj = {
    render: (args: GridArgs) => html`
        <wcs-grid id="grid-simple-1" .data=${args.data}>
            <wcs-grid-column name="First Name" path="first_name" sort></wcs-grid-column>
            <wcs-grid-column name="Last Name" path="last_name" sort></wcs-grid-column>
            <wcs-grid-column name="Email" path="email" sort></wcs-grid-column>
            <wcs-grid-column name="IP Address" path="ip_address" sort></wcs-grid-column>
            <wcs-grid-pagination .availablePageSizes=${args.availablePageSizes}></wcs-grid-pagination>
        </wcs-grid>
    `,
    args: {
        data: sampleData,
        availablePageSizes: [2, 4, 6, 8]
    }
}

/* ************************************************************************ *
 *                              Server Mode                                 *
 * ************************************************************************ */
function gridPaginationHandler(_: CustomEvent<WcsGridPaginationChangeEventDetails>) {
    alert('Pagination changed, data has to be retrieved');
}

function sortClickHandler(event: CustomEvent<WcsGridColumnSortChangeEventDetails>) {
    alert(`Sort change on column ${event.detail.column.name}, data has to be retrieved`);
}

/**
 * **Load the elements using a backend**  
 * Use `server-mode`on your grid when you hold a great quantity of data that should be refreshed using your backend.  
 * When doing one of the following actions, an event is fired and the data should be refreshed from your server using
 * your own callback function.
 * 
 * | Action                  |  Event name • Angular     | Event name • React          | Component             | 
 * | ----------------------- | ------------------------- | --------------------------- | --------------------- |
 * | Loading the data        | `ngOnInit`                | `componentDidMount`         | `wcs-grid`            |
 * | Sorting a column        | `wcsSortChange`           | `onWcsSortChange`           | `wcs-grid-column`     |
 * | Changing the pagination | `wcsGridPaginationChange` | `onWcsGridPaginationChange` | `wcs-grid-pagination` |
 *
 * **Try it now by changing the sort / the pagination 👇**
 */
export const ServerMode: StoryObj = {
    render: (args: GridArgs) => html`
        <wcs-grid id="grid-simple-1" .data=${args.data} server-mode>
            <wcs-grid-column name="First Name" path="first_name" sort
                             @wcsSortChange=${event => sortClickHandler(event)}></wcs-grid-column>
            <wcs-grid-column name="Last Name" path="last_name" sort
                             @wcsSortChange=${event => sortClickHandler(event)}></wcs-grid-column>
            <wcs-grid-column name="Email" path="email" sort
                             @wcsSortChange=${event => sortClickHandler(event)}></wcs-grid-column>
            <wcs-grid-column name="IP Address" path="ip_address" sort
                             @wcsSortChange=${event => sortClickHandler(event)}></wcs-grid-column>
            ${args.pageSize || args.itemsCount || args.pageCount || args.currentPage || args.availablePageSizes ? html`
                <wcs-grid-pagination .availablePageSizes=${args.availablePageSizes} page-size=${args.pageSize}
                                     page-count=${args.pageCount} items-count=${args.itemsCount}
                                     current-page=${args.currentPage}
                                     @wcsGridPaginationChange=${event => gridPaginationHandler(event)}>
                </wcs-grid-pagination>
            ` : ''}
        </wcs-grid>
    `,
    args: {
        data: sampleData.slice(-2),
        availablePageSizes: [2, 5, 10, 20, 50],
        currentPage: 0,
        pageSize: 2,
        itemsCount: sampleData.length,
        pageCount: Math.ceil(sampleData.length / 2)
    }
}
