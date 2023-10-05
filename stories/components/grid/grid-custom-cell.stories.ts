import {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit-html';
import {getComponentArgs} from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Grid/Subcomponents/Grid CustomCell',
    component: 'wcs-grid-custom-cell',
    argTypes: getComponentArgs('wcs-grid-custom-cell'),
};

export default meta;

type GridCustomCellArgs = {
    data: any; // Needed for wcs-grid display
    path: string; // Needed for wcs-grid-column display
    name: string;  // Needed for wcs-grid-column display
    customCells: boolean; // Needed for wcs-grid-column display
    columnId: string;
    rowId: any;
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

/**
 * **Default custom cell example**  
 * One custom cell. Map your data for each row to get all the cells of the column.
 *
 * <details>
 *     <summary>Data mapping example</summary>
 * ```html
 *  data.map(value => html`
 *      <wcs-grid-custom-cell column-id="my-custom" row-id={value.id}>
 *          <span>Custom cell for {value.first_name}</span>
 *          <wcs-button mode="clear" size="s">Contact now</wcs-button>
 *      </wcs-grid-custom-cell>
 *     `);
 * ```
 * </details>
 */
export const Default: StoryObj = {
    render: (args: GridCustomCellArgs) => html`
        <wcs-grid .data="${args.data}" row-id-path="id">
            <wcs-grid-column name="First Name" path="first_name" sort></wcs-grid-column>
            <wcs-grid-column id="my-custom" name="My Custom Cells" custom-cells></wcs-grid-column>
            <wcs-grid-custom-cell column-id=${args.columnId} row-id=${args.rowId}>
                <span>Custom cell for ${args.data[args.rowId - 1]?.first_name}</span>
                <wcs-button mode="clear" size="s">Contact now</wcs-button>
            </wcs-grid-custom-cell>
        </wcs-grid>
    `,
    args: {
        data: sampleData,
        columnId: 'my-custom',
        rowId: 1
    },
    argTypes: {
        rowId: {
            control: 'number',
        }
    }
}
