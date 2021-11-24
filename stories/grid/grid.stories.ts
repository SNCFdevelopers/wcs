import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
// @ts-ignore
import gridDoc from './grid-documentation.md';
// @ts-ignore
import cellStylingStoryDocumentation from './cell-styling-story-documentation.md';
// @ts-ignore
import hiddenColumnStoryDocumentation from './hiddenColumnStoryDocumentation.md';
// @ts-ignore
import multiSelectionStoryDocumentation from './multi-selection-story-documentation.md';
import {
    WcsCellFormatter, WcsGridColumnSortChangeEventDetails,
    WcsGridPaginationChangeEventDetails,
    WcsGridSelectionConfig
} from '../../src/components/grid/grid-interface';

const Template: Story<Partial<{ data: any[], selectionConfig: WcsGridSelectionConfig, loading: boolean, selectedItems: any[], hideEmailColumn: boolean, hideIpColumn: boolean }>> = (args) => html`
    <wcs-grid id="grid-simple-1" selection-config=${args.selectionConfig} .selectedItems=${args.selectedItems}
              ?loading="${args.loading}" .data=${args.data}>
        <wcs-grid-column name="Prénom" path="first_name" sort></wcs-grid-column>
        <wcs-grid-column name="Nom" path="last_name" sort></wcs-grid-column>
        <wcs-grid-column name="Email" path="email" sort ?hidden=${args.hideEmailColumn}></wcs-grid-column>
        <wcs-grid-column name="Adresse IP" path="ip_address" sort ?hidden=${args.hideIpColumn}></wcs-grid-column>
    </wcs-grid>
`;

export default {
    title: 'Example/Grid',
    component: 'wcs-grid',
    parameters: {
        actions: {
            handles: [
                'wcsGridSelectionChange',
                'wcsGridAllSelectionChange',
                'wcsGridPaginationChange',
                'wcsSortChange',
                'wcsHiddenChange'
            ]
        },
        docs: {
            description: {
                component: gridDoc
            }
        }
    },
    subcomponents: {
        'WcsGridColumn': 'wcs-grid-column',
        'WcsGridPagination': 'wcs-grid-pagination',
        'WcsGridCustomCell': 'wcs-grid-custom-cell',
    }
} as Meta;

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

export const Default = Template.bind({});

Default.args = {
    data: sampleData,
    selectionConfig: 'none'
};


function buttonClickHandler(email: string) {
    alert('Send mail to ' + email);
}

const CustomCellTemplate: Story<Partial<{ data: any[] }>> = (args) => html`
    <wcs-grid id="grid-simple-1" .data=${args.data} row-id-path="id">
        <wcs-grid-column name="Prénom" path="first_name" sort></wcs-grid-column>
        <wcs-grid-column name="Nom" path="last_name" sort></wcs-grid-column>
        <wcs-grid-column name="Email" path="email" sort></wcs-grid-column>
        <wcs-grid-column name="Adresse IP" path="ip_address" sort></wcs-grid-column>
        <wcs-grid-column id="actions" name="Actions" custom-cells></wcs-grid-column>
        ${args.data.map(value => html`
            <wcs-grid-custom-cell column-id="actions" row-id=${value.id}>
                <wcs-button mode="clear" shape="small" @click=${() => buttonClickHandler(value.email)}>
                    Send mail to ${value.email}
                </wcs-button>
            </wcs-grid-custom-cell>
        `)};
    </wcs-grid>
`;

export const CustomCell = CustomCellTemplate.bind({});
CustomCell.args = {
    data: sampleData
};

/**************************************************************************
 *                         Hidden column                                  *
 **************************************************************************/

export const HiddenColumn = Template.bind({});
HiddenColumn.parameters = {
    docs: {
        description: {
            story: hiddenColumnStoryDocumentation,
        },
    },
};
HiddenColumn.args = {
    data: sampleData,
    selectionConfig: 'none',
    hideEmailColumn: false,
    hideIpColumn: true
};


/**************************************************************************
 *                         Cell Styling                                   *
 **************************************************************************/

const CellStylingTemplate: Story<Partial<{ data: any[], formatter: WcsCellFormatter }>> = (args) => html`
    <wcs-grid id="grid-cell-styling" .data=${args.data}>
        <wcs-grid-column name="Prénom" path="first_name" sort></wcs-grid-column>
        <wcs-grid-column name="Nom" path="last_name" sort></wcs-grid-column>
        <wcs-grid-column name="Email" path="email" sort .formatter=${args.formatter}></wcs-grid-column>
        <wcs-grid-column name="Adresse IP" path="ip_address" sort></wcs-grid-column>
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
`;

