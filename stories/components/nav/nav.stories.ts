import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
// @ts-ignore
import navDocumentation from './nav-documentation.md';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Nav',
    component: 'wcs-nav',
    argTypes: getComponentArgs('wcs-nav'),
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
            <wcs-nav-item text="Favoris" href="#">
                <wcs-mat-icon icon="star"></wcs-mat-icon>
            </wcs-nav-item>
            <wcs-nav-item class="active" text="Ma base documentaire" href="#">
                <wcs-mat-icon icon="description"></wcs-mat-icon>
            </wcs-nav-item>
            <wcs-nav-item text="Distribution" href="#">
            </wcs-nav-item>
            <wcs-nav-item text="Admin" href="#">
            </wcs-nav-item>
            <wcs-nav-item slot="bottom" text="Test" href="#">
                <wcs-mat-icon icon="folder"></wcs-mat-icon>
            </wcs-nav-item>
            <wcs-nav-item slot="bottom" text="Support" href="#">
            </wcs-nav-item>
        </wcs-nav>
    </div>
`;

export const Default = Template.bind({});
Default.args = {};
