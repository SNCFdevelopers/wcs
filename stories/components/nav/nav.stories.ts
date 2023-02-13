import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
// @ts-ignore
import navDocumentation from './nav-documentation.md';

const meta: Meta = {
    title: 'Components/Nav',
    component: 'wcs-nav',
    parameters: {
        docs: {
            description: {
                component: navDocumentation
            }
        }
    },
    subcomponents: {
        'WcsNavItem': 'wcs-nav-item'
    }
};
export default meta;

const Template: StoryFn<Partial<any>> = (_) => html`
    <div style="height: 600px">
        <wcs-nav>
            <wcs-nav-item text="Favoris">
                <wcs-mat-icon icon="star"></wcs-mat-icon>
            </wcs-nav-item>
            <wcs-nav-item class="active" text="Ma base documentaire">
                <wcs-mat-icon icon="description"></wcs-mat-icon>
            </wcs-nav-item>
            <wcs-nav-item text="Distribution">
            </wcs-nav-item>
            <wcs-nav-item text="Admin">
            </wcs-nav-item>
            <wcs-nav-item slot="bottom" text="Test">
                <wcs-mat-icon icon="folder"></wcs-mat-icon>
            </wcs-nav-item>
            <wcs-nav-item slot="bottom" text="Support">
            </wcs-nav-item>
        </wcs-nav>
    </div>
`;

export const Default = Template.bind({});
Default.args = {};
