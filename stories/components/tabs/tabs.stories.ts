import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { WcsTabChangeEvent, WcsTabsAlignment } from '../../../src/components/tabs/tabs-interface';
// @ts-ignore
import tabsDoc from './tabs-documentation.md';
// @ts-ignore
import headersOnlyDoc from './headers-only-story-documentation.md';

export default {
    title: 'Components/Tabs',
    component: 'wcs-tabs',
    parameters: {
        actions: {
            handles: [
                'tabChange'
            ]
        },
        docs: {
            description: {
                component: tabsDoc
            }
        }
    },
    subcomponents: {
        'WcsTab': 'wcs-tab'
    }
} as Meta;

const Template: Story<Partial<{ align: WcsTabsAlignment, selectedIndex: number, selectedKey: any, headersOnly: boolean, gutter: boolean }>> = (args) => html`
    <wcs-tabs align=${args.align}
              .selectedIndex=${args.selectedIndex}
              .selectedKey=${args.selectedKey}
              ?headersOnly=${args.headersOnly}
              ?gutter=${args.gutter}>
        <wcs-tab header="Premier onglet" item-key="firstTab">
            Premier contenu
        </wcs-tab>
        <wcs-tab header="Deuxième onglet" item-key="secondTab">
            Deuxième contenu
        </wcs-tab>
    </wcs-tabs>
`;

export const Default = Template.bind({});
Default.args = {};

export const WithGutter = Template.bind({});
WithGutter.args = {
    gutter: true
};

function tabChangeHandler(event: CustomEvent<WcsTabChangeEvent>) {
    let content = '';
    if (event.detail.selectedKey === 'firstTab') content = 'Contenu du premier onglet';
    if (event.detail.selectedKey === 'secondTab') content = 'Contenu du deuxieme onglet';
    document.getElementById('tab-content').innerText = content;
}

const TemplateHeadersOnly: Story<Partial<{}>> = (_) => html`
    <!-- Method 'tabChangeHandler' used to change the '#tab-content' div content -->
    <wcs-tabs id="tabs-custom-content"
              headers-only
              selected-key="firstTab"
              @tabChange=${event => tabChangeHandler(event)}>
        <wcs-tab header="Premier onglet" item-key="firstTab"></wcs-tab>
        <wcs-tab header="Deuxième onglet" item-key="secondTab"></wcs-tab>
    </wcs-tabs>

    <div id="tab-content">
        Contenu du premier onglet
    </div>
`;

export const HeadersOnly = TemplateHeadersOnly.bind({});
HeadersOnly.parameters = {
    docs: {
        description: {
            story: headersOnlyDoc,
        },
    },
};
HeadersOnly.args = {};

const TemplateScrollableTabs: Story<Partial<{}>> = (_) => html`
    <wcs-tabs>
        <wcs-tab header="Premier">Premier contenu</wcs-tab>
        <wcs-tab header="Deuxième">Deuxième contenu</wcs-tab>
        <wcs-tab header="Troisième">Troisième contenu</wcs-tab>
        <wcs-tab header="Quatrième">Quatrième contenu</wcs-tab>
        <wcs-tab header="Cinquième">Cinquième contenu</wcs-tab>
        <wcs-tab header="Sixième">Sixième contenu</wcs-tab>
        <wcs-tab header="Septième">Septième contenu</wcs-tab>
        <wcs-tab header="Huitième">Huitième contenu</wcs-tab>
        <wcs-tab header="Neuvième">Neuvième contenu</wcs-tab>
        <wcs-tab header="Dixième">Dixième contenu</wcs-tab>
        <wcs-tab header="Onzième">Onzième contenu</wcs-tab>
        <wcs-tab header="Douzième">Douzième contenu</wcs-tab>
        <wcs-tab header="Treizième">Treizième contenu</wcs-tab>
        <wcs-tab header="Quatorzième">Quatorzième contenu</wcs-tab>
        <wcs-tab header="Quinzième">Quinzième contenu</wcs-tab>
        <wcs-tab header="Seizième">Seizième contenu</wcs-tab>
        <wcs-tab header="Dix-septième">Dix-septième contenu</wcs-tab>
        <wcs-tab header="Dix-huitième">Dix-huitième contenu</wcs-tab>
        <wcs-tab header="Dix-neuvième">Dix-neuvième contenu</wcs-tab>
        <wcs-tab header="Vingtième">Vingtième contenu</wcs-tab>
    </wcs-tabs>
`;

export const ScrollableTabs = TemplateScrollableTabs.bind({});
ScrollableTabs.args = {};

let tabId = 0;
function addTab() {
    const opt = document.createElement('wcs-tab');
    opt.setAttribute('header', 'Onglet ' + ++tabId);
    opt.appendChild(document.createTextNode('Contenu onglet ' + tabId));
    document.querySelector('#lazy-loaded-tabs').appendChild(opt);
}

const TemplateLazyLoadedTabs: Story<Partial<{}>> = (_) => html`
    <!-- Method 'addTab' used to dynamically add a tab -->
    <wcs-button @click=${_ => addTab()}>Ajouter un onglet</wcs-button>

    <wcs-tabs id="lazy-loaded-tabs" gutter="true">
        <wcs-tab header="Onglet ${++tabId}">Contenu onglet ${tabId}</wcs-tab>
    </wcs-tabs>
`;

export const LazyLoadedTabs = TemplateLazyLoadedTabs.bind({});
LazyLoadedTabs.args = {};
