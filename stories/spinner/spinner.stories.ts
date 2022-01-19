import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { WcsSpinnerMode } from '../../src/components/spinner/spinner-interface';

export default {
    title: 'Example/Spinner',
    component: 'wcs-spinner'
} as Meta;

const Template: Story<Partial<{ mode: WcsSpinnerMode }>> = (args) => html`
    <wcs-spinner mode=${args.mode} class="wcs-primary"></wcs-spinner>
    <wcs-spinner mode=${args.mode} class="wcs-secondary"></wcs-spinner>
    <wcs-spinner mode=${args.mode} class="wcs-success"></wcs-spinner>
    <wcs-spinner mode=${args.mode} class="wcs-warning"></wcs-spinner>
    <wcs-spinner mode=${args.mode} class="wcs-danger"></wcs-spinner>
    <wcs-spinner mode=${args.mode} class="wcs-info"></wcs-spinner>
    <wcs-spinner mode=${args.mode} class="wcs-dark"></wcs-spinner>
    <wcs-spinner mode=${args.mode} class="wcs-light"></wcs-spinner>
`;

export const Default = Template.bind({});
Default.args = {mode: 'border'};

export const Growing = Template.bind({});
Growing.args = {mode: 'growing'};
