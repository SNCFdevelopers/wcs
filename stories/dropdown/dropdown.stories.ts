import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { WcsButtonMode, WcsButtonShape } from '../../src/components/button/button-interface';
// @ts-ignore
import dropdownDocumentation from './dropdown-documentation.md'
import { WcsDropdownPlacement } from '../../src/components/dropdown/dropdown-interface';

export default {
    title: 'Example/Dropdown',
    component: 'wcs-dropdown',
    parameters: {
        actions: {
            handles: [
                'wcsDropdownItemClick'
            ]
        },
        docs: {
            description: {
                component: dropdownDocumentation
            }
        }
    },
    subcomponents: {
        'WcsDropdownItem': 'WcsDropdownItem',
        'WcsDropdownHeader': 'WcsDropdownHeader',
        'WcsDropdownDivider': 'WcsDropdownDivider',
    }
} as Meta;

const Template: Story<Partial<{ disabled: boolean, mode: WcsButtonMode, shape: WcsButtonShape, placement: WcsDropdownPlacement }>> = (args) => html`
    <div style="height: 250px"></div>  <!-- tag to let the overlay display properly -->
    <div style="display: flex; width: 100%; align-items: center; justify-content: center">
        <wcs-dropdown ?disabled=${args.disabled} mode=${args.mode} shape=${args.shape} placement=${args.placement}>
            <span slot="placeholder">Dropdown</span>
            <wcs-dropdown-item>Premier item</wcs-dropdown-item>
            <wcs-dropdown-header>ACTION HEADER</wcs-dropdown-header>
            <wcs-dropdown-item>Second item test avec un long texte</wcs-dropdown-item>
            <wcs-dropdown-item>Dernier item</wcs-dropdown-item>
            <wcs-dropdown-divider></wcs-dropdown-divider>
            <wcs-dropdown-item>Dernier item</wcs-dropdown-item>
        </wcs-dropdown>
    </div>
    <div style="height: 250px"></div>  <!-- tag to let the overlay display properly -->
`;

export const Default = Template.bind({});
Default.args = {
    disabled: false,
    placement: 'bottom-end',
    mode: 'plain',
    shape: 'normal'
};
