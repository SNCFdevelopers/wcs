import {Meta, StoryFn, StoryObj} from '@storybook/web-components';
import {html} from 'lit-html';
import {getComponentArgs} from '../../utils/args-generation';
import {WcsCellFormatter, WcsSortFn, WcsSortOrder} from "../../../src";

const meta: Meta = {
    title: 'Components/Grid/Subcomponents/Grid Column',
    component: 'wcs-grid-column',
    argTypes: getComponentArgs('wcs-grid-column'),
};

export default meta;

type GridColumnArgs = {
    data: any; // Needed for wcs-grid display
    path: string;
    name: string;
    sort: boolean;
    sortFn: WcsSortFn;
    formatter: WcsCellFormatter;
    sortOrder: WcsSortOrder;
    width: string;
    customCells: boolean;
    hidden: boolean;
}

const sampleData = [
    {
        'id': 1,
        'first_name': 'Connor',
        'email': 'cryland0@google.co.uk',
    },
    {
        'id': 2,
        'first_name': 'Farley',
        'email': 'feadie1@mozilla.com',
    },
    {
        'id': 3,
        'first_name': 'Susi',
        'email': 'srowntree2@t-online.de',
    },
    {
        'id': 4,
        'first_name': 'Dag',
        'email': 'dmanoelli3@nps.gov',
    },
    {
        'id': 5,
        'first_name': 'Glynn',
        'email': 'gyude4@google.com.au',
    },
];


const Template: StoryFn<Partial<any>> = (args: Partial<GridColumnArgs>) => html`
    <wcs-grid .data="${args.data}">
        <wcs-grid-column name=${args.name} path=${args.path} sort=${args.sort} width=${args.width}></wcs-grid-column>
    </wcs-grid>
`;

/**
 * **Default grid example**  
 * A `wcs-grid-column` should always be a child of a `wcs-grid` to display properly.
 */
export const Default: StoryObj = {
    render: (args: GridColumnArgs) => Template(args, this),
    args: {
        data: sampleData,
        path: 'first_name',
        name: 'First Name',
        sort: false,
        sortOrder: 'none',
        width: '100px',
    }
}

/**
 * **Make the column sortable**
 * - Add the attribute `sort` to the `wcs-grid-column` to make it sortable. This shows a clickable icon to change the order manually.
 * - The property `sortOrder` can be ascendant, descendant or none to make the column unsorted by default.
 * - The property `sortFn` can be overriden to use your own sorting algorithm
 *
 * <details>
 *     <summary>sortFn example</summary>
 *     > 💡 If you are comparing accents or special characters, we recommend to use `localeCompare`  
 *     > Its API also includes locales and extra options : [see more about localeCompare](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
 *     
 *     ```js
 *     const mySortFunction: WcsSortFn = (a, b, column) => {
 *         // When column path is 'first_name', compares a.firstname and b.firstname value to sort the rows
 *         return a[column.path] < b[column.path] ? -1 : a[column.path] === b[column.path] ? 0 : 1;
 *     }
 *     // ...
 *     <wcs-grid-column name"First Name" path="first_name" sort sortFn="mySortFunction">
 *     ```
 * </details>
 */
export const Sortable: StoryObj = {
    render: (args: GridColumnArgs) => Template(args, this),
    args: {
        ...Default.args,
        sort: true,
        sortOrder: 'asc'
    }
}

/**
 * **Change the column width**  
 * With the `width` property, you can customize the column `<th>` size.  
 * It is then bound in the DOM style of the element so any valid css value for native `width` is accepted.  
 * If you want to fit it to your content, just write `width="0"`.
 * 
 * ✅ `"100px"` `"5em"` `"50%"` `"auto"` etc...
 */
export const Width: StoryObj = {
    render: (args: GridColumnArgs) => html`
        <wcs-grid .data="${args.data}">
            <wcs-grid-column name="ID" path="id" sort=${args.sort} width=${args.width}></wcs-grid-column>
            <wcs-grid-column name=${args.name} path=${args.path} sort=${args.sort}></wcs-grid-column>
        </wcs-grid>
    `,
    args: {
        ...Default.args,
        width: '100px',
    }
}

/**
 * **Customize your data format**  
 * Transform all the data of the column to suit your needs.
 *
 * <details>
 *     <summary>Formatter Example</summary>
 *     ```js
 *     const myFormatter: WcsCellFormatter = (createElement, _, rowData) => {
 *     return createElement('a', {
 *         'href': 'mailto:' + rowData.data.email,
 *         'class': 'grid-email-column',
 *         'part': 'custom-user-part' // optional: for styling
 *       }, rowData.data.email);
 *     }
 *     // ...
 *    <wcs-grid-column name"Email" path="email" formatter="myFormatter">
 *     ```
 * </details>
 */
export const Formatter: StoryObj = {
    render: (args: GridColumnArgs) => html`
        <wcs-grid .data="${args.data}">
            <wcs-grid-column name=${args.name} path=${args.path} sort=${args.sort}
                             .formatter="${args.formatter}"></wcs-grid-column>
        </wcs-grid>
    `,
    args: {
        ...Default.args,
        name: 'Email',
        formatter: (createElement, _, rowData) => {
            // We add the part attribute on the element we want to style
            return createElement('a', {
                'href': 'mailto:' + rowData.data.email,
                'class': 'grid-email-column',
                'part': 'custom-user-part'
            }, rowData.data.email);
        }
    },
}

/**
 * **Hide some columns dynamically**  
 * Sometimes you need to dynamically change the columns to be displayed or not.
 * The grid does not support deleting `grid-column` dom elements after it has been instantiated.
 * This feature allows for example to let the user choose which columns they want to display or not via the interface.
 * 
 * Here, the `email` column is hidden. 
 */
export const HideColumn: StoryObj = {
    render: (args: GridColumnArgs) => html`
        <wcs-grid .data="${args.data}">
            <wcs-grid-column name=${args.name} path=${args.path} sort=${args.sort}></wcs-grid-column>
            <wcs-grid-column name="Email" path="email" ?hidden=${args.hidden}></wcs-grid-column>
        </wcs-grid>
    `,
    args: {
        ...Default.args,
        hidden: true,
    },
}
