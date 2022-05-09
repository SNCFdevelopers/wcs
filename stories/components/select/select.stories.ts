import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
    title: 'Components/Select',
    component: 'wcs-select'
} as Meta;

const Template: Story<Partial<{}>> = (_) => html`
    <style>
        wcs-select{
            width: 300px;
        }
    </style>
    <wcs-select placeholder="Le select" id="leselectg">
        <wcs-select-option value="1">One</wcs-select-option>
        <wcs-select-option value="2">Two</wcs-select-option>
        <wcs-select-option value="3">Three</wcs-select-option>
    </wcs-select>
`;

export const Default = Template.bind({});
Default.args = {};
