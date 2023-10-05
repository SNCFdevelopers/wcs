import {Meta, StoryFn, StoryObj} from '@storybook/web-components';
import { html } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';
import { sampleData } from "./pagination-sample-data";

const meta: Meta = {
    title: 'Components/Grid/Subcomponents/Grid Pagination',
    component: 'wcs-grid-pagination',
    argTypes: getComponentArgs('wcs-grid-pagination'),
    parameters: {
        controls: {
            exclude:/data|available-page-sizes|INDEX_FIRST_PAGE*/g // Exclude `data`, `available-page-sizes` and `INDEX_FIRST_PAGE` from the args table
        }
    },
};
export default meta;

type GridPaginationArgs = {
    data: any; // Needed for wcs-grid display
    availablePageSizes: number[];
    currentPage: number;
    pageSize: number;
    itemsCount: number;
    pageCount: number;
}

const Template: StoryFn<Partial<GridPaginationArgs>> = (args: Partial<GridPaginationArgs>) => html`
    <wcs-grid id="grid-simple-1" .data=${args.data} row-id-path="id">
            <wcs-grid-column name="ID" path="id" sort></wcs-grid-column>
            <wcs-grid-column name="First Name" path="first_name" sort></wcs-grid-column>
            <wcs-grid-column name="Last Name" path="last_name" sort></wcs-grid-column>
            <wcs-grid-column name="Email" path="email" sort></wcs-grid-column>
            <wcs-grid-column name="IP Address" path="ip_address" sort></wcs-grid-column>
            <wcs-grid-pagination .availablePageSizes=${args.availablePageSizes}
                                 current-page=${args.currentPage}
                                 page-size=${args.pageSize}
                                 items-count=${args.itemsCount}
                                 page-count=${args.pageCount}></wcs-grid-pagination>
        </wcs-grid>
`;

/**
 * **Default pagination example**
 */
export const Default: StoryObj = {
    render: (args: GridPaginationArgs) => Template(args, this),
    args: {
        data: sampleData,
        availablePageSizes: [10, 20, 50],
        currentPage: 0,
        pageSize: 10,
        itemsCount: 0,
        pageCount: 1,
    }
}

/**
 * **Customize the available page sizes**  
 * You can change the options of the dropdown on the left of the pagination by changing `availablePageSizes` property.  
 * Note that this property expects an **array**, so attribute `available-page-sizes` won't work.
 */
export const AvailablePageSizes: StoryObj = {
    render: (args: GridPaginationArgs) => Template(args, this),
    args: {
        ...Default.args,
        availablePageSizes: [5,10,15,20],
        pageSize: 5
    }
}
