import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
// @ts-ignore
import tabInsideDocumentation from './tab-inside-documentation.md';

const meta: Meta = {
    title: 'Components/actionBar',
    component: 'wcs-action-bar'
};
export default meta;

const Template: StoryFn<Partial<{ gutter: boolean, title: string }>> = (args) => html`
    <div style="background: var(--wcs-light); padding: var(--wcs-padding);">
        <wcs-action-bar ?gutter=${args.gutter}>
            ${args.title}
            <div slot="actions">
                <wcs-button mode="stroked" shape="small">Action</wcs-button>
                <wcs-dropdown class="wcs-primary" shape="small" style="margin-left: 8px;">
                    <div slot="placeholder">Dropdown</div>
                    <wcs-dropdown-item>Un</wcs-dropdown-item>
                    <wcs-dropdown-item>Deux</wcs-dropdown-item>
                    <wcs-dropdown-item>Trois</wcs-dropdown-item>
                </wcs-dropdown>
            </div>
        </wcs-action-bar>
        <div style="height: 50px; background-color: var(--wcs-white)"><br/>Content</div>
    </div>
`;

export const Default = Template.bind({});
Default.args = {
    gutter: true,
    title: 'Titre'
};

const TabInsideTemplate: StoryFn<Partial<{ gutter: boolean, title: string }>> = (args) => html`
    <div style="background: var(--wcs-light); padding: var(--wcs-padding);">
        <wcs-action-bar ?gutter=${args.gutter}>
            ${args.title}
            <div slot="actions">
                <wcs-button mode="stroked" shape="small">Action</wcs-button>
                <wcs-dropdown class="wcs-primary" shape="small" style="margin-left: 8px;">
                    <div slot="placeholder">Dropdown</div>
                    <wcs-dropdown-item>Un</wcs-dropdown-item>
                    <wcs-dropdown-item>Deux</wcs-dropdown-item>
                    <wcs-dropdown-item>Trois</wcs-dropdown-item>
                </wcs-dropdown>
            </div>
            <wcs-tabs slot="tabs" headers-only id="tabs-custom-content" selected-key="custom-id1"
                      gutter>
                <wcs-tab header="A header !" item-key="custom-id1"></wcs-tab>
                <wcs-tab header="Another !" item-key="custom-id2"></wcs-tab>
            </wcs-tabs>
        </wcs-action-bar>
        <div style="height: 50px; background-color: var(--wcs-white)"><br/>Content</div>
    </div>
`;

export const TabInside = TabInsideTemplate.bind({});
TabInside.parameters = {
    docs: {
        description: {
            story: tabInsideDocumentation,
        },
    },
};
TabInside.args = {
    gutter: false,
    title: 'Titre'
};