export const CellStyling = CellStylingTemplate.bind({});
CellStyling.parameters = {
    docs: {
        description: {
            story: cellStylingStoryDocumentation,
        },
    },
};
CellStyling.args = {
    data: sampleData,
    formatter: (createElement, _, rowData) => {
        // We add the part attribute on the element we want to style
        return createElement('a', {
            'href': 'mailto:' + rowData.data.email,
            'class': 'grid-email-column',
            'part': 'custom-user-part'
        }, rowData.data.email);
    }
};

/**************************************************************************
 *                              Selection                                 *
 **************************************************************************/
export const Selection = Template.bind({});
Selection.args = {
    data: sampleData,
    selectionConfig: 'single',
    selectedItems: {
        'id': 2,
        'first_name': 'Farley',
        'last_name': 'Eadie',
        'email': 'feadie1@mozilla.com',
        'ip_address': '21.179.162.238'
    }
};

export const MultiSelection = Template.bind({});
MultiSelection.parameters = {
    docs: {
        description: {
            story: multiSelectionStoryDocumentation,
        }
    }
};
MultiSelection.args = {
    data: sampleData,
    selectionConfig: 'multiple',
    selectedItems: [{
        'id': 1,
        'first_name': 'Connor',
        'last_name': 'Ryland',
        'email': 'cryland0@google.co.uk',
        'ip_address': '55.58.177.143'
    }]
};

/**************************************************************************
 *                              Pagination                                *
 **************************************************************************/
const PaginationTemplate: Story<Partial<{ data: any[], availablePageSizes: number[] }>> = (args) => html`
    <wcs-grid id="grid-simple-1" .data=${args.data}>
        <wcs-grid-column name="Prénom" path="first_name" sort></wcs-grid-column>
        <wcs-grid-column name="Nom" path="last_name" sort></wcs-grid-column>
        <wcs-grid-column name="Email" path="email" sort></wcs-grid-column>
        <wcs-grid-column name="Adresse IP" path="ip_address" sort></wcs-grid-column>
        <wcs-grid-pagination .availablePageSizes=${args.availablePageSizes}></wcs-grid-pagination>
    </wcs-grid>
`;

export const Pagination = PaginationTemplate.bind({});
Pagination.args = {
    data: sampleData,
    availablePageSizes: [2, 4, 6, 8]
};

/**************************************************************************
 *                              Mode serveur                              *
 **************************************************************************/
function gridPaginationHandler(_: CustomEvent<WcsGridPaginationChangeEventDetails>) {
    alert('Pagination changed, datas have to be retrieved');
}

function sortClickHandler(event: CustomEvent<WcsGridColumnSortChangeEventDetails>) {
    alert('Sort change on column ' + event.detail.column.name);
}

const ServerModeTemplate: Story<Partial<{ data: any[], pageSize: number, itemsCount: number, pageCount: number, currentPage: number, availablePageSizes: number[] }>> = (args) => html`
    <wcs-grid id="grid-simple-1" .data=${args.data} server-mode>
        <wcs-grid-column name="Prénom" path="first_name" sort
                         @wcsSortChange=${event => sortClickHandler(event)}></wcs-grid-column>
        <wcs-grid-column name="Nom" path="last_name" sort
                         @wcsSortChange=${event => sortClickHandler(event)}></wcs-grid-column>
        <wcs-grid-column name="Email" path="email" sort
                         @wcsSortChange=${event => sortClickHandler(event)}></wcs-grid-column>
        <wcs-grid-column name="Adresse IP" path="ip_address" sort
                         @wcsSortChange=${event => sortClickHandler(event)}></wcs-grid-column>
        ${args.pageSize || args.itemsCount || args.pageCount || args.currentPage || args.availablePageSizes ? html`
            <wcs-grid-pagination .availablePageSizes=${args.availablePageSizes} page-size=${args.pageSize}
                                 page-count=${args.pageCount} items-count=${args.itemsCount}
                                 current-page=${args.currentPage}
                                 @wcsGridPaginationChange=${event => gridPaginationHandler(event)}>
            </wcs-grid-pagination>
        ` : ''}
    </wcs-grid>
`;

export const ServerMode = ServerModeTemplate.bind({});
ServerMode.args = {
    data: sampleData.splice(0, 2),
    availablePageSizes: [2, 5, 10, 20, 50],
    currentPage: 0,
    pageSize: 2,
    itemsCount: sampleData.length,
    pageCount: Math.ceil(sampleData.length / 2)
};
